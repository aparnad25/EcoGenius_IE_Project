import React, { useState, useEffect } from "react";
import { TrendingUp, BarChart3, Download, Info, ArrowLeft, Activity, Users, AlertTriangle, Play } from "lucide-react";

export default function Visualization() {
  const [migrationData, setMigrationData] = useState([]);
  const [wasteFlowData, setWasteFlowData] = useState([]);
  const [wasteByMaterialData, setWasteByMaterialData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeChart, setActiveChart] = useState('migration');

  // Load CSV data from public folder
  const loadData = async () => {
    try {
      setLoading(true);

      // Load migration data from public folder using fetch
      try {
        const migrationResponse = await fetch('/vic_nom_last5.csv');
        if (!migrationResponse.ok) {
          throw new Error(`HTTP error! status: ${migrationResponse.status}`);
        }
        const migrationCsv = await migrationResponse.text();
        const migrationParsed = parseCsv(migrationCsv);
        setMigrationData(migrationParsed);
        console.log('Migration data loaded from CSV:', migrationParsed);
      } catch (err) {
        console.error('Failed to load migration data from /vic_nom_last5.csv:', err);
        setError('Cannot load migration data. Please ensure vic_nom_last5.csv is in the public/ folder and accessible.');
      }

      // Load waste summary data from public folder using fetch
      try {
        const wasteSummaryResponse = await fetch('/Merged_vic_waste_summary.csv');
        if (!wasteSummaryResponse.ok) {
          throw new Error(`HTTP error! status: ${wasteSummaryResponse.status}`);
        }
        const wasteSummaryCsv = await wasteSummaryResponse.text();
        const wasteSummaryParsed = parseCsv(wasteSummaryCsv);
        setWasteFlowData(wasteSummaryParsed);
        console.log('Waste summary data loaded from CSV:', wasteSummaryParsed);
      } catch (err) {
        console.error('Failed to load waste summary data from /Merged_vic_waste_summary.csv:', err);
        setError('Cannot load waste summary data. Please ensure Merged_vic_waste_summary.csv is in the public/ folder and accessible.');
      }

      // Load detailed waste data from public folder using fetch
      try {
        const wasteDetailResponse = await fetch('/Victoria-Waste-v2025.1_clean.csv');
        if (!wasteDetailResponse.ok) {
          throw new Error(`HTTP error! status: ${wasteDetailResponse.status}`);
        }
        const wasteDetailCsv = await wasteDetailResponse.text();
        const wasteDetailParsed = parseCsv(wasteDetailCsv);
        setWasteByMaterialData(wasteDetailParsed);
        console.log('Detailed waste data loaded from CSV:', wasteDetailParsed.length, 'rows');
      } catch (err) {
        console.error('Failed to load detailed waste data from /Victoria-Waste-v2025.1_clean.csv:', err);
        setError('Cannot load detailed waste data. Please ensure Victoria-Waste-v2025.1_clean.csv is in the public/ folder and accessible.');
      }

    } catch (error) {
      console.error('Error loading data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Simple CSV parser
  const parseCsv = (csvContent) => {
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const obj = {};
      headers.forEach((header, index) => {
        const value = values[index]?.trim().replace(/"/g, '');
        if (!isNaN(value) && value !== '' && value !== null && value !== undefined) {
          obj[header] = parseFloat(value);
        } else {
          obj[header] = value;
        }
      });
      return obj;
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  // Migration visualization (converted from migrant_vis.py)
  const createMigrationChart = () => {
    if (!migrationData.length) {
      setError('Migration chart cannot be created - no data available. This visualization requires migrant_vis.py data processing.');
      return;
    }
    
    if (typeof window.Plotly === 'undefined') {
      setError('Plotly.js is not loaded. Migration visualization from migrant_vis.py cannot be rendered.');
      return;
    }

    const years = migrationData.map(d => d.FinancialYear);
    const yVals = migrationData.map(d => d.NetMigrant);
    
    const covidYear = "2020-21";
    const covidY = migrationData.find(d => d.FinancialYear === covidYear)?.NetMigrant || 0;
    
    const posYears = years.filter(y => y !== covidYear);
    const posVals = yVals.filter((v, i) => years[i] !== covidYear);

    const data = [
      {
        x: years,
        y: yVals,
        mode: 'lines',
        line: { color: '#0072B2', width: 3 },
        hoverinfo: 'skip',
        showlegend: false,
        type: 'scatter'
      },
      {
        x: posYears,
        y: posVals,
        mode: 'markers',
        marker: {
          size: 8,
          color: '#0072B2',
          line: { color: 'white', width: 1.5 }
        },
        hovertemplate: 'Year: %{x}<br>Net Migrants: %{y:,}<extra></extra>',
        hoverlabel: { bgcolor: '#0072B2' },
        showlegend: false,
        type: 'scatter'
      },
      {
        x: [covidYear],
        y: [covidY],
        mode: 'markers',
        marker: {
          size: 8,
          color: '#d62728',
          line: { color: 'white', width: 1.5 }
        },
        hovertemplate: 'Year: %{x}<br>Net Migrants: %{y:,}<extra></extra>',
        hoverlabel: { bgcolor: '#d62728' },
        showlegend: false,
        type: 'scatter'
      }
    ];

    const layout = {
      title: {
        text: 'Net Overseas Migration in Victoria<br>(2019–20 to 2023–24)',
        x: 0.5,
        xanchor: 'center',
        font: { size: 22 }
      },
      xaxis: {
        title: { text: 'Financial Year', font: { size: 14 } },
        categoryorder: 'array',
        categoryarray: years,
        ticks: 'outside'
      },
      yaxis: {
        title: { text: 'Net Overseas Migrants', font: { size: 14 } },
        tickformat: '~s',
        gridcolor: '#e8e8e8',
        zeroline: false
      },
      hovermode: 'closest',
      margin: { l: 90, r: 40, t: 110, b: 150 },
      plot_bgcolor: 'white',
      paper_bgcolor: 'white',
      annotations: [
        {
          x: covidYear,
          y: -0.12,
          xref: 'x',
          yref: 'paper',
          text: 'Significant drop due to COVID-19',
          showarrow: false,
          font: { color: '#d62728', size: 12 },
          align: 'center'
        },
        {
          x: 0,
          y: -0.25,
          xref: 'paper',
          yref: 'paper',
          text: 'Source: Australian Bureau of Statistics',
          showarrow: false,
          xanchor: 'left',
          font: { color: '#6b6b6b', size: 11 }
        }
      ],
      shapes: [
        {
          type: 'line',
          xref: 'x',
          yref: 'y',
          x0: years[0],
          x1: years[years.length - 1],
          y0: 0,
          y1: 0,
          line: { color: '#9e9e9e', width: 1 }
        }
      ]
    };

    const config = { responsive: true, displayModeBar: true };
    window.Plotly.newPlot('migration-chart', data, layout, config);
  };

  // Waste flows visualization (converted from epic3.py - Visualization 1)
  const createWasteFlowsChart = () => {
    if (!wasteFlowData.length) {
      setError('Waste flows chart cannot be created - no data available. This visualization requires epic3.py data processing.');
      return;
    }
    
    if (typeof window.Plotly === 'undefined') {
      setError('Plotly.js is not loaded. Waste flows visualization from epic3.py cannot be rendered.');
      return;
    }

    // Convert to thousand tonnes
    const processedData = wasteFlowData.map(row => ({
      'Financial Year': row['Financial Year'],
      'Total Generation': row['Total Generation'] / 1000,
      'Disposal': row['Disposal'] / 1000,
      'Recovered locally': row['Recoverd locally (including Waste to Energy)'] / 1000,
      'Exports': row['Exports'] / 1000
    }));

    const data = [
      {
        x: processedData.map(d => d['Financial Year']),
        y: processedData.map(d => d['Total Generation']),
        mode: 'lines+markers',
        name: 'Total Generation',
        line: { color: '#1f77b4' },
        type: 'scatter'
      },
      {
        x: processedData.map(d => d['Financial Year']),
        y: processedData.map(d => d['Disposal']),
        mode: 'lines+markers',
        name: 'Disposal',
        line: { color: '#ff7f0e' },
        type: 'scatter'
      },
      {
        x: processedData.map(d => d['Financial Year']),
        y: processedData.map(d => d['Recovered locally']),
        mode: 'lines+markers',
        name: 'Recovered locally',
        line: { color: '#2ca02c' },
        type: 'scatter'
      },
      {
        x: processedData.map(d => d['Financial Year']),
        y: processedData.map(d => d['Exports']),
        mode: 'lines+markers',
        name: 'Exports',
        line: { color: '#d62728' },
        type: 'scatter'
      }
    ];

    const layout = {
      title: {
        text: 'Victoria Annual Waste Flows (in thousand tonnes)',
        x: 0.5,
        font: { size: 22 }
      },
      xaxis: { 
        title: 'Year',
        tickangle: -45
      },
      yaxis: { title: 'Thousand Tonnes' },
      hovermode: 'x unified',
      legend: { title: { text: 'Waste Flow' } },
      template: 'plotly_white',
      height: 600,
      margin: { l: 80, r: 80, t: 80, b: 100 }
    };

    const config = { responsive: true, displayModeBar: true };
    window.Plotly.newPlot('waste-flows-chart', data, layout, config);
  };

  // Recovery rate by sector visualization (converted from epic3.py - Visualization 3)
  const createRecoveryRateChart = () => {
    if (!wasteByMaterialData.length) {
      setError('Recovery rate chart cannot be created - no data available. This visualization requires epic3.py data processing.');
      return;
    }
    
    if (typeof window.Plotly === 'undefined') {
      setError('Plotly.js is not loaded. Recovery rate visualization from epic3.py cannot be rendered.');
      return;
    }

    console.log('Processing recovery rate data...', wasteByMaterialData.slice(0, 3));

    // Process data exactly like in epic3.py
    const sectorAggregations = {};
    
    wasteByMaterialData.forEach(row => {
      const year = row['Financial Year'];
      const sector = row['Source Sector'];
      
      // Skip invalid rows
      if (!year || !sector) return;
      
      const key = `${year}-${sector}`;
      
      if (!sectorAggregations[key]) {
        sectorAggregations[key] = {
          year,
          sector,
          totalGeneration: 0,
          disposal: 0,
          recovered: 0,
          exports: 0
        };
      }
      
      // Safely add values, treating null/undefined as 0
      sectorAggregations[key].totalGeneration += parseFloat(row['Total Generation'] || 0);
      sectorAggregations[key].disposal += parseFloat(row['Disposal'] || 0);
      sectorAggregations[key].recovered += parseFloat(row['Recoverd locally (including Waste to Energy)'] || 0);
      
      // Calculate exports (International + Interstate)
      const intlExport = parseFloat(row['International Export'] || 0);
      const interstateExport = parseFloat(row['Interstate Export'] || 0);
      sectorAggregations[key].exports += intlExport + interstateExport;
    });

    console.log('Sector aggregations:', Object.values(sectorAggregations).slice(0, 5));

    // Calculate recovery rates
    const processedSectorData = Object.values(sectorAggregations)
      .map(d => ({
        ...d,
        recoveryRate: d.totalGeneration > 0 
          ? ((d.recovered + d.exports) / d.totalGeneration * 100) 
          : 0
      }))
      .filter(d => d.recoveryRate >= 0 && d.recoveryRate <= 100); // Filter out invalid rates

    console.log('Processed sector data:', processedSectorData.slice(0, 5));

    // Define sectors and their display names (from epic3.py)
    const sectorMapping = {
      'CND': 'Construction & Demolition',
      'CNI': 'Commercial & Industrial', 
      'MSW': 'Municipal Solid Waste'
    };
    
    const colors = {
      'CND': '#1f77b4',
      'CNI': '#ff7f0e',
      'MSW': '#2ca02c'
    };

    // Group data by sector and create traces
    const data = Object.keys(sectorMapping).map(sectorCode => {
      const sectorData = processedSectorData.filter(d => d.sector === sectorCode);
      
      if (sectorData.length === 0) {
        console.warn(`No data found for sector: ${sectorCode}`);
        return null;
      }
      
      // Sort by year for proper line connection
      sectorData.sort((a, b) => a.year.localeCompare(b.year));
      
      const years = sectorData.map(d => d.year);
      const recoveryRates = sectorData.map(d => d.recoveryRate);
      
      console.log(`${sectorCode} data:`, { years, recoveryRates });

      return {
        x: years,
        y: recoveryRates,
        mode: 'lines+markers',
        name: sectorMapping[sectorCode],
        line: { color: colors[sectorCode] },
        marker: { size: 6 },
        type: 'scatter',
        hovertemplate: '%{fullData.name}<br>Year: %{x}<br>Recovery Rate: %{y:.1f}%<extra></extra>'
      };
    }).filter(trace => trace !== null); // Remove null traces

    if (data.length === 0) {
      setError('No valid recovery rate data found. Check that the CSV contains the required columns: Financial Year, Source Sector, Total Generation, Disposal, etc.');
      return;
    }

    const layout = {
      title: {
        text: 'Recovery Rate Over Time by Source Sector',
        x: 0.5,
        font: { size: 22 }
      },
      xaxis: { 
        title: 'Year', 
        tickangle: -30 
      },
      yaxis: { 
        title: 'Recovery Rate (%)',
        range: [0, 100],
        ticksuffix: '%'
      },
      hovermode: 'x unified',
      template: 'plotly_white',
      height: 600,
      margin: { l: 80, r: 80, t: 80, b: 100 },
      legend: {
        x: 0.02,
        y: 0.98,
        bgcolor: 'rgba(255,255,255,0.8)',
        bordercolor: '#e5e5e5',
        borderwidth: 1
      }
    };

    const config = { responsive: true, displayModeBar: true };
    window.Plotly.newPlot('recovery-rate-chart', data, layout, config);
  };

  useEffect(() => {
    if (!loading) {
      setTimeout(() => {
        if (activeChart === 'migration') {
          createMigrationChart();
        } else if (activeChart === 'waste-flows') {
          createWasteFlowsChart();
        } else if (activeChart === 'recovery-rate') {
          createRecoveryRateChart();
        }
      }, 100);
    }
  }, [loading, migrationData, wasteFlowData, wasteByMaterialData, activeChart]);

  const handleBackToDashboard = () => {
    // Navigate back to dashboard - adjust this based on your routing setup
    window.history.back();
    // Alternative: window.location.href = '/Dashboard';
  };

  const exportData = () => {
    const dataToExport = {
      migrationData,
      wasteFlowData,
      wasteByMaterialData,
      exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'melbourne-analytics-data.json';
    link.click();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Loading Analytics</h2>
          <p className="text-gray-600">
            Converting CSV data to interactive visualizations...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-12">
          <button 
            onClick={handleBackToDashboard}
            className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Dashboard</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Data Visualization
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Understanding Melbourne's migration patterns and their impact on waste management through interactive data analysis.
            </p>
          </div>
        </div>

        {/* Chart Selection */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveChart('migration')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                activeChart === 'migration'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-emerald-50'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Migration Trends</span>
            </button>
            <button
              onClick={() => setActiveChart('waste-flows')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                activeChart === 'waste-flows'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-emerald-50'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Waste Flows</span>
            </button>
            <button
              onClick={() => setActiveChart('recovery-rate')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                activeChart === 'recovery-rate'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-emerald-50'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>Recovery Rates</span>
            </button>
          </div>
        </div>

        {/* Chart Container */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <Activity className="w-8 h-8 text-emerald-500" />
              <h2 className="text-2xl font-bold text-gray-900">
                {activeChart === 'migration' && 'Migration Analysis'}
                {activeChart === 'waste-flows' && 'Victoria Annual Waste Flows'}
                {activeChart === 'recovery-rate' && 'Recovery Rate by Sector'}
              </h2>
            </div>
            <button
              onClick={exportData}
              className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors"
            >
              <Download className="w-5 h-5" />
              <span>Export Data</span>
            </button>
          </div>
          
          {/* Chart div - Plotly will render here */}
          <div 
            id={activeChart === 'migration' ? 'migration-chart' : 
                activeChart === 'waste-flows' ? 'waste-flows-chart' : 'recovery-rate-chart'}
            className="w-full min-h-[500px]"
          ></div>

          {/* Error Display */}
          {error && (
            <div className="mt-6 p-6 bg-red-50 border-2 border-red-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Visualization Error</h3>
                  <p className="text-red-700 mb-3">{error}</p>
                  <div className="text-sm text-red-600">
                    <p className="font-medium mb-2">Required files for Python visualization integration:</p>
                    <ul className="list-disc list-inside space-y-1 pl-4">
                      <li><code>public/vic_nom_last5.csv</code> (for migrant_vis.py visualization)</li>
                      <li><code>public/Merged_vic_waste_summary.csv</code> (for epic3.py visualization 1)</li>
                      <li><code>public/Victoria-Waste-v2025.1_clean.csv</code> (for epic3.py visualization 3)</li>
                    </ul>
                    <p className="mt-3">
                      <strong>Note:</strong> This React component replicates the exact visualizations from your Python files 
                      (migrant_vis.py and epic3.py) but requires the original data files to function properly.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Info className="w-8 h-8 text-blue-500" />
            <h2 className="text-2xl font-bold text-gray-900">Data Insights</h2>
          </div>
          
          {activeChart === 'migration' && (
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>Python Integration:</strong> This chart replicates the exact visualization from <code>migrant_vis.py</code>, 
                showing net overseas migration to Victoria with COVID-19 impact analysis.
              </p>
              <p className="text-gray-700">
                <strong>Migration Impact:</strong> The data shows a significant drop in net overseas migration during 2020-21 due to COVID-19 restrictions, 
                followed by a substantial recovery in subsequent years.
              </p>
              <p className="text-gray-700">
                <strong>Waste Correlation:</strong> Population changes directly impact waste generation patterns and disposal infrastructure needs 
                across Melbourne metropolitan areas.
              </p>
            </div>
          )}
          
          {activeChart === 'waste-flows' && (
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>Python Integration:</strong> This chart replicates Visualization 1 from <code>epic3.py</code>, 
                displaying Victoria's annual waste flows in thousand tonnes.
              </p>
              <p className="text-gray-700">
                <strong>Waste Generation:</strong> Victoria's total waste generation shows an upward trend, with significant portions 
                being recovered locally and exported for processing.
              </p>
              <p className="text-gray-700">
                <strong>Recovery Trends:</strong> Local recovery capacity has been growing, reducing reliance on interstate exports 
                and landfill disposal.
              </p>
            </div>
          )}
          
          {activeChart === 'recovery-rate' && (
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>Python Integration:</strong> This chart replicates Visualization 3 from <code>epic3.py</code>, 
                showing recovery rate trends by source sector over time.
              </p>
              <p className="text-gray-700">
                <strong>Sector Performance:</strong> Construction & Demolition waste shows the highest recovery rates, 
                while Municipal Solid Waste faces ongoing challenges in recovery optimization.
              </p>
              <p className="text-gray-700">
                <strong>Improvement Opportunities:</strong> Commercial & Industrial waste recovery rates show potential 
                for improvement through better sorting and processing infrastructure.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}