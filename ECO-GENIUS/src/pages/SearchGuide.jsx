import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search, Book, Loader2 } from "lucide-react";
import { searchRecyclingAdvice } from "../services/aiService";

import SearchResults from "../components/search/SearchResults";
import PopularItems from "../components/search/PopularItems";
import CategoryFilter from "../components/search/CategoryFilter";

const recyclingDatabase = [
  {
    name: "Pizza Box",
    category: "cardboard", 
    bin_type: "yellow_recycling",
    tip: "Remove any food residue and grease. Clean boxes only.",
    explanation: "Pizza boxes can be recycled if they're clean, but greasy parts should go to red bin."
  },
  {
    name: "Coffee Cup",
    category: "landfill",
    bin_type: "red_landfill", 
    tip: "Most takeaway coffee cups have plastic lining and can't be recycled.",
    explanation: "The plastic lining in most coffee cups prevents recycling in Melbourne."
  },
  {
    name: "Aluminum Foil",
    category: "metal",
    bin_type: "yellow_recycling",
    tip: "Scrunch into a ball larger than a golf ball for better sorting.",
    explanation: "Clean aluminum foil can be recycled if scrunched into a large ball."
  },
  {
    name: "Glass Jar",
    category: "glass", 
    bin_type: "yellow_recycling",
    tip: "Remove lids and rinse clean. Labels can stay on.",
    explanation: "Glass jars are infinitely recyclable when clean and lid-free."
  },
  {
    name: "Plastic Water Bottle",
    category: "plastic",
    bin_type: "yellow_recycling", 
    tip: "Empty completely and replace the cap before recycling.",
    explanation: "PET plastic bottles are easily recyclable when empty and capped."
  },
  {
    name: "Banana Peel", 
    category: "organic",
    bin_type: "green_organics",
    tip: "All fruit and vegetable scraps go in the green bin.",
    explanation: "Organic waste composts into valuable soil when processed correctly."
  },
  {
    name: "Styrofoam Container",
    category: "landfill",
    bin_type: "red_landfill",
    tip: "Polystyrene foam cannot be recycled in household bins.",
    explanation: "Styrofoam/polystyrene requires special facilities not available in Melbourne kerbside."
  },
  {
    name: "Old Mobile Phone",
    category: "e-waste",
    bin_type: "special_collection",
    tip: "Take to MobileMuster or council e-waste drop-off points.",
    explanation: "Electronic devices contain valuable materials that require special recycling."
  },
  {
    name: "Cardboard Box",
    category: "cardboard",
    bin_type: "yellow_recycling", 
    tip: "Flatten boxes to save space. Remove tape if possible.",
    explanation: "Clean cardboard is highly recyclable and makes new paper products."
  },
  {
    name: "Milk Carton",
    category: "cardboard",
    bin_type: "yellow_recycling",
    tip: "Rinse clean and you can leave the cap on.",
    explanation: "Milk cartons are made from recyclable cardboard despite plastic lining."
  },
  {
    name: "Used Batteries",
    category: "e-waste",
    bin_type: "special_collection",
    tip: "Never put in household bins. Drop off at supermarkets or council facilities.",
    explanation: "Batteries can cause fires and leak toxic chemicals."
  },
  {
    name: "Light Bulb",
    category: "e-waste",
    bin_type: "special_collection",
    tip: "Fluorescent and LED bulbs are e-waste. Take to special drop-off points.",
    explanation: "These bulbs contain materials that need special handling."
  },
  {
    name: "Plastic Bag",
    category: "landfill",
    bin_type: "red_landfill",
    tip: "Return to major supermarkets for REDcycle, otherwise landfill. NEVER in yellow bin.",
    explanation: "Soft plastics jam recycling machinery."
  }
];

export default function SearchGuide() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAiSearching, setIsAiSearching] = useState(false);
  const [aiSearchResult, setAiSearchResult] = useState(null);
  const [aiSearchError, setAiSearchError] = useState(null);

  const localFilteredItems = recyclingDatabase.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAiSearch = async (term) => {
    if (!term || isAiSearching) return;

    setIsAiSearching(true);
    setAiSearchResult(null);
    setAiSearchError(null);

    try {
      const response = await searchRecyclingAdvice(term);
      setAiSearchResult(response);
    } catch (err) {
      console.error("AI Search Error:", err);
      setAiSearchError("Sorry, the Eco-AI couldn't find information for that item right now.");
    } finally {
      setIsAiSearching(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm && localFilteredItems.length === 0) {
        handleAiSearch(searchTerm);
      } else {
        setAiSearchResult(null);
        setAiSearchError(null);
      }
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const finalItems = aiSearchResult ? [aiSearchResult] : localFilteredItems;

  const categories = [
    "all", "plastic", "glass", "paper", "cardboard", 
    "metal", "organic", "landfill", "e-waste"
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Recycling Search Guide</h1>
        <p className="text-lg text-gray-600">
          Find out exactly where your items belong in Melbourne's bin system
        </p>
      </div>

      <Card className="shadow-xl mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-emerald-600" />
            <span>Search for Items</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search for items like 'pizza box', 'TV', 'batteries'..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-lg py-3"
            />
          </div>

          {/* ✅ 修正：点击按钮时直接填入按钮文字 */}
          <CategoryFilter 
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={(category) => {
              setSelectedCategory(category);
              setSearchTerm(category === "all" ? "" : category);
            }}
          />
        </CardContent>
      </Card>

      {searchTerm ? (
        <>
          {isAiSearching && (
            <Card className="shadow-lg">
              <CardContent className="p-12 text-center">
                <Loader2 className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-spin" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Asking our Eco-AI...
                </h3>
                <p className="text-gray-500">
                  Finding the best recycling advice for "{searchTerm}"
                </p>
              </CardContent>
            </Card>
          )}
          {!isAiSearching && (
            <SearchResults 
              items={finalItems} 
              searchTerm={searchTerm} 
              aiError={aiSearchError}
              isAiResult={!!aiSearchResult}
            />
          )}
        </>
      ) : (
        <div className="space-y-8">
          <PopularItems items={recyclingDatabase.slice(0, 6)} />
          
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Book className="w-5 h-5 text-emerald-600" />
                <span>Melbourne Bin Quick Reference</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-4xl mb-2">🟡</div>
                  <h3 className="font-semibold text-yellow-800 mb-2">Yellow Bin</h3>
                  <p className="text-sm text-yellow-700">
                    Recyclable plastics, glass, metals, paper & cardboard
                  </p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-4xl mb-2">🟢</div>
                  <h3 className="font-semibold text-green-800 mb-2">Green Bin</h3>
                  <p className="text-sm text-green-700">
                    Food scraps, garden waste & organic matter
                  </p>
                </div>
                
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-4xl mb-2">🔴</div>
                  <h3 className="font-semibold text-red-800 mb-2">Red Bin</h3>
                  <p className="text-sm text-red-700">
                    General waste that cannot be recycled or composted
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}