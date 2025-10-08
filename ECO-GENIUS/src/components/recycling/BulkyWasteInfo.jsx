import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Calendar, DollarSign, Package, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const defaultBulkyWasteInfo = {
  booking_required: true,
  cost: "Free for 2 items per year, $25 for additional collections",
  item_limits: "Maximum 2 cubic meters per collection",
  instructions: "Items must be placed on nature strip by 6am on collection day"
};

const bookingUrls = {
  melbourne: "https://www.melbourne.vic.gov.au/hard-waste",
  monash: "https://www.monash.vic.gov.au/Waste-Sustainability/Hard-waste-collection",
  "port-phillip": "https://www.portphillip.vic.gov.au/council-services/waste-recycling-and-rubbish/hard-waste-collection",
  yarra: "https://www.yarracity.vic.gov.au/services/waste-and-recycling/hard-waste-collection"
};

export default function BulkyWasteInfo({ councilData, councilId }) {
  const bulkyInfo = councilData?.bulky_waste_info || defaultBulkyWasteInfo;
  const bookingUrl = bookingUrls[councilId] || bookingUrls.melbourne;

  const acceptedItems = [
    "Furniture (couches, chairs, tables)",
    "Appliances (fridges, washing machines)", 
    "Mattresses and bed frames",
    "Garden tools and equipment",
    "Bicycles",
    "Carpet and rugs",
    "Timber and building materials"
  ];

  const rejectedItems = [
    "Hazardous materials",
    "Asbestos products", 
    "Paint and chemicals",
    "Car parts and batteries",
    "Renovation rubble",
    "Business/commercial waste",
    "Electronic waste (take to e-waste centers)"
  ];

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Bulky Waste Collection
        </h2>
        <p className="text-lg text-slate-600">
          Schedule pickup for large household items
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-lg bg-white/90 backdrop-blur-sm h-full">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center gap-2 text-blue-800">
                <Package className="w-5 h-5" />
                Collection Details
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Booking Required</h4>
                    <p className="text-slate-600 text-sm">
                      {bulkyInfo.booking_required 
                        ? "Yes - Book online or by phone"
                        : "No booking required"
                      }
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Cost</h4>
                    <p className="text-slate-600 text-sm">{bulkyInfo.cost}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-orange-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Item Limits</h4>
                    <p className="text-slate-600 text-sm">{bulkyInfo.item_limits}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-slate-900">Instructions</h4>
                    <p className="text-slate-600 text-sm">{bulkyInfo.instructions}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  asChild
                >
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
                    <Calendar className="w-4 h-4 mr-2" />
                    Book Collection Online
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="text-green-800">✅ Accepted Items</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {acceptedItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50">
              <CardTitle className="text-red-800">❌ Not Accepted</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {rejectedItems.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-2 h-2 bg-red-500 rounded-full" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}