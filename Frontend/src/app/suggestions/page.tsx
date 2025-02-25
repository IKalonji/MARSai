'use client'

import React, { useState } from 'react';
import { 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle, 
  Calendar,
  ArrowRight,
  DollarSign,
  Clock,
  Rocket,
  Send,
  Bot,
  User
} from 'lucide-react';
import Link from 'next/link';

const SuggestionsPage = () => {
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'bot', text: 'Hello! I\'m your MARS.ai tax assistant. How can I help you today?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
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

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      text: inputMessage
    }; 
    
    setChatMessages(prev => [...prev, newUserMessage]);
    setInputMessage('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: chatMessages.length + 2,
        sender: 'bot',
        text: `Thanks for your message. I'll help you with your query about "${inputMessage}". Would you like specific information about tax optimization or compliance requirements?`
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-950 text-white">
      <header className="flex items-center justify-between p-8 sm:px-20 sm:py-8">
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

      <div className="flex flex-col lg:flex-row gap-6 p-8 sm:px-20 pb-20">
        {/* Main Content Area */}
        <div className="flex-1">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-red-800/50 overflow-hidden">
            <div className="bg-gradient-to-r from-red-800 to-red-900 p-6">
              <div className="flex items-center gap-2 text-xl font-bold">
                <Lightbulb className="w-6 h-6" />
                AI Tax Insights &amp; Recommendations
              </div>
              <p className="text-red-200">Personalized suggestions based on your wallet analysis</p>
            </div>

            <div className="p-6 space-y-6">
              {/* Summary Section */}
              <div className="bg-red-900/30 p-4 rounded-lg border border-red-400/50">
                <h2 className="text-lg font-semibold text-red-200 mb-2">Analysis Summary</h2>
                <p className="text-gray-300">
                  Based on your transaction history, we have identified {suggestions.length} actionable 
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
                      className={`border rounded-lg p-4 ${priorityColors[suggestion.priority]}`}
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

        {/* Chat Section */}
        <div className="lg:w-96 flex flex-col h-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg border border-red-800/50 overflow-hidden flex flex-col h-[calc(100vh-10rem)]">
            <div className="bg-gradient-to-r from-red-800 to-red-900 p-4">
              <div className="flex items-center gap-2 font-bold">
                <Bot className="w-5 h-5" />
                Tax Assistant Chat
              </div>
              <p className="text-red-200 text-sm">Get answers to your tax questions</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs rounded-lg px-3 py-2 ${
                      message.sender === 'user' 
                        ? 'bg-red-500 text-white rounded-tr-none' 
                        : 'bg-red-900/50 border border-red-800 text-red-100 rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                      <span className="text-xs font-semibold">
                        {message.sender === 'user' ? 'You' : 'MARS.ai'}
                      </span>
                    </div>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-red-800/50 bg-red-950/50">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your question..."
                  className="flex-1 bg-red-900/30 text-white placeholder-red-300/50 border border-red-800/50 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <div className="text-red-400/70 text-xs mt-2">
                Ask about tax strategies, compliance, or clarification on recommendations
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default SuggestionsPage;
