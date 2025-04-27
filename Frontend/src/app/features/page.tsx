import React from 'react';
import { Rocket, Check, Download, AlertCircle, Star, Wallet, Calculator, FileSpreadsheet, Building2, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Features() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-950 text-white">
      {/* Background effect */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-red-200"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animation: `float ${Math.random() * 10 + 5}s linear infinite`
            }}
          />
        ))}
      </div>

      <div className="relative min-h-screen p-8 pb-20 gap-16 sm:p-20">
        {/* Header */}
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-2">
            <Rocket className="w-8 h-8 text-red-500" />
            <span className="text-2xl font-bold">MARS.ai</span>
          </div>
          <nav className="hidden sm:flex gap-8">
          <Link href="/home" className="hover:text-red-300 transition-colors">Mars</Link>
            <Link href="/about" className="hover:text-red-300 transition-colors">About</Link>
            <Link href="/features" className="hover:text-red-300 transition-colors">Features</Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Choose Your Journey
              <span className="block text-red-400">on Mars</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Select the plan that best suits your cryptocurrency tax needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            {/* Free Tier */}
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8 border border-red-800/50">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Explorer</h2>
                <span className="text-red-400">Free</span>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-2">
                  <Wallet className="w-5 h-5 text-red-400 mt-1" />
                  <p className="text-gray-300">Basic wallet analysis and transaction tracking</p>
                </div>
                <div className="flex items-start gap-2">
                  <Calculator className="w-5 h-5 text-red-400 mt-1" />
                  <p className="text-gray-300">Standard tax calculations for South African regulations</p>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-1" />
                  <p className="text-gray-300">Basic tax compliance alerts</p>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-red-400 mt-1" />
                  <p className="text-gray-300">View results in web interface</p>
                </div>
              </div>
              <button className="w-full bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition-colors">
              <Link href="/monitor" className="hover:text-red-300 transition-colors">Get Started</Link>
              </button>
            </div>

            {/* Premium Tier */}
            <div className="bg-gradient-to-br from-red-800/50 to-red-900/50 backdrop-blur-lg rounded-lg p-8 border-2 border-red-400/50 relative">
              <div className="absolute -top-4 right-4 bg-red-400 text-red-900 px-4 py-1 rounded-full text-sm font-semibold">
                RECOMMENDED
              </div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold">Martian</h2>
                <span className="text-red-400">$15</span>
              </div>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-2">
                  <Star className="w-5 h-5 text-red-400 mt-1" />
                  <p className="text-gray-300">Advanced AI-powered wallet analysis and insights</p>
                </div>
                <div className="flex items-start gap-2">
                  <Calculator className="w-5 h-5 text-red-400 mt-1" />
                  <p className="text-gray-300">Comprehensive tax calculations with optimization suggestions</p>
                </div>
                <div className="flex items-start gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-red-400 mt-1" />
                  <p className="text-gray-300">Export results to Excel for detailed analysis</p>
                </div>
                <div className="flex items-start gap-2">
                  <Download className="w-5 h-5 text-red-400 mt-1" />
                  <p className="text-gray-300">Download SARS-ready tax reports</p>
                </div>
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-red-400 mt-1" />
                  <p className="text-gray-300">Priority tax compliance alerts and notifications</p>
                </div>
              </div>
              <button className="w-full bg-red-400 hover:bg-red-500 text-red-900 px-6 py-3 rounded-full font-semibold transition-colors">
                Upgrade to Premium (Coming soon!)
              </button>
            </div>
          </div>

          {/* Feature Comparison */}
          <div className="mt-20">
            <h2 className="text-2xl font-semibold text-center mb-8">Detailed Feature Comparison</h2>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-red-800/50">
                    <th className="p-4 text-left">Feature</th>
                    <th className="p-4 text-center">Explorer</th>
                    <th className="p-4 text-center">Martian</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-red-800/50">
                    <td className="p-4">Wallet Analysis</td>
                    <td className="p-4 text-center">Basic</td>
                    <td className="p-4 text-center text-red-400">Advanced</td>
                  </tr>
                  <tr className="border-b border-red-800/50">
                    <td className="p-4">Tax Calculations</td>
                    <td className="p-4 text-center">Standard</td>
                    <td className="p-4 text-center text-red-400">Comprehensive</td>
                  </tr>
                  <tr className="border-b border-red-800/50">
                    <td className="p-4">Export Options</td>
                    <td className="p-4 text-center">Web View Only</td>
                    <td className="p-4 text-center text-red-400">Excel + PDF</td>
                  </tr>
                  <tr>
                    <td className="p-4">Support</td>
                    <td className="p-4 text-center">Community</td>
                    <td className="p-4 text-center text-red-400">Priority</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Enterprise Contact Section */}
          <div className="mt-24 bg-gradient-to-r from-red-800/30 to-red-900/30 backdrop-blur-lg rounded-lg p-8 border border-red-700/50">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-red-400" />
                  <h2 className="text-2xl font-semibold">Enterprise Integrations</h2>
                </div>
                <p className="text-gray-300 mb-6">
                  Custom solutions for accounting firms, financial institutions, and large organizations. 
                  MARS.ai provides enterprise-grade API access, bulk processing, and dedicated support tailored to your business needs.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                    <span>API integrations with existing financial systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                    <span>Dedicated account manager and technical support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-red-400 mt-1 flex-shrink-0" />
                    <span>Custom reporting and compliance solutions</span>
                  </li>
                </ul>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 md:p-8 w-full md:w-auto md:min-w-80">
                <h3 className="text-xl font-semibold mb-4 text-red-300">Contact Us</h3>
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-5 h-5 text-red-400" />
                  <a href="mailto:enterprise@mars.ai" className="text-white hover:text-red-300 transition-colors">
                    liam@marsai.com
                  </a>
                </div>
                <form className="space-y-4">
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full bg-white/5 border border-red-800/30 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400/50"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-white/5 border border-red-800/30 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400/50"
                  />
                  <textarea
                    placeholder="Tell us about your requirements"
                    rows={3}
                    className="w-full bg-white/5 border border-red-800/30 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400/50"
                  ></textarea>
                  <button className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-semibold transition-colors">
                    Request Information
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-400 mt-16">
          <div className="flex justify-center gap-8 mb-4">
            <a href="#" className="hover:text-red-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-red-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-red-300 transition-colors">Contact</a>
          </div>
          <p>© 2025 MARS.ai - Your Cryptocurrency Tax Assistant</p>
        </footer>
      </div>
    </div>
  )
};