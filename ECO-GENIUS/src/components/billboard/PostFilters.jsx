import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PostFilters({ onChange = () => {} }) {
  const categories = ["Appliance", "Furniture", "Others"];
  const suburbs = ["Melbourne", "Carlton", "Docklands", "Richmond", "Other"];
  const [selected, setSelected] = useState(categories);
  const [searchText, setSearchText] = useState("");
  const [selectedSuburb, setSelectedSuburb] = useState("");

  const toggleCategory = (cat) => {
    const newSelected = selected.includes(cat)
      ? selected.filter((c) => c !== cat)
      : [...selected, cat];
    setSelected(newSelected);
    onChange({ categories: newSelected, suburb: selectedSuburb, search: searchText });
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    onChange({ categories: selected, suburb: selectedSuburb, search: e.target.value });
  };

  const handleSuburbChange = (e) => {
    setSelectedSuburb(e.target.value);
    onChange({ categories: selected, suburb: e.target.value, search: searchText });
  };

  // Define styles for different categories
  const categoryStyles = {
    Appliance:
      "bg-yellow-100 text-green-700 hover:bg-yellow-200 border border-green-300",
    Furniture:
      "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300",
    Others:
      "bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-300",
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center">
      {/* Search by post name */}
      <input
        type="text"
        placeholder="Search post name..."
        value={searchText}
        onChange={handleSearchChange}
        className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        style={{ minWidth: 180 }}
      />

      {/* Filter by suburb */}
      <select
        value={selectedSuburb}
        onChange={handleSuburbChange}
        className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
        style={{ minWidth: 140 }}
      >
        <option value="">All Suburbs</option>
        {suburbs.map((sub) => (
          <option key={sub} value={sub}>{sub}</option>
        ))}
      </select>

      {/* Category filter buttons */}
      <div className="flex gap-2">
        {categories.map((cat) => (
          <TooltipProvider key={cat}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => toggleCategory(cat)}
                  className={`px-4 py-1 rounded-full text-sm font-medium transition-colors
                    ${
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
