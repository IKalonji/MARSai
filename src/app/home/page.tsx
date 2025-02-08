import React from 'react';
import Link from 'next/link';
import { Wallet, Calculator, Rocket } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-950 text-white">
      {/* Mars-themed particle effect background */}
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

      <div className="relative grid grid-rows-[auto_1fr_auto] min-h-screen p-8 pb-20 gap-16 sm:p-20">
        {/* Header */}
        <header className="flex items-center justify-between">
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
        <main className="flex flex-col items-center justify-center text-center gap-12">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-6xl font-bold">
              Your Crypto Tax
              <span className="block text-red-400">Companion on Mars</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Navigate South African cryptocurrency tax laws with confidence using our AI-powered analysis and personalized recommendations.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8 w-full max-w-4xl">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-center">
              <Wallet className="w-8 h-8 text-red-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Wallet Analysis</h3>
              <p className="text-sm text-gray-300">Comprehensive analysis of your cryptocurrency transactions</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-center">
              <Calculator className="w-8 h-8 text-red-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Tax Calculations</h3>
              <p className="text-sm text-gray-300">SARS-compliant tax calculations and reporting</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6 text-center">
              <Rocket className="w-8 h-8 text-red-400 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Smart Suggestions</h3>
              <p className="text-sm text-gray-300">AI-powered recommendations for tax optimization</p>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-full font-semibold transition-colors">
            <Link href="/monitor" className="hover:text-red-300 transition-colors">Get Started</Link>
            </button>
            <Link href="/features" className="border border-red-500 hover:bg-red-500/10 px-8 py-3 rounded-full font-semibold transition-colors">
              Learn More
            </Link>
          </div>
        </main>

        {/* Footer */}
        <footer className="text-center text-sm text-gray-400">
          <div className="flex justify-center gap-8 mb-4">
            <a href="#" className="hover:text-red-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-red-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-red-300 transition-colors">Contact</a>
          </div>
          <p>© 2025 MARS.ai - Your Cryptocurrency Tax Assistant</p>
        </footer>
      </div>
    </div>
  );
}