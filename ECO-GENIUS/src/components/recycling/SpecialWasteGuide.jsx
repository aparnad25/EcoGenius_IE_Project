import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Smartphone, Battery, ShoppingBag, Shirt, ExternalLink, MapPin } from "lucide-react";
import { motion } from "framer-motion";

const specialWasteCategories = {
  ewaste: {
    title: "Electronic Waste",
    icon: Smartphone,
    color: "bg-purple-100 text-purple-800",
    items: [
      "Mobile phones and tablets",
      "Computers and laptops", 
      "TVs and monitors",
      "Printers and scanners",
      "Gaming consoles",
      "Small electrical appliances"
    ],
    locations: [
      "Council recycling centers",
      "Aldi stores (small e-waste only)",
      "JB Hi-Fi stores",
      "Officeworks stores",
      "Mobile Muster drop-off points"
    ],
    instructions: "Remove all personal data before disposal. Many retailers offer free take-back programs."
  },
  batteries: {
    title: "Batteries", 
    icon: Battery,
    color: "bg-orange-100 text-orange-800",
    items: [
      "AA, AAA, C, D batteries",
      "Button cell batteries",
      "Rechargeable batteries",
      "Mobile phone batteries",
      "Laptop batteries",
      "Car batteries (lead acid)"
    ],
    locations: [
      "Aldi stores",
      "Bunnings Warehouse",
      "Woolworths and Coles",
      "Battery World stores",
      "Council facilities"
    ],
    instructions: "Never put batteries in household bins. Tape terminals of lithium batteries before disposal."
  },
  softPlastics: {
    title: "Soft Plastics",
    icon: ShoppingBag, 
    color: "bg-blue-100 text-blue-800",
    items: [
      "Plastic shopping bags",
      "Bread bags",
      "Frozen food bags",
      "Bubble wrap",
      "Plastic wrap and film",
      "Squeezable sauce bottles"
    ],
    locations: [
      "Coles stores (REDcycle bins)", 
      "Woolworths stores (REDcycle bins)",
      "Some IGA stores",
      "Bunnings Warehouse"
    ],
    instructions: "Clean and dry all soft plastics. Check that items scrunch in your hand - if they spring back, they're soft plastic."
  },
  textiles: {
    title: "Textiles & Clothing",
    icon: Shirt,
    color: "bg-green-100 text-green-800", 
    items: [
      "Clothing in any condition",
      "Shoes and accessories",
      "Bed linens and towels",
      "Curtains and fabric",
      "Bags and belts",
      "Stuffed animals"
    ],
    locations: [
      "Salvation Army stores",
      "Vinnies (St Vincent de Paul)",
      "Red Cross op shops", 
      "H&M stores (any brand clothing)",
      "Council textile bins"
    ],
    instructions: "Items don't need to be in perfect condition. Many charities can still use damaged items for recycling."
  }
};

export default function SpecialWasteGuide({ councilData }) {
  const specialInfo = councilData?.special_waste_info || {};

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Special Waste Disposal
        </h2>
        <p className="text-lg text-slate-600">
          Properly dispose of items that need special handling
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs defaultValue="ewaste" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-100">
            {Object.entries(specialWasteCategories).map(([key, category]) => {
              const Icon = category.icon;
              return (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="flex items-center gap-2 data-[state=active]:bg-white"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{category.title.split(' ')[0]}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(specialWasteCategories).map(([key, category]) => {
            const Icon = category.icon;
            return (
              <TabsContent key={key} value={key} className="mt-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="shadow-lg bg-white/90 backdrop-blur-sm">
                    <CardHeader className="bg-gradient-to-r from-slate-50 to-gray-50">
                      <CardTitle className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${category.color}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900">
                            {category.title}
                          </h3>
                          <Badge className={category.color}>
                            Requires Special Handling
                          </Badge>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid lg:grid-cols-2 gap-8">
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <Icon className="w-4 h-4" />
                            What Can Be Recycled
                          </h4>
                          <div className="space-y-2">
                            {category.items.map((item, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="flex items-center gap-2"
                              >
                                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                <span className="text-slate-700">{item}</span>
                              </motion.div>
                            ))}
                          </div>

                          <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                            <h5 className="font-semibold text-amber-800 mb-2">Important Instructions</h5>
                            <p className="text-sm text-amber-700">{category.instructions}</p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            Drop-off Locations
                          </h4>
                          <div className="space-y-3">
                            {category.locations.map((location, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="p-3 bg-slate-50 rounded-lg flex items-center gap-3"
                              >
                                <MapPin className="w-4 h-4 text-slate-500" />
                                <span className="text-slate-700">{location}</span>
                              </motion.div>
                            ))}
                          </div>

                          {specialInfo[key] && (
                            <div className="mt-6 p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                              <h5 className="font-semibold text-emerald-800 mb-2">Council-Specific Info</h5>
                              <p className="text-sm text-emerald-700">{specialInfo[key]}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            );
          })}
        </Tabs>
      </motion.div>
    </div>
  );
}