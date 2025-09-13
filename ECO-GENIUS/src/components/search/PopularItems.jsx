import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

const binInfo = {
  yellow_recycling: { emoji: "🟡", color: "bg-yellow-100 text-yellow-800" },
  green_organics: { emoji: "🟢", color: "bg-green-100 text-green-800" },
  red_landfill: { emoji: "🔴", color: "bg-red-100 text-red-800" },
  special_collection: { emoji: "⭐", color: "bg-purple-100 text-purple-800" }
};

const categoryEmojis = {
  plastic: "♻️", glass: "🥃", paper: "📄", cardboard: "📦",
  metal: "🔧", organic: "🌱", landfill: "🗑️", "e-waste": "📱"
};

export default function PopularItems({ items }) {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          <span>Popular Items People Ask About</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, index) => {
            const binData = binInfo[item.bin_type];
            
            return (
              <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{categoryEmojis[item.category]}</span>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                </div>
                
                <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${binData.color}`}>
                  <span>{binData.emoji}</span>
                  <span className="capitalize">{item.bin_type.replace('_', ' ')}</span>
                </div>
                
                <p className="text-gray-600 text-xs mt-2 line-clamp-2">{item.tip}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}