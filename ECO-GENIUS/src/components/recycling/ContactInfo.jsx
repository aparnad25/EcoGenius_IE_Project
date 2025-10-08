import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, ExternalLink, Globe, Clock, MapPin, BookOpen, CalendarDays, Flag, Map } from "lucide-react";
import { motion } from "framer-motion";

const defaultContactInfo = {
  phone: "03 9658 9658",
  email: "waste@melbourne.vic.gov.au",
  hours: "Monday to Friday: 8:30am - 5:00pm"
};

const councilWebsites = {
  melbourne: "https://www.melbourne.vic.gov.au/waste-recycling",
  monash: "https://www.monash.vic.gov.au/Waste-Sustainability",
  "port-phillip": "https://www.portphillip.vic.gov.au/council-services/waste-recycling-and-rubbish",
  yarra: "https://www.yarracity.vic.gov.au/services/waste-and-recycling"
};

export default function ContactInfo({ councilData, councilId }) {
  const contactInfo = {
    phone: councilData?.contact_phone || defaultContactInfo.phone,
    email: councilData?.contact_email || defaultContactInfo.email,
    website: councilWebsites[councilId] || councilWebsites.melbourne,
    hours: defaultContactInfo.hours
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-3">
          Contact & Resources
        </h2>
        <p className="text-lg text-slate-600">
          Get help and access the official council waste homepage
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:max-w-2xl mx-auto gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="shadow-lg bg-white/90 backdrop-blur-sm h-full">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-green-50">
              <CardTitle className="flex items-center gap-2 text-emerald-800">
                <Phone className="w-5 h-5" />
                Council Waste Services
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4 flex flex-col h-full">
              <div className="space-y-4 flex-grow">
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Phone className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Phone</p>
                    <a href={`tel:${contactInfo.phone}`} className="text-blue-600 hover:underline">
                      {contactInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Email</p>
                    <a href={`mailto:${contactInfo.email}`} className="text-emerald-600 hover:underline">
                      {contactInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Office Hours</p>
                    <p className="text-slate-700">{contactInfo.hours}</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Button 
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  asChild
                >
                  <a href={contactInfo.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-2" />
                    Visit Council Waste Homepage
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card className="shadow-lg bg-gradient-to-r from-slate-50 to-gray-50 border-slate-200">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-2 text-slate-600 mb-2">
              <ExternalLink className="w-4 h-4" />
              <span className="font-semibold">Important Disclaimer</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              Information is updated regularly but may change. Please verify on your council's official website. 
              ECOGENIUS is not responsible for changes in local waste policies and advice.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}