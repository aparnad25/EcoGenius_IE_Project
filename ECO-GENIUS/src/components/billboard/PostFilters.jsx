import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Select from "react-select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PostFilters({ onChange = () => {} }) {
  const categories = ["Appliance", "Furniture", "Others"];
  const [selected, setSelected] = useState(categories);
  const [searchText, setSearchText] = useState("");
  const [suburbs, setSuburbs] = useState([]);
  const [selectedSuburb, setSelectedSuburb] = useState(null);

  //  1. load suburb CSV
  useEffect(() => {
    Papa.parse("/Mel_Urban_Suburb.csv", {
      download: true,
      header: true,
      complete: (results) => {
        console.log("Sample row:", results.data[0]);

        // remove duplicates & order suburb
        const suburbNames = Array.from(
          new Set(results.data.map((row) => row.suburb).filter(Boolean))
        ).sort();
        setSuburbs(suburbNames.map((name) => ({ value: name, label: name })));
      },
    });
  }, []);

  // ✅ 2. notify parent component
  useEffect(() => {
    onChange({
      categories: selected,
      suburb: selectedSuburb ? selectedSuburb.value : "",
      search: searchText,
    });
  }, [selected, selectedSuburb, searchText]);

  // ✅ 3. toggle category
  const toggleCategory = (cat) => {
    const newSelected = selected.includes(cat)
      ? selected.filter((c) => c !== cat)
      : [...selected, cat];
    setSelected(newSelected);
  };

  // ✅ 4. define styles
  const categoryStyles = {
    Appliance:
      "bg-yellow-100 text-green-700 hover:bg-yellow-200 border border-green-300",
    Furniture:
      "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300",
    Others:
      "bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-300",
  };

  return (
    <div className="flex flex-col md:flex-row flex-wrap gap-4 items-center justify-center">
      {/* 🔍 Search box */}
      <input
        type="text"
        placeholder="Search post name..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 w-56"
      />

      {/* 🏙️ Suburb searchable select */}
      <div className="w-64">
        <Select
          options={suburbs}
          value={selectedSuburb}
          onChange={setSelectedSuburb}
          placeholder="Select or search suburb..."
          isSearchable
          isClearable
        />
      </div>

      {/* 🗂️ Category filter buttons */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <TooltipProvider key={cat}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => toggleCategory(cat)}
                  className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                    selected.includes(cat)
                      ? categoryStyles[cat]
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 border"
                  }`}
                >
                  {cat}
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>Click to show/hide {cat} posts</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
}
