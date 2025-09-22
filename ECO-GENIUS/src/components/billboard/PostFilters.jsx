import { useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function PostFilters({ onChange }) {
  const categories = ["Appliance", "Furniture", "Others"]
  const [selected, setSelected] = useState(categories)

  const toggleCategory = (cat) => {
    const newSelected = selected.includes(cat)
      ? selected.filter((c) => c !== cat)
      : [...selected, cat]
    setSelected(newSelected)
    onChange({ categories: newSelected, locations: [] })
  }

  // Define styles for different categories
  const categoryStyles = {
    Appliance:
      "bg-yellow-100 text-green-700 hover:bg-yellow-200 border border-green-300",
    Furniture:
      "bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-300",
    Others:
      "bg-purple-100 text-purple-700 hover:bg-purple-200 border border-purple-300",
  }

  return (
    <div className="flex gap-3">
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
  )
}
