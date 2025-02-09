'use client'

import React, { useState } from 'react';
import { Download, Filter, PieChart, ArrowUpRight, Rocket } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

const ResultsPage = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [timeFilter, setTimeFilter] = useState('yearly');
  const [taxYear, setTaxYear] = useState('2024');

  const yearlyData = [
    { month: 'Mar', gains: 120000 },
    { month: 'Apr', gains: 180000 },
    { month: 'May', gains: 240000 },
    { month: 'Jun', gains: 210000 },
    { month: 'Jul', gains: 280000 },
    { month: 'Aug', gains: 320000 },
    { month: 'Sep', gains: 290000 },
    { month: 'Oct', gains: 340000 },
    { month: 'Nov', gains: 310000 },
    { month: 'Dec', gains: 360000 },
    { month: 'Jan', gains: 330000 },
    { month: 'Feb', gains: 380000 }
  ];

  const monthlyData = [
    { day: '1', gains: 12000 },
    { day: '5', gains: 18000 },
    { day: '10', gains: 24000 },
    { day: '15', gains: 21000 },
    { day: '20', gains: 28000 },
    { day: '25', gains: 32000 },
    { day: '30', gains: 29000 }
  ];

  const chartData = timeFilter === 'yearly' ? yearlyData : monthlyData;
  
  const sampleData = {
    totalTaxableGains: 224500.32,
    revenueIncome: 148234.21,
    capitalGains: 76216.11,
    totalTransactions: 145,
    highestGainTx: 42341.23,
    highestLossTx: -21232.45,
    riskScore: 72,
  };

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
            <div className="text-2xl font-bold mb-2">R{sampleData.totalTaxableGains.toLocaleString()}</div>
            <div className="flex items-center text-green-400">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm ml-1">+24.3% from last tax year</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-red-800/50">
            <div className="text-gray-300 text-sm">Revenue Income</div>
            <div className="text-2xl font-bold mb-2">R{sampleData.revenueIncome.toLocaleString()}</div>
            <div className="flex items-center text-red-400">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm ml-1">Taxed at marginal rate</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-red-800/50">
            <div className="text-gray-300 text-sm">Capital Gains</div>
            <div className="text-2xl font-bold mb-2">R{sampleData.capitalGains.toLocaleString()}</div>
            <div className="flex items-center text-gray-300">
              <Filter className="w-4 h-4" />
              <span className="text-sm ml-1">40% inclusion rate</span>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-red-800/50">
            <div className="text-gray-300 text-sm">SARS Compliance Score</div>
            <div className="text-2xl font-bold mb-2">{sampleData.riskScore}/100</div>
            <div className="flex items-center text-yellow-400">
              <PieChart className="w-4 h-4" />
              <span className="text-sm ml-1">Moderate Risk</span>
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

            {/* Chart */}
            <div className="h-96 mb-6">
              <ResponsiveContainer>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis 
                    dataKey={timeFilter === 'yearly' ? 'month' : 'day'} 
                    stroke="#9CA3AF"
                  />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    formatter={(value) => `R${value.toLocaleString()}`}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;