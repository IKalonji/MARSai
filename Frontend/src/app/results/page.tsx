'use client'

import React, { useState, useEffect } from 'react';
import { Download, Filter, PieChart, ArrowUpRight, Rocket } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

const ResultsPage = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [timeFilter, setTimeFilter] = useState('yearly');
  const [taxYear, setTaxYear] = useState('2024');
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from API
  useEffect(() => {
    const fetchAnalysisData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get the wallet address from URL parameters or localStorage
        // For example, you might store it during wallet connection
        const walletAddress = localStorage.getItem('walletAddress') || '';
        
        if (!walletAddress) {
          throw new Error('No wallet address found. Please connect your wallet first.');
        }
        
        // Call your API endpoint
        const response = await fetch(`http://localhost:8085/agent/analyze/${walletAddress}`);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.result === 'error') {
          throw new Error(`Server error: ${data.error}`);
        }
        
        setAnalysisData(data);
      } catch (err) {
        console.error('Error fetching analysis data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysisData();
  }, []);

  // Calculate totals from the tax events
  const calculateTotals = () => {
    if (!analysisData || !analysisData.analysis || !analysisData.analysis.taxableEvents) {
      return { totalGains: 0, shortTermGains: 0, longTermGains: 0 };
    }

    const events = analysisData.analysis.taxableEvents;
    const shortTermGains = events
      .filter(event => event.shortTerm)
      .reduce((sum, event) => sum + event.gainLoss, 0);

    const longTermGains = events
      .filter(event => !event.shortTerm)
      .reduce((sum, event) => sum + event.gainLoss, 0);

    return {
      totalGains: shortTermGains + longTermGains,
      shortTermGains,
      longTermGains
    };
  };

  const { totalGains, shortTermGains, longTermGains } = calculateTotals();

  // Prepare chart data
  const prepareChartData = () => {
    if (!analysisData || !analysisData.analysis || !analysisData.analysis.taxableEvents) return [];
    
    const events = analysisData.analysis.taxableEvents;
    
    // Group by month for yearly view or by day for monthly view
    const groupedData = {};
    
    events.forEach(event => {
      const date = new Date(event.date);
      
      let key;
      if (timeFilter === 'yearly') {
        // Group by month for yearly view
        const month = date.toLocaleString('default', { month: 'short' });
        key = month;
      } else {
        // Group by day for monthly view
        key = date.getDate().toString();
      }
      
      if (!groupedData[key]) {
        groupedData[key] = 0;
      }
      
      groupedData[key] += event.gainLoss;
    });
    
    // Convert to array format for chart
    return Object.keys(groupedData).map(key => ({
      label: key,
      gains: groupedData[key]
    }));
  };

  const chartData = prepareChartData();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-950 text-white p-8 flex items-center justify-center">
        <div className="text-xl">Loading analysis data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-950 text-white p-8 flex flex-col items-center justify-center">
        <div className="text-xl mb-4">Error loading analysis data</div>
        <div className="text-red-400">{error}</div>
        <Link href="/" className="mt-8 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg">
          Back to Home
        </Link>
      </div>
    );
  }

  if (!analysisData || !analysisData.analysis) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-950 text-white p-8 flex flex-col items-center justify-center">
        <div className="text-xl mb-4">No analysis data available</div>
        <Link href="/" className="mt-8 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-950 text-white p-8 pb-20 sm:p-20">
      <header className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-2">
          <Rocket className="w-8 h-8 text-red-500" />
          <span className="text-2xl font-bold">MARS.ai</span>
        </div>
        <nav className="hidden sm:flex gap-8">
          <Link href="/home" className="hover:text-red-300 transition-colors">Mars</Link>
          <Link href="/results" className="hover:text-red-300 transition-colors">Results</Link>
          <Link href="/suggestions" className="hover:text-red-300 transition-colors">Suggestions</Link>
        </nav>
      </header>

      <div className="max-w-6xl mx-auto space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-red-800/50">
            <div className="text-gray-300 text-sm">Total Taxable Amount</div>
            <div className="text-2xl font-bold mb-2">R{totalGains.toLocaleString(undefined, {maximumFractionDigits: 2})}</div>
            <div className="flex items-center text-green-400">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm ml-1">Based on {analysisData.analysis.taxableEvents.length} events</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-red-800/50">
            <div className="text-gray-300 text-sm">Short-Term Gains</div>
            <div className="text-2xl font-bold mb-2">R{shortTermGains.toLocaleString(undefined, {maximumFractionDigits: 2})}</div>
            <div className="flex items-center text-red-400">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm ml-1">Taxed at marginal rate</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-red-800/50">
            <div className="text-gray-300 text-sm">Long-Term Gains</div>
            <div className="text-2xl font-bold mb-2">R{longTermGains.toLocaleString(undefined, {maximumFractionDigits: 2})}</div>
            <div className="flex items-center text-gray-300">
              <Filter className="w-4 h-4" />
              <span className="text-sm ml-1">40% inclusion rate</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-red-800/50">
            <div className="text-gray-300 text-sm">Est. Tax Due</div>
            <div className="text-2xl font-bold mb-2">R{analysisData.analysis.potentialTaxDue.totalTaxDue.toLocaleString(undefined, {maximumFractionDigits: 2})}</div>
            <div className="flex items-center text-yellow-400">
              <PieChart className="w-4 h-4" />
              <span className="text-sm ml-1">Tax Rate: {(analysisData.analysis.potentialTaxDue.taxRate * 100).toFixed(0)}%</span>
            </div>
          </div>
        </div>

        {/* Detailed Analysis */}
        <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-red-800/50">
          <div className="p-6 border-b border-red-800/50">
            <div className="flex justify-between items-center flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-semibold">Detailed Analysis</h2>
                <select 
                  value={taxYear}
                  onChange={(e) => setTaxYear(e.target.value)}
                  className="bg-white/5 border border-red-800/50 rounded-lg px-3 py-2 text-white"
                >
                  <option value="2024">2023/24 Tax Year</option>
                  <option value="2023">2022/23 Tax Year</option>
                </select>
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="bg-white/5 border border-red-800/50 rounded-lg px-3 py-2 text-white"
                >
                  <option value="yearly">Annual View</option>
                  <option value="monthly">Monthly View</option>
                </select>
              </div>
              <Link href="/suggestions" className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Rocket className="w-4 h-4" />
                View AI Suggestions
              </Link>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
                <Download className="w-4 h-4" />
                Export SARS Report
              </button>
            </div>
          </div>

          <div className="p-6">
            {/* Tabs */}
            <div className="border-b border-red-800/50 mb-6">
              <div className="flex gap-4">
                {['summary', 'transactions', 'assets', 'tax_events'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm capitalize ${
                      activeTab === tab 
                        ? 'text-red-400 border-b-2 border-red-400' 
                        : 'text-gray-300 hover:text-red-300'
                    }`}
                  >
                    {tab.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'summary' && (
              <>
                {/* Chart */}
                <div className="h-96 mb-6">
                  <ResponsiveContainer>
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis 
                        dataKey="label" 
                        stroke="#9CA3AF"
                      />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        formatter={(value) => `R${value.toLocaleString(undefined, {maximumFractionDigits: 2})}`}
                        contentStyle={{ 
                          backgroundColor: '#1F2937',
                          border: '1px solid #4B5563'
                        }}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="gains" 
                        stroke="#EF4444" 
                        strokeWidth={2}
                        name="Taxable Gains (ZAR)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Suggestions */}
                <div className="bg-white/5 rounded-lg p-6 border border-red-800/50">
                  <h3 className="text-lg font-semibold mb-4">AI Suggestions</h3>
                  <ul className="space-y-2">
                    {analysisData.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Rocket className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {activeTab === 'transactions' && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-red-800/50">
                      <th className="px-4 py-2 text-left">Date</th>
                      <th className="px-4 py-2 text-left">Crypto</th>
                      <th className="px-4 py-2 text-left">Type</th>
                      <th className="px-4 py-2 text-right">Amount</th>
                      <th className="px-4 py-2 text-right">Proceeds (R)</th>
                      <th className="px-4 py-2 text-right">Cost Basis (R)</th>
                      <th className="px-4 py-2 text-right">Gain/Loss (R)</th>
                      <th className="px-4 py-2 text-center">Term</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysisData.analysis.taxableEvents.map((event) => (
                      <tr key={event.transactionId} className="border-b border-red-800/30 hover:bg-white/5">
                        <td className="px-4 py-2">{new Date(event.date).toLocaleDateString()}</td>
                        <td className="px-4 py-2">{event.crypto}</td>
                        <td className="px-4 py-2 capitalize">{event.transactionType}</td>
                        <td className="px-4 py-2 text-right">{event.amount.toFixed(4)}</td>
                        <td className="px-4 py-2 text-right">{event.proceeds.toFixed(2)}</td>
                        <td className="px-4 py-2 text-right">{event.costBasis.toFixed(2)}</td>
                        <td className={`px-4 py-2 text-right ${event.gainLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {event.gainLoss.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs ${event.shortTerm ? 'bg-red-900/50 text-red-200' : 'bg-blue-900/50 text-blue-200'}`}>
                            {event.shortTerm ? 'Short' : 'Long'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'tax_events' && (
              <div className="bg-white/5 rounded-lg p-6 border border-red-800/50">
                <h3 className="text-lg font-semibold mb-4">Tax Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">Short-Term Gains</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Short-Term Gains:</span>
                        <span>R{analysisData.analysis.potentialTaxDue.totalShortTermGains.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax Rate:</span>
                        <span>{(analysisData.analysis.potentialTaxDue.taxRate * 100).toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Estimated Tax Due:</span>
                        <span>R{analysisData.analysis.potentialTaxDue.totalTaxDue.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Long-Term Gains</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Total Long-Term Gains:</span>
                        <span>R{longTermGains.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Inclusion Rate:</span>
                        <span>40%</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span>Taxable Amount:</span>
                        <span>R{(longTermGains * 0.4).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;