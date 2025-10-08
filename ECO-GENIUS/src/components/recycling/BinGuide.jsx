import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Standard 3-bin system for all Melbourne councils
const standardBins = {
  red: {
    name: "Red Bin",
    type: "General Waste",
    color: "#DC2626",
    bgColor: "bg-red-600",
    image: "🗑️",
    accepted: [
      "Food scraps and leftovers",
      "Dirty paper and cardboard", 
      "Cigarette butts",
      "Cat litter and pet waste",
      "Broken ceramics and dishes",
      "Disposable nappies",
      "Tissues and paper towels",
      "Vacuum cleaner dust"
    ],
    rejected: [
      "Recyclable materials",
      "Garden waste and organics",
      "Electronic waste",
      "Batteries",
      "Paint and chemicals",
      "Large items"
    ]
  },
  yellow: {
    name: "Yellow Bin",
    type: "Mixed Recycling",
    color: "#EAB308",
    bgColor: "bg-yellow-500",
    image: "♻️",
    accepted: [
      "Paper and cardboard",
      "Plastic bottles and containers",
      "Glass bottles and jars",
      "Steel and aluminum cans",
      "Milk and juice cartons",
      "Newspapers and magazines",
      "Clean packaging materials"
    ],
    rejected: [
      "Soft plastics and bags",
      "Polystyrene foam",
      "Broken glass",
      "Electronic waste",
      "Batteries",
      "Food contaminated items",
      "Nappies or tissues"
    ]
  },
  green: {
    name: "Green Bin",
    type: "Garden & Food Organics",
    color: "#16A085",
    bgColor: "bg-green-600",
    image: "🌿",
    accepted: [
      "Grass clippings and leaves",
      "Small branches and prunings",
      "Flowers and plants",
      "Fruit and vegetable scraps",
      "Coffee grounds and tea bags",
      "Eggshells",
      "Pizza boxes (clean)",
      "Paper towels (food soiled)"
    ],
    rejected: [
      "Large branches (over 10cm)",
      "Treated timber",
      "Weeds with seeds",
      "Pet waste",
      "Plastic pots and bags",
      "General waste",
      "Diseased plants"
    ]
  }
};

export default function BinGuide({ councilData }) {

  console.log("🗑️ BinGuide rendered");
    
  const [selectedBin, setSelectedBin] = useState('red');

  // Always use standard bins - ensures consistency across all councils
  const binsToDisplay = ['red', 'yellow', 'green'];

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Bin Color Guide
        </h2>
        <p className="text-lg text-slate-600">
          Melbourne's standard 3-bin system - know what goes where
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {binsToDisplay.map((binColor, index) => {
            const binInfo = standardBins[binColor];
            return (
              <motion.div
                key={binColor}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    selectedBin === binColor 
                      ? 'border-2 shadow-lg' 
                      : 'border hover:border-slate-300'
                  }`}
                  style={{ 
                    borderColor: selectedBin === binColor ? binInfo.color : '#E2E8F0'
                  }}
                  onClick={() => setSelectedBin(binColor)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div 
                        className={`w-16 h-20 mx-auto rounded-lg ${binInfo.bgColor} flex items-center justify-center text-3xl text-white shadow-md`}
                        style={{
                          background: `linear-gradient(135deg, ${binInfo.color}dd, ${binInfo.color})`
                        }}
                      >
                        🗑️
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-1">
                      {binInfo.name}
                    </h3>
                    <p className="text-sm text-slate-600">{binInfo.type}</p>
                    {selectedBin === binColor && (
                      <Badge className="mt-2" style={{ backgroundColor: binInfo.color, color: 'white' }}>
                        Selected
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedBin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-lg bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardHeader 
              className="text-center relative"
              style={{ 
                background: `linear-gradient(135deg, ${standardBins[selectedBin]?.color}15, ${standardBins[selectedBin]?.color}08)`
              }}
            >
              <div className="flex items-center justify-center gap-4 mb-4">
                <div 
                  className={`w-20 h-24 rounded-lg ${standardBins[selectedBin]?.bgColor} flex items-center justify-center text-4xl text-white shadow-lg`}
                  style={{
                    background: `linear-gradient(135deg, ${standardBins[selectedBin]?.color}dd, ${standardBins[selectedBin]?.color})`
                  }}
                >
                  🗑️
                </div>
                <div className="text-left">
                  <CardTitle className="text-3xl font-bold text-slate-900">
                    {standardBins[selectedBin]?.name}
                  </CardTitle>
                  <p className="text-lg text-slate-600">
                    {standardBins[selectedBin]?.type}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                    <h4 className="font-bold text-xl text-green-700">What Goes In</h4>
                  </div>
                  <div className="space-y-3">
                    {standardBins[selectedBin]?.accepted.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-green-50 transition-colors"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 font-medium">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <XCircle className="w-6 h-6 text-red-600" />
                    <h4 className="font-bold text-xl text-red-700">Keep Out</h4>
                  </div>
                  <div className="space-y-3">
                    {standardBins[selectedBin]?.rejected.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-3 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-700 font-medium">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800 font-medium text-center">
                  💡 <strong>Remember:</strong> When in doubt, put it in the Red Bin (general waste) rather than contaminating recycling
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}