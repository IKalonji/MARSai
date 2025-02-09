'use client'

import React, { useState, useEffect } from 'react';
import { Wallet, ArrowRight, Clock, AlertCircle, Rocket } from 'lucide-react';
import Link from 'next/link';
import { useSyncProviders } from "../hooks/useSyncProviders";

// Types
interface ValidationErrors {
  walletAddress?: string;
  timeframe?: string;
  analysisType?: string;
  network?: string;
}

interface AnalysisType {
  capitalGains: boolean;
  miningIncome: boolean;
  stakingRewards: boolean;
}

interface NetworkOption {
  id: string;
  name: string;
  chainId: number;
}

const SUPPORTED_NETWORKS: NetworkOption[] = [
  { id: 'eth', name: 'Ethereum', chainId: 1 },
  { id: 'base', name: 'Base', chainId: 8453 },
  { id: 'arbitrum', name: 'Arbitrum', chainId: 42161 }
];

const Monitor = () => {
  // State management
  const [walletAddress, setWalletAddress] = useState('');
  const [selectedTimeframe, setSelectedTimeframe] = useState('year');
  const [selectedNetwork, setSelectedNetwork] = useState<string>('eth');
  const [currentChainId, setCurrentChainId] = useState<string | null>(null);
  const [selectedWallet, setSelectedWallet] = useState<EIP6963ProviderDetail>();
  const [userAccount, setUserAccount] = useState<string>('');
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const providers = useSyncProviders();

  useEffect(() => {
    if (selectedWallet) {
      // Initial chain detection
      detectCurrentChain(selectedWallet.provider);
      
      // Set up chain change listener
      const handleChainChanged = (chainId: string) => {
        console.log('Chain changed to:', chainId);
        setCurrentChainId(chainId);
        
        // Check if the new chain is supported
        const newChainIdDecimal = parseInt(chainId, 16);
        const network = SUPPORTED_NETWORKS.find(n => n.chainId === newChainIdDecimal);
        
        if (network) {
          setSelectedNetwork(network.id);
        } else {
          setErrors(prev => ({
            ...prev,
            network: 'Unsupported network detected. Please switch to a supported network.'
          }));
        }
      };

      selectedWallet.provider.on("chainChanged", handleChainChanged);

      // Cleanup
      return () => {
        selectedWallet.provider.removeListener("chainChanged", handleChainChanged);
      };
    }
  }, [selectedWallet]);

  const detectCurrentChain = async (provider: any) => {
    try {
      const chainId = await provider.request({ method: "eth_chainId" });
      setCurrentChainId(chainId);
      
      // Update selected network based on detected chain
      const chainIdDecimal = parseInt(chainId, 16);
      const network = SUPPORTED_NETWORKS.find(n => n.chainId === chainIdDecimal);
      
      if (network) {
        setSelectedNetwork(network.id);
      } else {
        setErrors(prev => ({
          ...prev,
          network: 'Unsupported network detected. Please switch to a supported network.'
        }));
      }
    } catch (error) {
      console.error('Error detecting chain:', error);
      setErrors(prev => ({
        ...prev,
        network: 'Failed to detect current network'
      }));
    }
  };



  // Validation functions
  const validateWalletAddress = (address: string): boolean => {
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    return ethAddressRegex.test(address);
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!walletAddress) {
      newErrors.walletAddress = 'Wallet address is required';
    } else if (!validateWalletAddress(walletAddress)) {
      newErrors.walletAddress = 'Invalid wallet address';
    }

    if (!selectedNetwork) {
      newErrors.network = 'Please select a network';
    }

    // Validate that current chain matches selected network
    if (currentChainId) {
      const currentChainIdDecimal = parseInt(currentChainId, 16);
      const selectedChainId = SUPPORTED_NETWORKS.find(n => n.id === selectedNetwork)?.chainId;
      
      if (currentChainIdDecimal !== selectedChainId) {
        newErrors.network = 'Selected network does not match connected network';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const switchNetwork = async (chainId: number) => {
    if (!selectedWallet?.provider) return;
    
    try {
      await (window as any).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      });

      // Network switch successful, update UI
      setCurrentChainId(`0x${chainId.toString(16)}`);
      const network = SUPPORTED_NETWORKS.find(n => n.chainId === chainId);
      if (network) {
        setSelectedNetwork(network.id);
      }

    } catch (error: any) {
      if (error.code === 4902) {
        setErrors(prev => ({
          ...prev,
          network: 'Network not added to wallet. Please add it first.'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          network: 'Failed to switch network'
        }));
      }
      throw error;
    }
  };

  const handleNetworkChange = async (networkId: string) => {
    const network = SUPPORTED_NETWORKS.find(n => n.id === networkId);
    if (!network) return;

    setSelectedNetwork(networkId);
    if (selectedWallet) {
      try {
        await switchNetwork(network.chainId);
      } catch (error) {
        console.error('Failed to switch network:', error);
      }
    }
  };


  const handleConnect = async (providerWithInfo: EIP6963ProviderDetail) => {
    try {
      setErrors({});

      // First detect current chain
      await detectCurrentChain(providerWithInfo.provider);
      
      // First switch to the selected network
      const network = SUPPORTED_NETWORKS.find(n => n.id === selectedNetwork);
      if (!network) {
        throw new Error('Invalid network selected');
      }

      await switchNetwork(network.chainId);

      const accounts = await providerWithInfo.provider.request({
        method: "eth_requestAccounts"
      });
      
      if (!accounts || !Array.isArray(accounts)) {
        throw new Error('No accounts returned');
      }

      const address = accounts[0];
      if (!validateWalletAddress(address)) {
        throw new Error('Invalid wallet address format');
      }

      setSelectedWallet(providerWithInfo);
      setUserAccount(address);
      setWalletAddress(address);
    } catch (error) {
      console.error(error);
      setErrors(prev => ({
        ...prev,
        walletAddress: error instanceof Error ? error.message : 'Failed to connect wallet'
      }));
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      if (!validateForm()) {
        throw new Error('Please fix validation errors before submitting');
      }

      // Prepare the analysis data
      const analysisData = {
        walletAddress,
        network: selectedNetwork,
        chainId: currentChainId,
        timeframe: selectedTimeframe,
        analysisTypes: {
          capitalGains: (document.getElementById('capitalGains') as HTMLInputElement)?.checked,
          miningIncome: (document.getElementById('miningIncome') as HTMLInputElement)?.checked,
          stakingRewards: (document.getElementById('stakingRewards') as HTMLInputElement)?.checked,
        },
        taxClassification: (document.getElementById('taxClassification') as HTMLSelectElement)?.value,
        valuationMethod: (document.getElementById('valuationMethod') as HTMLSelectElement)?.value
      };

      console.log('Submitting analysis:', analysisData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to results
      window.location.href = '/results';
    } catch (error) {
      console.error(error);
      setErrors(prev => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'Failed to submit analysis'
      }));
    } finally {
      setIsSubmitting(false);
    }
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
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  value={walletAddress}
                  readOnly
                  placeholder="Connect your wallet to begin analysis"
                  className={`flex-1 p-3 rounded-lg bg-white/5 border ${errors.walletAddress ? 'border-red-500' : 'border-red-800/50'} text-white placeholder:text-gray-400`}
                />
                <div className="flex gap-2">
                  <select
                    value={selectedNetwork}
                    onChange={(e) => setSelectedNetwork(e.target.value)}
                    className="p-3 rounded-lg bg-white/5 border border-red-800/50 text-white"
                  >
                    {SUPPORTED_NETWORKS.map((network) => (
                      <option key={network.id} value={network.id}>
                        {network.name}
                      </option>
                    ))}
                  </select>
                  
                  <div>
                    {providers.length > 0 ? providers?.map((provider: EIP6963ProviderDetail) => (
                      <button 
                        className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        key={provider.info.uuid} 
                        onClick={() => handleConnect(provider)}
                        disabled={isSubmitting}
                      >
                        <img src={provider.info.icon} alt={provider.info.name} className="w-6 h-6" />
                        <span>Connect</span>
                      </button>
                    )) : (
                      <div className="text-red-500">
                        No Announced Wallet Providers
                      </div>
                    )}
                  </div>
                </div>
              </div>
             {errors.walletAddress && (
                <p className="mt-2 text-red-500 text-sm">{errors.walletAddress}</p>
              )}
              {errors.network && (
                <p className="mt-2 text-red-500 text-sm">{errors.network}</p>
              )}
              {currentChainId && (
                <p className="mt-2 text-gray-400 text-sm">
                  Connected to chain: {parseInt(currentChainId, 16)} 
                  ({SUPPORTED_NETWORKS.find(n => n.chainId === parseInt(currentChainId, 16))?.name || 'Unknown'})
                </p>
              )}
            </div>

            {/* Rest of the form components */}
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
              </div>
            </div>

            <div className="flex items-start gap-2 text-sm bg-white/5 p-4 rounded-lg border border-red-800/50">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-300 flex-1">
                This tool provides estimated calculations for informational purposes only. 
                Please consult with a qualified tax professional for official tax advice. 
                Your data is processed locally and never stored on our servers.
              </p>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !walletAddress}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Analyze Wallet
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;