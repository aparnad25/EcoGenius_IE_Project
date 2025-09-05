import React from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Search, Users, Clock, DollarSign, Trash2, UserCheck } from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleNavigateToAILens = () => {
    navigate("/");
  };

  const handleNavigateToSearchGuide = () => {
    navigate("/SearchGuide");
  };

  const handleNavigateToCommunity = () => {
    navigate("/Community");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* Hero Section */}
        <section className="text-center py-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to EcoGenius
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Helping Melbourne residents dispose smarter, save money, and build stronger communities.
          </p>
          <button 
            onClick={handleNavigateToAILens}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Try EcoGenius AI Lens
          </button>
        </section>

        {/* Stats Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Melbourne's Growing Waste Challenge
            </h2>
            <p className="text-lg text-gray-600">
              The problem we are committed to solving.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat 1 */}
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-red-500" />
              </div>
              <div className="text-2xl font-bold text-emerald-600 mb-2">72% rise</div>
              <p className="text-sm text-gray-600">
                in illegal dumping in Melbourne's north (2024).
              </p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <DollarSign className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-2xl font-bold text-emerald-600 mb-2">Up to $800</div>
              <p className="text-sm text-gray-600">
                average cost of private bulky waste removal.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-6 h-6 text-orange-500" />
              </div>
              <div className="text-2xl font-bold text-emerald-600 mb-2">40,000+</div>
              <div className="text-lg font-semibold text-emerald-600 mb-2">tonnes</div>
              <p className="text-sm text-gray-600">
                of reusable goods sent to landfill each year.
              </p>
            </div>

            {/* Stat 4 */}
            <div className="bg-white rounded-xl p-6 shadow-lg text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-2xl font-bold text-emerald-600 mb-2">68% of</div>
              <div className="text-lg font-semibold text-emerald-600 mb-2">newcomers</div>
              <p className="text-sm text-gray-600">
                said they'd use a cost-sharing or donation feature.
              </p>
            </div>
          </div>
        </section>

        {/* How EcoGenius Helps Section */}
        <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How EcoGenius Helps
            </h2>
            <p className="text-lg text-gray-600">
              Our tools are designed for sustainable, practical, everyday choices.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* AI Lens */}
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Camera className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">AI Lens</h3>
              <p className="text-gray-600 mb-6">
                Get instant disposal advice by snapping a photo of any item.
              </p>
              <button 
                onClick={handleNavigateToAILens}
                className="w-full bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Try the AI Lens
              </button>
            </div>

            {/* Search Guide */}
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Search Guide</h3>
              <p className="text-gray-600 mb-6">
                Quickly find the right bin or disposal method for thousands of items.
              </p>
              <button 
                onClick={handleNavigateToSearchGuide}
                className="w-full bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Open the Guide
              </button>
            </div>

            {/* Community Exchange */}
            <div className="bg-gray-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community Exchange</h3>
              <p className="text-gray-600 mb-6">
                Give away unwanted items or share removal costs with your neighbours.
              </p>
              <button 
                onClick={handleNavigateToCommunity}
                className="w-full bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Explore Community
              </button>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              Our Mission
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              EcoGenius is a digital platform designed to address one of Melbourne's growing urban challenges: the affordable and responsible disposal of bulky and unwanted household items. Many newcomers, especially migrants and young renters, face unclear local rules, unexpectedly high removal costs, and the risk of fines. As a result, thousands of reusable items end up in landfill each year.
            </p>
            
            <p className="text-lg">
              Our solution combines AI-powered item recognition with a community-driven exchange hub. Residents can upload or snap photos of items to receive instant disposal guidance, post unwanted goods for free pickup, share disposal costs with neighbours, and access council-specific collection information through an interactive map.
            </p>
            
            <p className="text-lg">
              Developed by Group 12 – ChaiStix (FIT5120), EcoGenius aims to reduce illegal dumping, lower financial stress for newcomers, and build stronger community support networks while promoting sustainable, practical everyday choices.
            </p>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Get Started</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleNavigateToAILens}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
            >
              <Camera className="w-5 h-5" />
              <span>Start Scanning Items</span>
            </button>
            <button 
              onClick={handleNavigateToSearchGuide}
              className="bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-8 py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
            >
              <Search className="w-5 h-5" />
              <span>Browse Guide</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}