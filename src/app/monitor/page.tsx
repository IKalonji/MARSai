'use client'

import React, { useState } from 'react';
import { Wallet, ArrowRight, Clock, AlertCircle, Rocket } from 'lucide-react';
import { DiscoverWalletProviders } from "../components/DiscoverWalletProvider";
import Link from 'next/link';
import { useSyncProviders } from "../hooks/useSyncProviders"

const Monitor = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('year');
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>()
  const [userAccount, setUserAccount] = useState<string>("")
  const providers = useSyncProviders()


 // const handleConnect = () => { setIsConnecting(true); setTimeout(() => setIsConnecting(false), 2000);};

  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      const accounts = await providerWithInfo.provider.request({
        method: "eth_requestAccounts"
      })
      if (!accounts || !Array.isArray(accounts)) {
        throw new Error('No accounts returned')
      }

      setSelectedWallet(providerWithInfo)
      setUserAccount(accounts[0])
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-950 text-white p-8 pb-20 sm:p-20">
      <header className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-2">
          <Rocket className="w-8 h-8 text-red-500" />
          <span className="text-2xl font-bold">MARS.ai</span>
        </div>
        <nav className="hidden sm:flex gap-8">
          <Link href="/" className="hover:text-red-300 transition-colors">Home</Link>
          <Link href="/about" className="hover:text-red-300 transition-colors">About</Link>
          <Link href="/features" className="hover:text-red-300 transition-colors">Features</Link>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg overflow-hidden border border-red-800/50">
          <div className="bg-gradient-to-r from-red-800 to-red-900 p-6">
            <div className="text-2xl font-bold flex items-center gap-2">
              <Wallet className="w-6 h-6" />
              Crypto Tax Analysis
            </div>
            <p className="text-red-200">Get instant tax insights for your crypto portfolio</p>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Wallet Address</label>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={walletAddress}
                  readOnly
                  placeholder="Connect your wallet to begin analysis"
                  className="flex-1 p-3 rounded-lg bg-white/5 border border-red-800/50 text-white placeholder:text-gray-400"
                />
                  <div>
        {
          providers.length > 0 ? providers?.map((provider: EIP6963ProviderDetail) => (
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
             key={provider.info.uuid} onClick={() => handleConnect(provider)} >
              <img src={provider.info.icon} alt={provider.info.name} />
              <p>  Connect Wallet</p>
             
            </button>
          )) :
            <div>
              No Announced Wallet Providers
            </div>
        }
      </div>
            
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-white/5 rounded-lg border border-red-800/50">
                <h3 className="font-medium mb-2">Time Period</h3>
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="w-full p-2 rounded bg-white/5 border border-red-800/50 text-white"
                >
                  <option value="year">Past Year</option>
                  <option value="quarter">Past Quarter</option>
                  <option value="month">Past Month</option>
                  <option value="custom">Custom Range</option>
                </select>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-red-800/50">
                <h3 className="font-medium mb-2">Analysis Type</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Capital Gains
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Mining Income
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    Staking Rewards
                  </label>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-lg border border-red-800/50">
                <h3 className="font-medium mb-2">Tax Classification</h3>
                <select className="w-full p-2 rounded bg-white/5 border border-red-800/50 text-white mb-2">
                  <option value="revenue">Revenue (Trading Income)</option>
                  <option value="capital">Capital Gains</option>
                  <option value="mixed">Mixed Purpose</option>
                </select>

                <h3 className="font-medium mb-2 mt-4">Valuation Method</h3>
                <select className="w-full p-2 rounded bg-white/5 border border-red-800/50 text-white">
                  <option value="wac">Weighted Average Cost (SARS Preferred)</option>
                  <option value="fifo">First-In-First-Out</option>
                  <option value="specific">Specific Identification</option>
                </select>

                <div className="mt-4 bg-red-900/50 p-3 rounded-lg">
                  <p className="text-sm text-red-200">
                    SARS considers crypto assets as financial instruments for tax purposes. Income could be taxed at up to 45% for revenue, or effective 18% for capital gains.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-2 text-sm bg-white/5 p-4 rounded-lg border border-red-800/50">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-300">
                This tool provides estimated calculations for informational purposes only. 
                Please consult with a qualified tax professional for official tax advice. 
                Your data is processed locally and never stored on our servers.
              </p>
              <button
                onClick={() => console.log('Analyzing wallet...')}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                  <Link href="/results" className="hover:text-red-300 transition-colors">Analyse Wallet</Link>
            
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;