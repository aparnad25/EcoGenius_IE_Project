import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Recycle, Trash2, Building, Home } from 'lucide-react';

const WasteAnalytics = () => {
  const [activeView, setActiveView] = useState('trends');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    wasteTrends: [],
    materialBreakdown: []
  });

  // Simple CSV parser function (no external dependencies)
  const parseCSV = (csvText) => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const obj = {};
      headers.forEach((header, index) => {
        const value = values[index]?.trim().replace(/"/g, '');
        // Convert numeric values
        if (!isNaN(value) && value !== '' && value !== null && value !== undefined) {
          obj[header] = parseFloat(value);
        } else {
          obj[header] = value;
        }
      });
      return obj;
    }).filter(row => Object.values(row).some(value => value !== '' && value !== null && value !== undefined));
  };

  // Function to load and parse CSV files in real-time
  const loadCSVData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Function to fetch and parse CSV
      const fetchAndParseCSV = async (filename) => {
        try {
          // Try different possible paths for the CSV files
          const possiblePaths = [
            `/src/data/${filename}`,
            `/data/${filename}`,
            `/${filename}`,
            `./src/data/${filename}`,
            `./data/${filename}`
          ];

          let csvText = null;
          let usedPath = null;

          // Try each path until one works
          for (const path of possiblePaths) {
            try {
              const response = await fetch(path);
              if (response.ok) {
                csvText = await response.text();
                usedPath = path;
                break;
              }
            } catch (e) {
              // Continue to next path
              continue;
            }
          }

          if (!csvText) {
            throw new Error(`Could not find ${filename} in any of the expected locations`);
          }

          console.log(`Successfully loaded ${filename} from ${usedPath}`);

          // Parse CSV using built-in parser
          const parsedData = parseCSV(csvText);
          console.log(`Parsed ${parsedData.length} rows from ${filename}`);
          return parsedData;
        } catch (err) {
          throw new Error(`Failed to load ${filename}: ${err.message}`);
        }
      };

      // Load waste summary data
      console.log('Loading waste summary data...');
      const wasteSummaryData = await fetchAndParseCSV('Merged_vic_waste_summary.csv');
      
      // Transform waste summary data
      const transformedWasteTrends = wasteSummaryData
        .filter(row => row['Financial Year'] && row['Total Generation']) // Filter out invalid rows
        .map(row => ({
          year: row['Financial Year']?.toString().replace('-20', '-') || row['Financial Year'], 
          totalGeneration: (row['Total Generation'] || 0) / 1000000, // Convert to millions
          disposal: (row['Disposal'] || 0) / 1000000,
          recovered: (row['Recoverd locally (including Waste to Energy)'] || 0) / 1000000,
          exports: (row['Exports'] || 0) / 1000000,
          diversionRate: row['Diversion Rate (%)'] || 0
        }))
        .sort((a, b) => a.year.localeCompare(b.year)); // Sort by year

      console.log('Transformed waste trends:', transformedWasteTrends);

      // Load detailed waste data
      console.log('Loading detailed waste data...');
      const detailedWasteData = await fetchAndParseCSV('VictoriaWastev2025.1_clean.csv');
      
      // Filter for latest year and aggregate by material type and source sector
      const availableYears = [...new Set(detailedWasteData.map(row => row['Financial Year']))].sort();
      const latestYear = availableYears[availableYears.length - 1] || '2023-2024';
      
      console.log('Available years:', availableYears);
      console.log('Using latest year:', latestYear);
      
      const latestYearData = detailedWasteData.filter(row => 
        row['Financial Year'] === latestYear && 
        row['Total Generation'] > 0
      );

      console.log(`Found ${latestYearData.length} records for ${latestYear}`);

      // Aggregate data by material type and source sector
      const materialAggregation = {};
      
      latestYearData.forEach(row => {
        const materialType = row['Material Type'];
        const sourceSector = row['Source Sector'];
        const totalGeneration = row['Total Generation'] || 0;

        if (!materialType || !sourceSector || totalGeneration <= 0) return;

        if (!materialAggregation[materialType]) {
          materialAggregation[materialType] = { MSW: 0, CND: 0, CNI: 0 };
        }

        if (sourceSector === 'MSW') {
          materialAggregation[materialType].MSW += totalGeneration;
        } else if (sourceSector === 'CND') {
          materialAggregation[materialType].CND += totalGeneration;
        } else if (sourceSector === 'CNI') {
          materialAggregation[materialType].CNI += totalGeneration;
        }
      });

      console.log('Material aggregation:', materialAggregation);

      // Transform to chart format
      const transformedMaterialBreakdown = Object.entries(materialAggregation)
        .map(([materialType, sectors]) => ({
          materialType: materialType
            .replace('Aggregate, masonry and soils', 'Aggregate & Masonry')
            .replace('Paper and cardboard', 'Paper & Cardboard')
            .replace('Tyres and rubber', 'Tyres & Rubber'),
          msw: sectors.MSW / 1000000, // Convert to millions
          cnd: sectors.CND / 1000000,
          cni: sectors.CNI / 1000000,
          total: (sectors.MSW + sectors.CND + sectors.CNI) / 1000000
        }))
        .filter(item => item.total > 0) // Filter out materials with no data
        .sort((a, b) => b.total - a.total); // Sort by total descending

      console.log('Transformed material breakdown:', transformedMaterialBreakdown);

      setData({
        wasteTrends: transformedWasteTrends,
        materialBreakdown: transformedMaterialBreakdown
      });

    } catch (err) {
      console.error('Error loading CSV data:', err);
      setError(`Failed to load data: ${err.message}`);
      
      // Fallback to sample data
      setData({
        wasteTrends: [
          { year: '2015-16', totalGeneration: 12.33, disposal: 4.14, recovered: 7.02, exports: 1.17, diversionRate: 66.42 },
          { year: '2016-17', totalGeneration: 12.62, disposal: 4.20, recovered: 7.26, exports: 1.16, diversionRate: 66.72 },
          { year: '2017-18', totalGeneration: 14.04, disposal: 4.39, recovered: 8.33, exports: 1.32, diversionRate: 68.72 },
          { year: '2018-19', totalGeneration: 14.76, disposal: 4.54, recovered: 9.05, exports: 1.17, diversionRate: 69.26 },
          { year: '2019-20', totalGeneration: 15.49, disposal: 4.76, recovered: 9.57, exports: 1.16, diversionRate: 69.25 },
          { year: '2020-21', totalGeneration: 15.81, disposal: 4.69, recovered: 10.11, exports: 1.01, diversionRate: 70.32 },
          { year: '2021-22', totalGeneration: 14.43, disposal: 4.53, recovered: 8.87, exports: 1.04, diversionRate: 68.65 },
          { year: '2022-23', totalGeneration: 14.46, disposal: 4.52, recovered: 9.03, exports: 0.91, diversionRate: 68.77 },
          { year: '2023-24', totalGeneration: 14.23, disposal: 4.34, recovered: 8.81, exports: 1.09, diversionRate: 69.53 }
        ],
        materialBreakdown: [
          { materialType: 'Aggregate & Masonry', msw: 0.245, cnd: 8.5, cni: 2.2, total: 10.945 },
          { materialType: 'Organics', msw: 2.8, cnd: 1.2, cni: 0.5, total: 4.5 },
          { materialType: 'Paper & Cardboard', msw: 1.5, cnd: 0.8, cni: 1.1, total: 3.4 },
          { materialType: 'Metals', msw: 0.3, cnd: 1.8, cni: 0.9, total: 3.0 },
          { materialType: 'Plastic', msw: 0.9, cnd: 0.2, cni: 0.4, total: 1.5 },
          { materialType: 'Glass', msw: 0.4, cnd: 0.1, cni: 0.2, total: 0.7 },
          { materialType: 'Textiles', msw: 0.2, cnd: 0.1, cni: 0.1, total: 0.4 },
          { materialType: 'Tyres & Rubber', msw: 0.05, cnd: 0.1, cni: 0.15, total: 0.3 }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    loadCSVData();
  }, []);

  const sectorColors = {
    MSW: '#ef4444', // Municipal Solid Waste - red
    CND: '#f59e0b', // Construction & Demolition - amber  
    CNI: '#3b82f6'  // Commercial & Industrial - blue
  };

  const formatNumber = (num) => {
    if (num >= 1000000) return `${(num/1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num/1000).toFixed(1)}K`;
    return num.toFixed(1);
  };

  const calculateImpact = () => {
    if (!data.wasteTrends.length) return { totalCO2: '0', carsEquivalent: '0', diversionRate: 0, wasteGenerated: 0 };
    
    const latest = data.wasteTrends[data.wasteTrends.length - 1];
    const totalCO2 = latest.disposal * 1000000 * 0.65; // Rough calculation: tonnes to CO2
    const carsEquivalent = totalCO2 / 4600; // Average car emissions per year
    return {
      totalCO2: formatNumber(totalCO2),
      carsEquivalent: formatNumber(carsEquivalent),
      diversionRate: latest.diversionRate,
      wasteGenerated: latest.totalGeneration
    };
  };

  const impact = calculateImpact();

  // Loading state
  if (loading) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Waste Analytics</h2>
          <p className="text-gray-600">Converting CSV data to interactive visualizations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Victoria Waste Impact Analytics
        </h2>
        <p className="text-lg text-gray-600">
          Real-time analysis of Victoria government waste datasets.
        </p>
        {error && (
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <span className="text-amber-600">⚠️</span>
              <span className="text-amber-800 text-sm">{error}</span>
            </div>
            <button 
              onClick={loadCSVData}
              className="mt-2 text-amber-700 hover:text-amber-900 text-sm underline"
            >
              Try reloading data
            </button>
          </div>
        )}
      </div>

      {/* Impact Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Trash2 className="w-8 h-8 text-red-500" />
            <TrendingUp className="w-5 h-5 text-red-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{impact.wasteGenerated}M</div>
          <div className="text-sm text-gray-600">tonnes generated (latest year)</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Recycle className="w-8 h-8 text-green-500" />
            <TrendingUp className="w-5 h-5 text-green-400" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{impact.diversionRate}%</div>
          <div className="text-sm text-gray-600">diversion rate (target: 80%)</div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 relative overflow-hidden">
          {/* Background image placeholder */}
          <div className="absolute inset-0 opacity-10">
            {/* Add your background image here */}
            {/* <img src="/path/to/factory-icon.svg" alt="" className="w-full h-full object-cover" /> */}
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-orange-200 rounded-lg flex items-center justify-center">
                {/* Factory icon placeholder - replace with actual icon */}
                <div className="w-4 h-4 bg-orange-600 rounded"></div>
              </div>
              <TrendingDown className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{impact.totalCO2}</div>
            <div className="text-sm text-gray-600">tonnes CO2-e from disposal</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 relative overflow-hidden">
          {/* Background image placeholder */}
          <div className="absolute inset-0 opacity-10">
            {/* Add your background image here */}
            {/* <img src="/path/to/car-icon.svg" alt="" className="w-full h-full object-cover" /> */}
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="w-8 h-8 bg-blue-200 rounded-lg flex items-center justify-center">
                {/* Car icon placeholder - replace with actual icon */}
                <div className="w-4 h-4 bg-blue-600 rounded"></div>
              </div>
              <TrendingDown className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-gray-900">{impact.carsEquivalent}</div>
            <div className="text-sm text-gray-600">cars worth of emissions</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs for Data Views */}
      <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-xl">
        {[
          { id: 'trends', label: 'Waste Trends', icon: TrendingUp },
          { id: 'materials', label: 'Material Breakdown', icon: Building }
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveView(id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors flex-1 justify-center ${
              activeView === id
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-gray-600 hover:text-emerald-600'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Data Visualization Content */}
      {activeView === 'trends' && (
        <div className="space-y-8">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Victoria Waste Generation Trends</h3>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={data.wasteTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis label={{ value: 'Million Tonnes', angle: -90, position: 'insideLeft' }} />
                <Tooltip 
                  formatter={(value, name) => [
                    `${value.toFixed(2)}M tonnes`, 
                    name === 'totalGeneration' ? 'Total Generation' :
                    name === 'disposal' ? 'Disposal' :
                    name === 'recovered' ? 'Recovered' : 'Exports'
                  ]} 
                />
                <Legend />
                <Area type="monotone" dataKey="totalGeneration" stackId="1" stroke="#ef4444" fill="#fef2f2" name="Total Generation" />
                <Area type="monotone" dataKey="recovered" stackId="2" stroke="#10b981" fill="#d1fae5" name="Recovered" />
                <Area type="monotone" dataKey="disposal" stackId="2" stroke="#f59e0b" fill="#fef3c7" name="Disposal" />
                <Area type="monotone" dataKey="exports" stackId="2" stroke="#3b82f6" fill="#dbeafe" name="Exports" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Diversion Rate Progress</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data.wasteTrends}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis domain={[60, 75]} label={{ value: 'Diversion Rate (%)', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value) => [`${value.toFixed(1)}%`, 'Diversion Rate']} />
                <Line type="monotone" dataKey="diversionRate" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', strokeWidth: 2, r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                💡 <strong>Target:</strong> Victoria aims for 80% diversion rate by 2030. Current rate: {impact.diversionRate}%
              </p>
            </div>
          </div>
        </div>
      )}

      {activeView === 'materials' && (
        <div className="space-y-8">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Material Breakdown by Source Sector</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data.materialBreakdown} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="materialType" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100}
                  interval={0}
                />
                <YAxis label={{ value: 'Million Tonnes', angle: -90, position: 'insideLeft' }} />
                <Tooltip formatter={(value, name) => [
                  `${value.toFixed(1)}M tonnes`, 
                  name === 'msw' ? 'Municipal Solid Waste' :
                  name === 'cnd' ? 'Construction & Demolition' :
                  name === 'cni' ? 'Commercial & Industrial' : name
                ]} />
                <Legend />
                <Bar dataKey="msw" stackId="a" fill={sectorColors.MSW} name="Municipal (MSW)" />
                <Bar dataKey="cnd" stackId="a" fill={sectorColors.CND} name="Construction (CND)" />
                <Bar dataKey="cni" stackId="a" fill={sectorColors.CNI} name="Commercial (CNI)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Insights</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Building className="w-5 h-5 text-amber-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Construction dominates</p>
                    <p className="text-sm text-gray-600">C&D materials make up the largest waste streams</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Home className="w-5 h-5 text-red-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Household potential</p>
                    <p className="text-sm text-gray-600">Municipal waste offers significant diversion opportunities</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Recycle className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900">Recovery opportunities</p>
                    <p className="text-sm text-gray-600">Multiple material streams show recovery potential</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Waste by Source Sector</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Municipal (MSW)', value: data.materialBreakdown.reduce((sum, item) => sum + item.msw, 0), color: sectorColors.MSW },
                      { name: 'Construction (CND)', value: data.materialBreakdown.reduce((sum, item) => sum + item.cnd, 0), color: sectorColors.CND },
                      { name: 'Commercial (CNI)', value: data.materialBreakdown.reduce((sum, item) => sum + item.cni, 0), color: sectorColors.CNI }
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {[
                      { name: 'Municipal (MSW)', value: data.materialBreakdown.reduce((sum, item) => sum + item.msw, 0), color: sectorColors.MSW },
                      { name: 'Construction (CND)', value: data.materialBreakdown.reduce((sum, item) => sum + item.cnd, 0), color: sectorColors.CND },
                      { name: 'Commercial (CNI)', value: data.materialBreakdown.reduce((sum, item) => sum + item.cni, 0), color: sectorColors.CNI }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value.toFixed(1)}M tonnes`]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WasteAnalytics;