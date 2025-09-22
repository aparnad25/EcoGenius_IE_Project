import { useState, useEffect, useCallback } from "react";
import { TrendingUp, BarChart3, ArrowLeft, Activity, Users, AlertTriangle, Recycle, Trash2, TrendingDown, Search, Lightbulb } from "lucide-react";

export default function Visualization() {
  const [wasteData, setWasteData] = useState([]);
  const [vlgasData, setVlgasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeChart, setActiveChart] = useState('recovery-rate');

  // Load CSV data from public folder
  const loadData = async () => {
    try {
      setLoading(true);

      // Load Victoria Waste data
      try {
        const wasteResponse = await fetch('/Victoria-Waste-v2025.1_clean.csv');
        if (!wasteResponse.ok) {
          throw new Error(`HTTP error! status: ${wasteResponse.status}`);
        }
        const wasteCsv = await wasteResponse.text();
        const wasteParsed = parseCsv(wasteCsv);
        setWasteData(wasteParsed);
        console.log('Waste data loaded:', wasteParsed.length, 'rows');
      } catch (err) {
        console.error('Failed to load Victoria-Waste-v2025.1_clean.csv:', err);
        setError('Cannot load waste data. Please ensure Victoria-Waste-v2025.1_clean.csv is in the public/ folder.');
      }

      // Load VLGAS data
      try {
        const vlgasResponse = await fetch('/VLGAS_v2025.02.csv');
        if (!vlgasResponse.ok) {
          throw new Error(`HTTP error! status: ${vlgasResponse.status}`);
        }
        const vlgasCsv = await vlgasResponse.text();
        const vlgasParsed = parseCsv(vlgasCsv);
        setVlgasData(vlgasParsed);
        console.log('VLGAS data loaded:', vlgasParsed.length, 'rows');
      } catch (err) {
        console.error('Failed to load VLGAS_v2025.02.csv:', err);
        setError('Cannot load VLGAS data. Please ensure VLGAS_v2025.02.csv is in the public/ folder.');
      }

    } catch (error) {
      console.error('Error loading data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // CSV parser
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Visualization 1: Recovery Rate by Source Sector (Grouped Bar Chart)
  const createRecoveryRateChart = useCallback(() => {
    if (!wasteData.length || typeof window.Plotly === 'undefined') {
      setError('Recovery rate chart cannot be created.');
      return;
    }

    // Find the processed-locally column
    const procCol = 'Recoverd locally (including Waste to Energy)';
    
    // Aggregate by year and source sector
    const sectorAgg = {};
    wasteData.forEach(row => {
      const year = row['Financial Year'];
      const sector = row['Source Sector'];
      const key = `${year}-${sector}`;
      
      if (!sectorAgg[key]) {
        sectorAgg[key] = {
          year,
          sector,
          totalGeneration: 0,
          disposal: 0,
          recovered: 0,
          exports: 0
        };
      }
      
      sectorAgg[key].totalGeneration += parseFloat(row['Total Generation'] || 0);
      sectorAgg[key].disposal += parseFloat(row['Disposal'] || 0);
      sectorAgg[key].recovered += parseFloat(row[procCol] || 0);
      sectorAgg[key].exports += parseFloat(row['International Export'] || 0) + parseFloat(row['Interstate Export'] || 0);
    });

    // Calculate recovery rates and convert financial year to single year
    const sectorData = Object.values(sectorAgg).map(d => ({
      ...d,
      recoveryRate: d.totalGeneration > 0 ? ((d.recovered + d.exports) / d.totalGeneration * 100) : 0,
      singleYear: parseInt(d.year.split('-')[1])
    }));

    // Rename sectors
    const sectorNames = {
      'CND': 'Construction & Demolition',
      'CNI': 'Commercial & Industrial',
      'MSW': 'Municipal Solid Waste (Household)'
    };

    const colors = {
      'Construction & Demolition': '#9467bd',
      'Commercial & Industrial': '#ff7f0e',
      'Municipal Solid Waste (Household)': '#1f77b4'
    };

    const traces = ['CND', 'CNI', 'MSW'].map(sectorCode => {
      const filteredData = sectorData.filter(d => d.sector === sectorCode);
      const displayName = sectorNames[sectorCode];
      
      return {
        x: filteredData.map(d => d.singleYear),
        y: filteredData.map(d => d.recoveryRate),
        name: displayName,
        type: 'bar',
        marker: { color: colors[displayName] },
        hovertemplate: 'Year %{x}<br>%{fullData.name}: %{y:.0f}%<extra></extra>'
      };
    });

    const layout = {
      title: 'Recovery Rate by Source Sector (Grouped by Year)',
      xaxis: { title: 'Year' },
      yaxis: { title: 'Recovery Rate %', range: [0, 100], ticksuffix: '%' },
      barmode: 'group',
      hovermode: 'x unified',
      height: 600,
      template: 'plotly_white'
    };

    window.Plotly.newPlot('recovery-rate-chart', traces, layout, { responsive: true, displayModeBar: false });
  }, [wasteData]);

  // Visualization 2: Total Tonnes Collected vs Kerbside Diversion Rate
  const createDiversionRateChart = useCallback(() => {
    if (!vlgasData.length || typeof window.Plotly === 'undefined') {
      setError('Diversion rate chart cannot be created.');
      return;
    }

    // Aggregate by year
    const yearAgg = {};
    vlgasData.forEach(row => {
      const year = parseInt(row['financial_year']?.split('-')[1]);
      if (!year) return;
      
      if (!yearAgg[year]) {
        yearAgg[year] = {
          garbage: 0,
          recycling: 0,
          organics: 0,
          glass: 0
        };
      }
      
      yearAgg[year].garbage += parseFloat(row['garbage_collected_total_tonnes'] || 0);
      yearAgg[year].recycling += parseFloat(row['kerbside_recycling_total_collected_tonnes'] || 0);
      yearAgg[year].organics += parseFloat(row['kerbside_organics_collected_tonnes'] || 0);
      yearAgg[year].glass += parseFloat(row['kerbside_glass_total_collected_tonnes'] || 0);
    });

    const years = Object.keys(yearAgg).sort();
    const totalCollected = years.map(y => {
      const data = yearAgg[y];
      return (data.garbage + data.recycling + data.organics + data.glass) / 1000;
    });
    const diversionRate = years.map(y => {
      const data = yearAgg[y];
      const total = data.garbage + data.recycling + data.organics + data.glass;
      return total > 0 ? ((data.recycling + data.organics + data.glass) / total * 100) : 0;
    });

    const traces = [
      {
        x: years,
        y: totalCollected,
        name: 'Total collected (kt)',
        type: 'bar',
        marker: { color: 'skyblue' },
        hovertemplate: 'Year: %{x}<br>Total collected: %{y:.1f} kt<extra></extra>'
      },
      {
        x: years,
        y: diversionRate,
        name: 'Diversion rate (%)',
        type: 'scatter',
        mode: 'lines+markers',
        line: { color: 'darkgreen', width: 2 },
        yaxis: 'y2',
        hovertemplate: 'Year: %{x}<br>Diversion rate: %{y:.1f}%<extra></extra>'
      }
    ];

    const layout = {
      title: 'Total Tonnes Collected vs Kerbside Diversion Rate (Victoria)',
      xaxis: { title: 'Year' },
      yaxis: { title: 'Total Collected (thousand tonnes)' },
      yaxis2: { title: 'Diversion Rate (%)', overlaying: 'y', side: 'right' },
      hovermode: 'x unified',
      height: 600,
      template: 'plotly_white'
    };

    window.Plotly.newPlot('diversion-rate-chart', traces, layout, { responsive: true, displayModeBar: false });
  }, [vlgasData]);

  // Visualization 3: Hard Waste Collected: Recovered vs Landfilled
  const createHardWasteChart = useCallback(() => {
    if (!vlgasData.length || typeof window.Plotly === 'undefined') {
      setError('Hard waste chart cannot be created.');
      return;
    }

    // Aggregate by financial year
    const hwAgg = {};
    vlgasData.forEach(row => {
      const fy = row['financial_year'];
      if (!hwAgg[fy]) {
        hwAgg[fy] = {
          collected: 0,
          disposed: 0
        };
      }
      hwAgg[fy].collected += parseFloat(row['hardwaste_collected_tonnes'] || 0);
      hwAgg[fy].disposed += parseFloat(row['hardwaste_disposed_tonnes'] || 0);
    });

    // Convert to arrays and filter years 2009-2024
    const data = Object.entries(hwAgg)
      .map(([fy, values]) => ({
        year: parseInt(fy.split('-')[1]),
        collected: values.collected,
        disposed: values.disposed,
        recovered: values.collected - values.disposed
      }))
      .filter(d => d.year >= 2009 && d.year <= 2024)
      .sort((a, b) => a.year - b.year);

    const years = data.map(d => d.year);
    const disposed = data.map(d => d.disposed);
    const recovered = data.map(d => d.recovered);
    const disposedPct = data.map(d => (d.disposed / d.collected * 100).toFixed(1) + '%');
    const recoveredPct = data.map(d => (d.recovered / d.collected * 100).toFixed(1) + '%');

    const traces = [
      {
        x: years,
        y: disposed,
        name: 'Disposed to landfill',
        type: 'bar',
        marker: { color: 'tomato' },
        text: disposedPct,
        textposition: 'inside',
        hovertemplate: 'Year: %{x}<br>Disposed: %{y:.1f} t<br>Rate: %{text}<extra></extra>'
      },
      {
        x: years,
        y: recovered,
        name: 'Recovered / Reused',
        type: 'bar',
        marker: { color: 'seagreen' },
        text: recoveredPct,
        textposition: 'inside',
        hovertemplate: 'Year: %{x}<br>Recovered: %{y:.1f} t<br>Rate: %{text}<extra></extra>'
      }
    ];

    const layout = {
      title: 'Hard Waste Collected: Recovered vs Landfilled',
      xaxis: { title: 'Year' },
      yaxis: { title: 'Tonnes' },
      barmode: 'stack',
      hovermode: 'x unified',
      height: 600,
      template: 'plotly_white'
    };

    window.Plotly.newPlot('hard-waste-chart', traces, layout, { responsive: true, displayModeBar: false });
  }, [vlgasData]);

  // Visualization 4: Population vs Total Mixed Recycling Collected
  const createPopulationRecyclingChart = useCallback(() => {
    if (!vlgasData.length || typeof window.Plotly === 'undefined') {
      setError('Population recycling chart cannot be created.');
      return;
    }

    // Aggregate by year
    const popAgg = {};
    vlgasData.forEach(row => {
      const fy = row['financial_year'];
      const year = parseInt(fy?.split('-')[1]);
      if (!year) return;
      
      if (!popAgg[year]) {
        popAgg[year] = {
          population: 0,
          recycling: 0
        };
      }
      popAgg[year].population += parseFloat(row['Population'] || 0);
      popAgg[year].recycling += parseFloat(row['kerbside_recycling_total_collected_tonnes'] || 0);
    });

    const years = Object.keys(popAgg).sort();
    const population = years.map(y => popAgg[y].population / 1000000);
    const recycling = years.map(y => popAgg[y].recycling / 1000);

    const traces = [
      {
        x: years,
        y: population,
        name: 'Population (millions)',
        type: 'scatter',
        mode: 'lines+markers',
        line: { color: 'royalblue', width: 3 },
        hovertemplate: 'Year: %{x}<br>Population: %{y:.2f} M<extra></extra>'
      },
      {
        x: years,
        y: recycling,
        name: 'Mixed recycling collected (kt)',
        type: 'scatter',
        mode: 'lines+markers',
        line: { color: 'green', width: 3 },
        yaxis: 'y2',
        hovertemplate: 'Year: %{x}<br>Recycling: %{y:.1f} kt<extra></extra>'
      }
    ];

    const layout = {
      title: 'Population vs Total Mixed Recycling Collected (Victoria)',
      xaxis: { title: 'Year' },
      yaxis: { title: 'Population (millions)' },
      yaxis2: { title: 'Recycling collected (thousand tonnes)', overlaying: 'y', side: 'right' },
      hovermode: 'x unified',
      height: 600,
      template: 'plotly_white'
    };

    window.Plotly.newPlot('population-recycling-chart', traces, layout, { responsive: true, displayModeBar: false });
  }, [vlgasData]);

  useEffect(() => {
    if (!loading && !error) {
      setTimeout(() => {
        if (activeChart === 'recovery-rate') {
          createRecoveryRateChart();
        } else if (activeChart === 'diversion-rate') {
          createDiversionRateChart();
        } else if (activeChart === 'hard-waste') {
          createHardWasteChart();
        } else if (activeChart === 'population-recycling') {
          createPopulationRecyclingChart();
        }
      }, 100);
    }
  }, [loading, wasteData, vlgasData, activeChart, error, createRecoveryRateChart, createDiversionRateChart, createHardWasteChart, createPopulationRecyclingChart]);

  const handleBackToDashboard = () => {
    window.history.back();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Loading Analytics</h2>
          <p className="text-gray-600">Processing waste management data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
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
              Waste Management Analytics
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Victoria waste management trends and recycling performance analysis
            </p>
          </div>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => setActiveChart('recovery-rate')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                activeChart === 'recovery-rate'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-emerald-50'
              }`}
            >
              <Recycle className="w-5 h-5" />
              <span>Recovery Rates</span>
            </button>
            <button
              onClick={() => setActiveChart('diversion-rate')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                activeChart === 'diversion-rate'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-emerald-50'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Diversion Trends</span>
            </button>
            <button
              onClick={() => setActiveChart('hard-waste')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                activeChart === 'hard-waste'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-emerald-50'
              }`}
            >
              <Trash2 className="w-5 h-5" />
              <span>Hard Waste</span>
            </button>
            <button
              onClick={() => setActiveChart('population-recycling')}
              className={`px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                activeChart === 'population-recycling'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-white text-gray-600 hover:bg-emerald-50'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Population Impact</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <Activity className="w-8 h-8 text-emerald-500" />
            <h2 className="text-2xl font-bold text-gray-900">
              {activeChart === 'recovery-rate' && 'Recovery Rate by Source Sector'}
              {activeChart === 'diversion-rate' && 'Waste Diversion Performance'}
              {activeChart === 'hard-waste' && 'Hard Waste Management'}
              {activeChart === 'population-recycling' && 'Population & Recycling Correlation'}
            </h2>
          </div>
          
          <div 
            id={`${activeChart}-chart`}
            className="w-full min-h-[500px]"
          ></div>

          {/* Insights Section */}
          <div className="mt-8 p-6 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-emerald-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Key Insights</h3>
                
                {activeChart === 'recovery-rate' && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-red-400">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        </div>
                        <h4 className="font-semibold text-red-600">What Happened</h4>
                      </div>
                      <p className="text-gray-700 ml-11">Household recovery rates are consistently lower than commercial and construction sectors.</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-amber-400">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <Search className="w-4 h-4 text-amber-600" />
                        </div>
                        <h4 className="font-semibold text-amber-600">How It Happens</h4>
                      </div>
                      <p className="text-gray-700 ml-11">Households face more confusion with recycling rules, fear of penalties, fewer facilities, and weaker incentives compared to businesses.</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-emerald-400">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Lightbulb className="w-4 h-4 text-emerald-600" />
                        </div>
                        <h4 className="font-semibold text-emerald-600">Why EcoGenius</h4>
                      </div>
                      <p className="text-gray-700 ml-11">We give newcomers clear, simple recycling guidance so they can catch up with other sectors, reduce mistakes, avoid penalties and boost household recovery.</p>
                    </div>
                  </div>
                )}

                {activeChart === 'diversion-rate' && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-red-400">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        </div>
                        <h4 className="font-semibold text-red-600">What Happened</h4>
                      </div>
                      <p className="text-gray-700 ml-11">Waste generation keeps growing, and although diversion is improving, landfill levels remain high.</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-amber-400">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <Search className="w-4 h-4 text-amber-600" />
                        </div>
                        <h4 className="font-semibold text-amber-600">How It Happens</h4>
                      </div>
                      <p className="text-gray-700 ml-11">Population growth drives more waste, while diversion progress is slowed by inconsistent sorting and low household awareness.</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-emerald-400">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Lightbulb className="w-4 h-4 text-emerald-600" />
                        </div>
                        <h4 className="font-semibold text-emerald-600">Why EcoGenius</h4>
                      </div>
                      <p className="text-gray-700 ml-11">We empower new migrants to recycle correctly from day one, making small individual actions that add up to a stronger diversion trend.</p>
                    </div>
                  </div>
                )}

                {activeChart === 'hard-waste' && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-red-400">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        </div>
                        <h4 className="font-semibold text-red-600">What Happened</h4>
                      </div>
                      <p className="text-gray-700 ml-11">Most hard waste still ends up in landfill, with recovery rates below 25% in most years.</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-amber-400">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <Search className="w-4 h-4 text-amber-600" />
                        </div>
                        <h4 className="font-semibold text-amber-600">How It Happens</h4>
                      </div>
                      <p className="text-gray-700 ml-11">Confusing rules, limited drop-off options, and high costs make it easier for residents to send bulky waste to landfill.</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-emerald-400">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Lightbulb className="w-4 h-4 text-emerald-600" />
                        </div>
                        <h4 className="font-semibold text-emerald-600">Why EcoGenius</h4>
                      </div>
                      <p className="text-gray-700 ml-11">We simplify the process for newcomers by showing exactly how and where to deal with bulky items, so more hard waste is recovered instead of dumped.</p>
                    </div>
                  </div>
                )}

                {activeChart === 'population-recycling' && (
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-red-400">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        </div>
                        <h4 className="font-semibold text-red-600">What Happened</h4>
                      </div>
                      <p className="text-gray-700 ml-11">Victoria&apos;s population keeps rising, but recycling of mixed materials has stagnated or even declined.</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-amber-400">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <Search className="w-4 h-4 text-amber-600" />
                        </div>
                        <h4 className="font-semibold text-amber-600">How It Happens</h4>
                      </div>
                      <p className="text-gray-700 ml-11">Growth in households is not matched with stronger recycling habits or infrastructure, especially among new residents unfamiliar with the system.</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm border-l-4 border-emerald-400">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                          <Lightbulb className="w-4 h-4 text-emerald-600" />
                        </div>
                        <h4 className="font-semibold text-emerald-600">Why EcoGenius</h4>
                      </div>
                      <p className="text-gray-700 ml-11">We connect population growth to sustainability: as newcomers recycle smarter with EcoGenius, Melbourne grows without compromising its environmental goals.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-6 p-6 bg-red-50 border-2 border-red-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-600 mt-0.5" />
                <div>
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Visualization Error</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}