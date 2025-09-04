
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Camera, Info, Star } from "lucide-react";

const binInfo = {
  yellow_recycling: {
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    emoji: "🟡",
    name: "Yellow Recycling Bin",
    description: "For recyclable plastics, glass, metals and paper"
  },
  green_organics: {
    color: "bg-green-100 text-green-800 border-green-200", 
    emoji: "🟢",
    name: "Green Organics Bin",
    description: "For food scraps, garden waste and organic matter"
  },
  red_landfill: {
    color: "bg-red-100 text-red-800 border-red-200",
    emoji: "🔴", 
    name: "Red Landfill Bin",
    description: "For general waste that cannot be recycled"
  },
  special_collection: {
    color: "bg-purple-100 text-purple-800 border-purple-200",
    emoji: "⭐",
    name: "Special Collection",
    description: "Requires drop-off at special collection points"
  }
};

const categoryEmojis = {
  plastic: "♻️",
  glass: "🥃", 
  paper: "📄",
  cardboard: "📦",
  metal: "🔧",
  organic: "🌱",
  landfill: "🗑️",
  "e-waste": "📱",
  clothing: "👕"
};

const getRelatableImpact = (co2Grams) => {
  if (!co2Grams || co2Grams <= 0) return null;

  const equivalents = [
    { 
      name: "LED light bulb",
      value: co2Grams / 9, // 10W bulb, 0.9g CO2/Wh in VIC (example based on typical grid carbon intensity)
      unit: "hours",
      format: (val) => val.toFixed(1)
    },
    {
      name: "laptop",
      value: co2Grams / 72, // 80W laptop, 0.9g CO2/Wh
      unit: "hours of work",
      format: (val) => val.toFixed(1)
    },
    {
      name: "car travel",
      value: co2Grams / 150, // 150g CO2/km (example for a typical petrol car)
      unit: "km",
      format: (val) => val.toFixed(2)
    },
  ];

  // Pick one randomly to show variety
  const chosenEquivalent = equivalents[Math.floor(Math.random() * equivalents.length)];
  const calculatedValue = chosenEquivalent.format(chosenEquivalent.value);

  return `That's like powering a ${chosenEquivalent.name} for ${calculatedValue} ${chosenEquivalent.unit}!`;
};


export default function RecyclingAdvice({ result, previewUrl, onScanAnother }) {
  const primaryBinData = binInfo[result.bin_type];
  const alternativeBinData = (result.alternative_bin_type && 
                             result.alternative_bin_type !== "none" && 
                             result.alternative_bin_type !== result.bin_type) 
                             ? binInfo[result.alternative_bin_type] : null;
  
  const confidenceColor = result.confidence_score >= 80 ? 'text-green-600' : 
                         result.confidence_score >= 60 ? 'text-yellow-600' : 'text-red-600';
  const relatableImpact = getRelatableImpact(result.co2_saved);

  const BinCard = ({ binData, isAlternative }) => (
    <div className={`p-4 rounded-lg border-2 ${binData.color.replace('text-', 'border-')} ${isAlternative ? 'border-dashed' : ''}`}>
      {isAlternative && (
        <div className="flex items-center space-x-1 mb-2">
            <Star className="w-4 h-4 text-purple-600" />
            <h4 className="font-semibold text-purple-800">Alternative Option</h4>
        </div>
      )}
      <div className="flex items-center space-x-3">
        <span className="text-2xl">{binData.emoji}</span>
        <div>
          <h4 className="font-semibold text-lg">{binData.name}</h4>
          <p className="text-sm opacity-75">{binData.description}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Result Summary */}
      <Card className="shadow-xl border-emerald-200">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-emerald-600" />
            <span>Disposal Advice</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Item Image */}
            <div>
              <img 
                src={previewUrl} 
                alt="Scanned item" 
                className="w-full h-48 object-cover rounded-lg shadow-md"
              />
            </div>
            
            {/* Item Details */}
            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {categoryEmojis[result.category] || '❔'} {result.item_name}
                </h3>
                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant="outline" className="capitalize">
                    {result.category}
                  </Badge>
                  <Badge className={confidenceColor}>
                    {result.confidence_score}% confident
                  </Badge>
                </div>
              </div>
              
              {/* Bin Recommendations */}
              <div className="space-y-3">
                <BinCard binData={primaryBinData} isAlternative={false} />
                {alternativeBinData && <BinCard binData={alternativeBinData} isAlternative={true} />}
              </div>
            </div>
          </div>

          {/* Explanation */}
          {result.explanation && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">Why?</h4>
              <p className="text-gray-700">{result.explanation}</p>
            </div>
          )}
          
          {/* Recycling Tip */}
          {result.recycling_tip && (
            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-blue-800 mb-1">Pro Tip</h4>
                  <p className="text-blue-700">{result.recycling_tip}</p>
                </div>
              </div>
            </div>
          )}

          {/* Environmental Impact */}
          {result.co2_saved > 0 && (
            <div className="mt-4 bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Environmental Impact</h4>
              <p className="text-green-700">
                🌱 You'll save approximately <strong>{result.co2_saved}g of CO₂</strong> by choosing the preferred disposal option.
              </p>
              {relatableImpact && (
                  <p className="text-sm text-green-600 italic mt-1">{relatableImpact}</p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-center items-center mt-6">
            <Button 
              variant="outline" 
              onClick={onScanAnother}
            >
              <Camera className="w-4 h-4 mr-2" />
              Scan Another Item
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
