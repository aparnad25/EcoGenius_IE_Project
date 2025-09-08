import React from 'react';
import { Button } from "@/components/ui/button";

const categoryEmojis = {
  all: "🔍", plastic: "♻️", glass: "🥃", paper: "📄", cardboard: "📦",
  metal: "🔧", organic: "🌱", landfill: "🗑️", "e-waste": "📱"
};

export default function CategoryFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category)}
          className={`${selectedCategory === category 
            ? "bg-emerald-600 hover:bg-emerald-700" 
            : "hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300"
          }`}
        >
          <span className="mr-1">{categoryEmojis[category]}</span>
          {category === "e-waste" ? "E-waste" : category.charAt(0).toUpperCase() + category.slice(1)}
        </Button>
      ))}
    </div>
  );
}