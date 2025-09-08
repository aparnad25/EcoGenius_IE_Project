import React from "react";
import { Users, Plus, Share2, Heart } from "lucide-react";


// Not shown in current version
export default function Community() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <div className="inline-flex items-center px-6 py-3 bg-purple-50 rounded-full text-sm font-semibold text-purple-700 mb-6">
          <Users className="w-4 h-4 mr-2" />
          Community Exchange
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Community Exchange
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Connect with your neighbors to give away unwanted items or share removal costs
        </p>
      </div>

      {/* Coming Soon Notice */}
      <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <Users className="w-12 h-12 text-purple-600" />
        </div>
        
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Coming Soon!
        </h2>
        
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          We're building an amazing community feature where you can share items, split disposal costs, and help your neighbors make sustainable choices.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-purple-50 rounded-xl">
            <Plus className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">List Items</h3>
            <p className="text-sm text-gray-600">Post unwanted items for others to collect</p>
          </div>
          
          <div className="p-6 bg-purple-50 rounded-xl">
            <Share2 className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Share Costs</h3>
            <p className="text-sm text-gray-600">Split removal costs with neighbors</p>
          </div>
          
          <div className="p-6 bg-purple-50 rounded-xl">
            <Heart className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Build Community</h3>
            <p className="text-sm text-gray-600">Connect with eco-minded neighbors</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-6">
          <h4 className="font-semibold text-gray-900 mb-2">Stay Updated</h4>
          <p className="text-gray-600">
            In the meantime, use our AI Lens and Search Guide to find the best disposal options for your items!
          </p>
        </div>
      </div>
    </div>
  );
}