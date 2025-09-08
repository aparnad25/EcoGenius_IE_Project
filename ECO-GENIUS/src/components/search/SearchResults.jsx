
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchX, Info, BrainCircuit } from "lucide-react";

const binInfo = {
  yellow_recycling: { emoji: "🟡", name: "Yellow Recycling", color: "bg-yellow-100 text-yellow-800" },
  green_organics: { emoji: "🟢", name: "Green Organics", color: "bg-green-100 text-green-800" },
  red_landfill: { emoji: "🔴", name: "Red Landfill", color: "bg-red-100 text-red-800" },
  special_collection: { emoji: "⭐", name: "Special Collection", color: "bg-purple-100 text-purple-800" }
};

const categoryEmojis = {
  plastic: "♻️", glass: "🥃", paper: "📄", cardboard: "📦",
  metal: "🔧", organic: "🌱", landfill: "🗑️", "e-waste": "📱"
};

export default function SearchResults({ items, searchTerm, aiError, isAiResult }) {
  if (aiError) {
    return (
      <Card className="shadow-lg border-red-200">
        <CardContent className="p-12 text-center">
          <SearchX className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-red-600">{aiError}</p>
        </CardContent>
      </Card>
    );
  }
  
  if (items.length === 0) {
    return (
      <Card className="shadow-lg">
        <CardContent className="p-12 text-center">
          <SearchX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No results found for "{searchTerm}"
          </h3>
          <p className="text-gray-500 mb-4">
            Our local guide and AI couldn't find a match. Try rephrasing your search or be more specific.
          </p>
          <p className="text-sm text-gray-400">
            Alternatively, try scanning the item with your camera for the best results!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Search Results</span>
          {isAiResult && (
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <BrainCircuit className="w-4 h-4 mr-2" />
              AI Generated Advice
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item, index) => {
            const binData = binInfo[item.bin_type];
            
            return (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{categoryEmojis[item.category]}</span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <Badge variant="outline" className="capitalize text-xs">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${binData.color}`}>
                    <span className="text-lg">{binData.emoji}</span>
                    <span className="font-medium text-sm">{binData.name}</span>
                  </div>
                </div>
                
                {/* Tip */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-2">
                  <div className="flex items-start space-x-2">
                    <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-blue-800">Recycling Tip</p>
                      <p className="text-blue-700 text-sm">{item.tip}</p>
                    </div>
                  </div>
                </div>
                
                {/* Explanation */}
                <p className="text-gray-600 text-sm">{item.explanation}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
