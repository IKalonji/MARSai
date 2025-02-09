import React from 'react';
import { Rocket, Building2, Scale, Coins } from 'lucide-react';
import Link from 'next/link';

export default function About() {
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
        <main className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              Pioneering Crypto Tax Analysis
              <span className="block text-red-400">for South Africa</span>
            </h1>
            <p className="text-lg text-gray-300">
              MARS.ai combines advanced artificial intelligence with deep understanding of South African tax laws to simplify your cryptocurrency tax compliance.
            </p>
          </div>

          <div className="grid gap-12 mt-16">
            <section className="bg-white/10 backdrop-blur-lg rounded-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <Building2 className="w-8 h-8 text-red-400" />
                <h2 className="text-2xl font-semibold">Our Mission</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                We aim to demystify cryptocurrency taxation in South Africa, making it accessible and manageable for both individual investors and businesses. Our AI-powered platform provides accurate, SARS-compliant tax analysis and recommendations.
              </p>
            </section>

            <section className="bg-white/10 backdrop-blur-lg rounded-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <Scale className="w-8 h-8 text-red-400" />
                <h2 className="text-2xl font-semibold">South African Tax Compliance</h2>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Our platform is specifically designed around South African tax regulations, ensuring all analyses and recommendations align with SARS requirements. We stay updated with the latest cryptocurrency tax guidelines and regulations to provide you with accurate, compliant tax solutions.
              </p>
            </section>

            <section className="bg-white/10 backdrop-blur-lg rounded-lg p-8">
              <div className="flex items-center gap-4 mb-6">
                <Coins className="w-8 h-8 text-red-400" />
                <h2 className="text-2xl font-semibold">Why Choose MARS.ai?</h2>
              </div>
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-red-400" />
                  <p>AI-powered analysis of your cryptocurrency transactions and tax implications</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-red-400" />
                  <p>Specialized focus on South African tax laws and SARS requirements</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-red-400" />
                  <p>Real-time tax optimization suggestions and portfolio analysis</p>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 mt-2 rounded-full bg-red-400" />
                  <p>Secure, private, and compliant handling of your financial data</p>
                </li>
              </ul>
            </section>
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
  );
}