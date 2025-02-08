'use client'

import React from 'react';
import { 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  ArrowRight,
  DollarSign,
  Clock,
  Rocket
} from 'lucide-react';
import Link from 'next/link';

const SuggestionsPage = () => {
  const suggestions = [
    {
      id: 1,
      type: 'optimization',
      title: 'Tax Loss Harvesting Opportunity',
      description: 'Consider selling Asset X at a loss to offset R15,000 in gains from Asset Y. This could reduce your tax liability by approximately R6,750.',
      priority: 'high',
      potentialSavings: 6750,
      deadline: '2024-02-28',
      icon: TrendingUp,
      status: 'actionable'
    },
    {
      id: 2,
      type: 'compliance', 
      title: 'Missing Cost Basis Documentation',
      description: 'Several transactions from March 2023 lack proper cost basis documentation. Gather exchange statements to support these transactions for SARS compliance.',
      priority: 'urgent',
      icon: AlertTriangle,
      status: 'attention_required'
    },
    {
      id: 3,
      type: 'strategy',
      title: 'Staking Rewards Optimization',
      description: 'Your staking rewards should be declared monthly to optimize tax liability. Set up a monthly reporting schedule for better tax efficiency.',
      priority: 'medium',
      potentialSavings: 2300,
      icon: Lightbulb,
      status: 'recommendation'
    }
  ];

  const priorityColors = {
    urgent: 'bg-red-900/30 border-red-400/50 text-red-200',
    high: 'bg-orange-900/30 border-orange-400/50 text-orange-200',
    medium: 'bg-red-900/30 border-red-400/50 text-red-200'
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-950 text-white p-8 pb-20 sm:p-20">
      <header className="flex items-center justify-between mb-16">
        <div className="flex items-center gap-2">
          <Rocket className="w-8 h-8 text-red-500" />
          <span className="text-2xl font-bold">MARS.ai</span>
        </div>
        <nav className="hidden sm:flex gap-8">
          <Link href="/" className="hover:text-red-300 transition-colors">Home</Link>
          <Link href="/monitor" className="hover:text-red-300 transition-colors">Monitor</Link>
          <Link href="/results" className="hover:text-red-300 transition-colors">Results</Link>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-red-800/50 overflow-hidden">
          <div className="bg-gradient-to-r from-red-800 to-red-900 p-6">
            <div className="flex items-center gap-2 text-xl font-bold">
              <Lightbulb className="w-6 h-6" />
              AI Tax Insights & Recommendations
            </div>
            <p className="text-red-200">Personalized suggestions based on your wallet analysis</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Summary Section */}
            <div className="bg-red-900/30 p-4 rounded-lg border border-red-400/50">
              <h2 className="text-lg font-semibold text-red-200 mb-2">Analysis Summary</h2>
              <p className="text-gray-300">
                Based on your transaction history, we've identified {suggestions.length} actionable 
                opportunities for tax optimization and compliance improvement.
              </p>
            </div>

            {/* Suggestions List */}
            <div className="space-y-4">
              {suggestions.map((suggestion) => {
                const IconComponent = suggestion.icon;
                return (
                  <div
                    key={suggestion.id}
                    className={`border rounded-lg p-4 ${priorityColors[suggestion.priority as keyof typeof priorityColors]}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="p-2 rounded-full bg-white/10">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{suggestion.title}</h3>
                          <span className="text-xs px-2 py-1 rounded-full bg-white/10">
                            {suggestion.priority.toUpperCase()}
                          </span>
                        </div>
                        
                        <p className="mb-3 text-gray-300">{suggestion.description}</p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                          {suggestion.potentialSavings && (
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4" />
                              Potential Savings: R{suggestion.potentialSavings.toLocaleString()}
                            </div>
                          )}
                          {suggestion.deadline && (
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              Deadline: {suggestion.deadline}
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            Updated: Just now
                          </div>
                        </div>
                      </div>

                      <button className="flex items-center gap-1 px-3 py-1.5 bg-red-500 hover:bg-red-600 rounded-lg text-sm transition-colors">
                        Take Action
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Learning Resources */}
            <div className="border-t border-red-800/50 pt-6">
              <h2 className="text-lg font-semibold mb-3">Related Resources</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a href="#" className="block p-4 bg-white/10 border border-red-800/50 rounded-lg hover:bg-white/20 transition-colors">
                  <h3 className="text-red-400 font-semibold mb-1">Understanding SARS Crypto Regulations</h3>
                  <p className="text-gray-300">Learn about the latest cryptocurrency tax requirements in South Africa.</p>
                </a>
                <a href="#" className="block p-4 bg-white/10 border border-red-800/50 rounded-lg hover:bg-white/20 transition-colors">
                  <h3 className="text-red-400 font-semibold mb-1">Tax Loss Harvesting Guide</h3>
                  <p className="text-gray-300">Detailed steps on implementing tax-loss harvesting strategies.</p>
                </a>
              </div>
            </div>
            
            <div className="bg-red-900/30 p-4 rounded-lg border border-red-400/50 flex items-start gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-gray-300">
                These suggestions are generated based on your transaction history and current SARS guidelines. 
                Always consult with a qualified tax professional before implementing any tax strategies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuggestionsPage;