import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import CouncilSelector from "../components/council/CouncilSelector";
import BinGuide from "../components/recycling/BinGuide";
import BulkyWasteInfo from "../components/recycling/BulkyWasteInfo";
import SpecialWasteGuide from "../components/recycling/SpecialWasteGuide";
import ContactInfo from "../components/recycling/ContactInfo";
import RecyclingMap from "../components/recycling/RecyclingMap";

export default function Council() {
  const [selectedCouncil, setSelectedCouncil] = useState(null);
  const [councilData, setCouncilData] = useState(null);
  const [loading, setLoading] = useState(false);

  console.log("🏠 Home rendered");

  const loadCouncilData = async (councilId) => {
    setLoading(true);
    try {
      // mock data — 占位用，后面可替换成真实 CSV 数据接口
      const dummyData = {
        code: councilId,
        name:
          councilId === "monash"
            ? "City of Monash"
            : councilId === "port-phillip"
            ? "City of Port Phillip"
            : councilId === "yarra"
            ? "City of Yarra"
            : "City of Melbourne",
        description: "Temporary council info loaded from mock data.",
      };

      setCouncilData(dummyData);
    } catch (error) {
      console.error("Error loading council data:", error);
    }
    setLoading(false);
  };

  /* if we have a real CSV data source, use this function instead
  const loadCouncilData = async (councilId) => {
    setLoading(true);
    try {
      const res = await fetch("/public/councils.csv");
      const text = await res.text();
      const rows = text.split("\n").map((r) => r.split(","));
      const header = rows[0];
      const data = rows
        .slice(1)
        .map((r) => Object.fromEntries(r.map((v, i) => [header[i], v])));

      const found = data.find((d) => d.code === councilId);
      if (found) {
        setCouncilData(found);
      } else {
        console.warn("No council found for", councilId);
      }
    } catch (error) {
      console.error("Error loading council data:", error);
    }
    setLoading(false);
  };
  */

  useEffect(() => {
    if (selectedCouncil) {
      loadCouncilData(selectedCouncil);
    }
  }, [selectedCouncil]);

  const handleCouncilSelect = (councilId) => {
    setSelectedCouncil(councilId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!selectedCouncil) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 p-6 flex items-center">
        <div className="max-w-6xl mx-auto w-full">
          <CouncilSelector
            onCouncilSelect={handleCouncilSelect}
            selectedCouncil={selectedCouncil}
          />
        </div>
      </div>
    );
  }

  const councilNames = {
    melbourne: "City of Melbourne",
    monash: "City of Monash",
    "port-phillip": "City of Port Phillip",
    yarra: "City of Yarra",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50">
      {/* Header with Council Selection */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {councilNames[selectedCouncil]} Recycling Guide
            </h1>
            <p className="text-slate-600">
              Tailored waste disposal information
            </p>
          </div>
          <button
            onClick={() => setSelectedCouncil(null)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Change Council
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 space-y-16">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Loading council information...</p>
          </div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <BinGuide councilData={councilData} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <BulkyWasteInfo
                councilData={councilData}
                councilId={selectedCouncil}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <SpecialWasteGuide councilData={councilData} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <RecyclingMap councilId={selectedCouncil} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
            >
              <ContactInfo
                councilData={councilData}
                councilId={selectedCouncil}
              />
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
