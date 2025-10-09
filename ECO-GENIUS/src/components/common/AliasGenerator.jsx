import React, { useState } from "react";
import { RefreshCw } from "lucide-react";
import Papa from "papaparse";
import { Button } from "../ui/button";

export default function AliasGenerator({ onGenerate }) {
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/public/nickname_components.csv");
      const text = await res.text();
      const parsed = Papa.parse(text, { header: true });
      const rows = parsed.data.filter(
        (r) => r.adjective && r.noun && r.number !== undefined
      );

      if (rows.length === 0) {
        console.warn("Alias CSV is empty or invalid");
        return;
      }

      // pick a random row
      const random = rows[Math.floor(Math.random() * rows.length)];
      // generate alias
      const alias = `${random.adjective}${random.noun}${random.number.padStart?.(2, "0") || random.number}`;
      onGenerate(alias);
    } catch (err) {
      console.error("Error generating alias:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="button"
      disabled={loading}
      onClick={handleGenerate}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-normal
                 text-teal-600 bg-white border-2 border-gray-300 rounded-md
                 hover:bg-gray-50 hover:border-teal-500
                 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-20
                 disabled:opacity-50 disabled:cursor-not-allowed
                 transition-colors duration-150"
    >
      <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
      Generate
    </Button>
  );
}