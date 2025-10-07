import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, Search, Users, Clock, DollarSign, Trash2, UserCheck, X, BarChart3 } from "lucide-react";
import personaImg from "../images/persona_img.png";

export default function Dashboard() {
  const [showPersonaDialog, setShowPersonaDialog] = useState(false);
  const navigate = useNavigate();

  const handleNavigateToAILens = () => {
    navigate("/Scanner"); // Assuming AI Lens is at root path
  };

  const handleNavigateToSearchGuide = () => {
    navigate("/SearchGuide");
  };

  const handleNavigateToBillboard = () => {
    navigate("/Billboard");
  };

  const handleNavigateToDataAnalytics = () => {
    navigate("/Visualization");
  };

  const handleNavigateToCouncil = () => {
    navigate("/Council");
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
            Helping residents dispose smarter, save money, and build a sustainable Melbourne.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleNavigateToAILens}
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Try EcoGenius AI Lens
            </button>
            <button 
              onClick={handleNavigateToDataAnalytics}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors flex items-center justify-center space-x-2"
            >
              <BarChart3 className="w-5 h-5" />
              <span>View Data Analytics</span>
            </button>
          </div>
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">Waste Billboard</h3>
              <p className="text-gray-600 mb-6">
                Upload and share reusable kerbside items with neighbours.
              </p>
              <button 
                onClick={handleNavigateToBillboard}
                className="w-full bg-white border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-50 px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Explore Billboard
              </button>
            </div>
          </div>
        </section>

        {/* User Persona Section - Compact Card */}
        <section className="max-w-4xl mx-auto">
          <div 
            className="bg-white rounded-3xl shadow-xl overflow-hidden cursor-pointer hover:shadow-2xl transition-shadow duration-300"
            onClick={() => setShowPersonaDialog(true)}
          >
            <div className="p-8">
              <div className="grid md:grid-cols-4 gap-6 items-center">
                {/* Image */}
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl overflow-hidden">
                    <img 
                      src={personaImg} 
                      alt="Rouxi Mitchell holding recycling box"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Green checkmark overlay */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                </div>

                {/* Content */}
                <div className="md:col-span-3 space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      Meet Rouxi Mitchell
                    </h2>
                  </div>
                  <p className="text-emerald-600 font-medium">
                    The real person behind EcoGenius
                  </p>

                  {/* The $800 Shock Story */}
                  <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-red-500 w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="font-bold text-red-700 mb-1">The $800 shock.</h3>
                        <p className="text-gray-700 text-sm">
                          Like many newcomers to Melbourne, Rouxi faced unexpected disposal costs, confusing council rules, and the fear of fines. Her story is why EcoGenius exists.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Profile Details and Read More */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex space-x-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        28 years old
                      </span>
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                        Marketing Analyst
                      </span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowPersonaDialog(true);
                      }}
                      className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center space-x-1"
                    >
                      <span>Read her story</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtitle */}
          <div className="text-center mt-6">
            <p className="text-gray-500 italic">
              Click above to discover why thousands of Melbourne newcomers need EcoGenius
            </p>
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
              EcoGenius is a smart digital platform tackling Melbourne's bulky waste problem by making disposal affordable, clear, and technology-driven. Newcomers often face confusing rules and high costs, leading to reusable items ending up in landfill.
            </p>
            
            <p className="text-lg">
              Our AI-powered tool helps residents identify disposal options, share costs, post free pickups, and access local council info via an interactive map.
            </p>
            
            <p className="text-lg">
              Developed by Group 12 – ChaiStix (FIT5120), EcoGenius promotes sustainability, reduces illegal dumping, and strengthens community support.
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

      {/* Persona Dialog */}
      {showPersonaDialog && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowPersonaDialog(false)}
        >
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog Header */}
            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Meet Rouxi Mitchell – Our User Persona
              </h2>
              <button
                onClick={() => setShowPersonaDialog(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>

            {/* Dialog Content */}
            <div className="p-6 space-y-8">
              {/* Profile Section */}
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                {/* Image */}
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl overflow-hidden">
                    <img 
                      src={personaImg} 
                      alt="Rouxi Mitchell holding recycling box"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Basic Info */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                      </div>
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
                        Age: 28
                      </span>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                        New to Melbourne
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                      </div>
                      <span className="text-lg font-semibold text-gray-900">Marketing Analyst</span>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      </div>
                      <span className="text-gray-700">Recently moved to Melbourne</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                      </div>
                      <span className="text-gray-700">Wants to save money & be sustainable</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Her Challenges */}
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
                <h3 className="font-bold text-red-800 mb-4 flex items-center text-xl">
                  <div className="w-6 h-6 bg-red-200 rounded-full flex items-center justify-center mr-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                  </div>
                  Her Challenges
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-white border-l-4 border-red-200 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-red-700 mb-2 flex items-center">
                      <DollarSign className="w-4 h-4 mr-2" />
                      The $800 Shock:
                    </h4>
                    <p className="text-gray-700">
                      Picked up free furniture from the kerb, only to discover disposal would cost $800 when she needed to get rid of it.
                    </p>
                  </div>
                  
                  <div className="bg-white border-l-4 border-yellow-200 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-yellow-700 mb-2 flex items-center">
                      <div className="w-4 h-4 bg-yellow-600 rounded mr-2"></div>
                      Fines & Fear:
                    </h4>
                    <p className="text-gray-700">
                      Learned that kerbside dumping leads to fines. Now worried about every disposal decision.
                    </p>
                  </div>
                  
                  <div className="bg-white border-l-4 border-orange-200 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-orange-700 mb-2 flex items-center">
                      <div className="w-4 h-4 bg-orange-600 rounded mr-2"></div>
                      Confusion Overload:
                    </h4>
                    <p className="text-gray-700">
                      Found Melbourne's disposal rules confusing, inconsistent across councils, and overwhelming online.
                    </p>
                  </div>
                </div>
              </div>

              {/* Her Goals */}
              <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
                <h3 className="font-bold text-green-800 mb-4 flex items-center text-xl">
                  <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center mr-2">
                    <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                  </div>
                  Her Goals
                </h3>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white border border-green-200 rounded-lg p-4 text-center">
                    <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-gray-700 font-medium">
                      Save money and time when moving or downsizing
                    </p>
                  </div>
                  <div className="bg-white border border-green-200 rounded-lg p-4 text-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <div className="w-4 h-4 bg-green-600 rounded"></div>
                    </div>
                    <p className="text-gray-700 font-medium">
                      Avoid fines and hassles with bulky waste disposal
                    </p>
                  </div>
                  <div className="bg-white border border-green-200 rounded-lg p-4 text-center">
                    <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-gray-700 font-medium">
                      Build good waste habits with friends and housemates
                    </p>
                  </div>
                </div>
              </div>

              {/* How EcoGenius Helps */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6">
                <h3 className="font-bold text-emerald-800 mb-6 flex items-center text-xl">
                  <div className="w-6 h-6 bg-emerald-200 rounded-full flex items-center justify-center mr-2">
                    <div className="w-3 h-3 bg-emerald-600 rounded-full"></div>
                  </div>
                  How EcoGenius Helps Rouxi
                </h3>
                
                <div className="space-y-6">
                  <div className="bg-white border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Camera className="w-6 h-6 text-emerald-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-emerald-800 mb-1">AI Lens</h4>
                        <p className="text-emerald-700">
                          Snap a photo, get instant disposal advice. No more guessing!
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Search className="w-6 h-6 text-emerald-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-emerald-800 mb-1">Search Guide</h4>
                        <p className="text-emerald-700">
                          Clear, Melbourne-specific recycling rules at her fingertips.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-emerald-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Users className="w-6 h-6 text-emerald-600 mt-1" />
                      <div>
                        <h4 className="font-semibold text-emerald-800 mb-1">Community Exchange</h4>
                        <p className="text-emerald-700">
                          Share disposal costs and give away items to neighbors.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why EcoGenius Exists */}
              <div className="bg-gradient-to-r from-orange-50 to-emerald-50 border border-emerald-100 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center text-xl">
                  <div className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center mr-2">
                    <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                  </div>
                  Why EcoGenius Exists
                </h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  Rouxi's story reflects the struggles of thousands of Melbourne's newcomers. EcoGenius was built to give people like her instant AI-driven disposal advice, affordable cost-sharing options, and community support—so smart, sustainable choices are always within reach.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}