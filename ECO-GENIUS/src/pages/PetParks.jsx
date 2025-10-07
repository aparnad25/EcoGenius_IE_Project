import React, { useState, useEffect } from "react";
import { MapPin, Droplets, Trash2, AlertCircle, PawPrint, Info, Navigation, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function PetParks() {
  const [selectedCouncil, setSelectedCouncil] = useState("melbourne");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPark, setSelectedPark] = useState(null);

  // Sample pet parks data (in production, this would come from your API/dataset)
  const petParksData = {
    melbourne: [
      {
        id: 1,
        name: "Royal Park Dog Park",
        address: "Royal Park, Parkville VIC 3052",
        type: "Off-Leash",
        amenities: ["Waste Bins", "Water Station", "Bag Dispensers", "Fenced Area"],
        hours: "24/7",
        size: "Large",
        lat: -37.7833,
        lng: 144.9500,
      },
      {
        id: 2,
        name: "Fawkner Park Dog Park",
        address: "Fawkner Park, South Yarra VIC 3141",
        type: "Off-Leash",
        amenities: ["Waste Bins", "Water Station", "Bag Dispensers"],
        hours: "6am - 10pm",
        size: "Medium",
        lat: -37.8365,
        lng: 144.9898,
      },
      {
        id: 3,
        name: "Flagstaff Gardens",
        address: "Flagstaff Gardens, Melbourne VIC 3000",
        type: "On-Leash Only",
        amenities: ["Waste Bins", "Bag Dispensers"],
        hours: "6am - 10pm",
        size: "Small",
        lat: -37.8100,
        lng: 144.9560,
      },
    ],
    yarra: [
      {
        id: 4,
        name: "Edinburgh Gardens Dog Park",
        address: "Edinburgh Gardens, North Fitzroy VIC 3068",
        type: "Off-Leash",
        amenities: ["Waste Bins", "Water Station", "Bag Dispensers", "Agility Equipment"],
        hours: "24/7",
        size: "Large",
        lat: -37.7833,
        lng: 144.9833,
      },
    ],
    portphillip: [
      {
        id: 5,
        name: "St Kilda Beach Dog Park",
        address: "St Kilda Beach, St Kilda VIC 3182",
        type: "Off-Leash Beach",
        amenities: ["Waste Bins", "Water Station", "Bag Dispensers"],
        hours: "Dawn - 9am, 4pm - Dusk",
        size: "Large",
        lat: -37.8683,
        lng: 144.9750,
      },
    ],
  };

  const councils = [
    { value: "melbourne", label: "City of Melbourne" },
    { value: "yarra", label: "City of Yarra" },
    { value: "portphillip", label: "Port Phillip" },
    { value: "boroondara", label: "Boroondara" },
    { value: "stonnington", label: "Stonnington" },
  ];

  const currentParks = petParksData[selectedCouncil] || [];
  const filteredParks = currentParks.filter(park =>
    park.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    park.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Council-specific waste disposal rules
  const wasteDisposalRules = {
    melbourne: {
      bagRequired: true,
      binLocations: "Dog waste bins available at all major parks and reserves",
      fines: "$330 for failure to pick up dog waste",
      additionalInfo: "Red bins accept pet waste in biodegradable bags",
      recyclingNote: "Do NOT put pet waste in recycling or green waste bins",
    },
    yarra: {
      bagRequired: true,
      binLocations: "Dog waste bins in all off-leash areas",
      fines: "$396 for not cleaning up after your dog",
      additionalInfo: "Biodegradable bags recommended but not required",
      recyclingNote: "Pet waste must go in general waste (red bin) only",
    },
    portphillip: {
      bagRequired: true,
      binLocations: "Dedicated dog waste bins throughout municipality",
      fines: "$330 on-the-spot fine",
      additionalInfo: "Beach areas have additional waste stations",
      recyclingNote: "Never place pet waste in recycling or organics bins",
    },
  };

  const currentRules = wasteDisposalRules[selectedCouncil] || wasteDisposalRules.melbourne;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-6 py-3 bg-emerald-50 rounded-full text-sm font-semibold text-emerald-700 mb-6">
            <PawPrint className="w-4 h-4 mr-2" />
            Pet-Friendly Melbourne
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pet Parks & Waste Disposal Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find nearby pet-friendly spaces and learn responsible waste management practices
          </p>
        </div>

        {/* Council Selector */}
        <Card className="shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span>Select Your Council Area</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <Select value={selectedCouncil} onValueChange={setSelectedCouncil}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose your council" />
                </SelectTrigger>
                <SelectContent>
                  {councils.map((council) => (
                    <SelectItem key={council.value} value={council.value}>
                      {council.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search parks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          
          {/* Pet Parks List */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Navigation className="w-5 h-5 text-emerald-600" />
                    <span>Pet-Friendly Parks ({filteredParks.length})</span>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {filteredParks.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <PawPrint className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No parks found for this search.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredParks.map((park) => (
                      <div
                        key={park.id}
                        className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                          selectedPark?.id === park.id
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-emerald-300 bg-white"
                        }`}
                        onClick={() => setSelectedPark(park)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {park.name}
                            </h3>
                            <p className="text-gray-600 text-sm flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {park.address}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            park.type === "Off-Leash" || park.type === "Off-Leash Beach"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {park.type}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Operating Hours</p>
                            <p className="text-sm font-medium text-gray-900">{park.hours}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Park Size</p>
                            <p className="text-sm font-medium text-gray-900">{park.size}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 mb-2">Available Amenities</p>
                          <div className="flex flex-wrap gap-2">
                            {park.amenities.map((amenity, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium"
                              >
                                {amenity}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Pet Waste Disposal Guidelines */}
          <div className="space-y-6">
            <Card className="shadow-xl border-2 border-emerald-200">
              <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
                <CardTitle className="flex items-center space-x-2">
                  <Trash2 className="w-5 h-5 text-emerald-600" />
                  <span>Waste Disposal Rules</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-red-800 mb-1">Fines Apply</h4>
                      <p className="text-sm text-red-700">{currentRules.fines}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <PawPrint className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Bag Required</h4>
                      <p className="text-sm text-gray-600">
                        {currentRules.bagRequired
                          ? "Always carry waste bags. Biodegradable bags are recommended."
                          : "Check local requirements"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Bin Locations</h4>
                      <p className="text-sm text-gray-600">{currentRules.binLocations}</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Info className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Disposal Method</h4>
                      <p className="text-sm text-gray-600">{currentRules.additionalInfo}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-amber-800 mb-1">Important Note</h4>
                      <p className="text-sm text-amber-700">{currentRules.recyclingNote}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips Card */}
            <Card className="shadow-xl">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <CardTitle className="flex items-center space-x-2">
                  <Droplets className="w-5 h-5 text-blue-600" />
                  <span>Responsible Pet Ownership</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Always carry extra waste bags</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Keep your dog hydrated at water stations</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Follow leash requirements in designated areas</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Dispose of waste immediately in designated bins</p>
                  </li>
                  <li className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">Respect other park users and their pets</p>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Placeholder */}
        <Card className="shadow-xl mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              <span>Interactive Map (Coming Soon)</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl p-12 text-center">
              <MapPin className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">Interactive Map View</h3>
              <p className="text-gray-600 mb-6">
                We're building an interactive map to show all pet parks and waste disposal facilities in your area.
              </p>
              <p className="text-sm text-gray-500">
                In the meantime, use the park list above to find locations near you.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle>Additional Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 bg-emerald-50 rounded-xl text-center">
                <PawPrint className="w-8 h-8 text-emerald-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Pet Registration</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Register your pet with your local council
                </p>
                <Button variant="outline" size="sm">Learn More</Button>
              </div>
              
              <div className="p-6 bg-blue-50 rounded-xl text-center">
                <Droplets className="w-8 h-8 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Dog Training</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Find local obedience classes
                </p>
                <Button variant="outline" size="sm">Find Classes</Button>
              </div>
              
              <div className="p-6 bg-purple-50 rounded-xl text-center">
                <AlertCircle className="w-8 h-8 text-purple-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Pet Health</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Veterinary clinics and emergency services
                </p>
                <Button variant="outline" size="sm">View Services</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}