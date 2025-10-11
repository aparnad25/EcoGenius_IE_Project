import { useState, useEffect, useCallback } from "react";
import { MapPin, Droplets, Trash2, AlertCircle, PawPrint, Info, Navigation, Search, Recycle, Home, Package } from "lucide-react";
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
import { useNavigate } from "react-router-dom";
import BackToDashboard from "@/components/common/BackToDashboard";

export default function PetParks() {
  const navigate = useNavigate();
  const [selectedCouncil, setSelectedCouncil] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPark, setSelectedPark] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Data states
  const [petParksData, setPetParksData] = useState([]);
  const [councilRulesData, setCouncilRulesData] = useState([]);
  const [councils, setCouncils] = useState([]);
  const [registrationData, setRegistrationData] = useState([]);
  const [trainingData, setTrainingData] = useState([]);

  // CSV parser
  const parseCsv = (csvContent) => {
    const lines = csvContent.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const obj = {};
      headers.forEach((header, index) => {
        const value = values[index]?.trim().replace(/"/g, '');
        if (!isNaN(value) && value !== '' && value !== null && value !== undefined) {
          obj[header] = parseFloat(value);
        } else {
          obj[header] = value;
        }
      });
      return obj;
    });
  };

  // Load data from CSV files
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      
      // Load Pet Parks data
      const parksResponse = await fetch('/Melbourne_Pets.csv');
      if (!parksResponse.ok) throw new Error('Failed to load pet parks data');
      const parksCsv = await parksResponse.text();
      const parsedParks = parseCsv(parksCsv);
      setPetParksData(parsedParks);
      
      // Load Council Rules data
      const rulesResponse = await fetch('/Pets_Council_Rules.csv');
      if (!rulesResponse.ok) throw new Error('Failed to load council rules data');
      const rulesCsv = await rulesResponse.text();
      const parsedRules = parseCsv(rulesCsv);
      setCouncilRulesData(parsedRules);
      
      // Load Pet Registration data
      const registrationResponse = await fetch('/council_pet_registeration.csv');
      if (!registrationResponse.ok) throw new Error('Failed to load registration data');
      const registrationCsv = await registrationResponse.text();
      const parsedRegistration = parseCsv(registrationCsv);
      setRegistrationData(parsedRegistration);
      
      // Load Dog Training data
      const trainingResponse = await fetch('/minister_approved_dog_training_organizations.csv');
      if (!trainingResponse.ok) throw new Error('Failed to load training data');
      const trainingCsv = await trainingResponse.text();
      const parsedTraining = parseCsv(trainingCsv);
      setTrainingData(parsedTraining);
      
      // Extract unique councils from parks data
      const councilValues = parsedParks
        .map(park => park.Council)
        .filter(Boolean);
      
      const uniqueCouncils = [...new Set(councilValues)];
      
      const councilOptions = uniqueCouncils.sort().map(council => ({
        value: council.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        label: council
      }));
      
      setCouncils(councilOptions);
      
      // Set default council to first one
      if (councilOptions.length > 0) {
        setSelectedCouncil(councilOptions[0].value);
      }
      
      setError(null);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load pet parks data. Please ensure all CSV files are in the public folder.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Filter parks based on selected council and search query
  const getFilteredParks = () => {
    if (!selectedCouncil || petParksData.length === 0) return [];
    
    const selectedCouncilName = councils.find(c => c.value === selectedCouncil)?.label;
    
    return petParksData.filter(park => {
      const matchesCouncil = park.Council === selectedCouncilName;
      const matchesSearch = !searchQuery || 
        park.Park_Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        park.Suburb?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCouncil && matchesSearch;
    });
  };

  const filteredParks = getFilteredParks();

  // Get council rules for selected council
  const getCurrentCouncilRules = () => {
    const selectedCouncilName = councils.find(c => c.value === selectedCouncil)?.label;
    return councilRulesData.find(rule => 
      rule.Council_Name === selectedCouncilName
    ) || null;
  };

  const currentRules = getCurrentCouncilRules();
  
  // General rules to show when specific council rules are not available
  const generalRules = {
    Pet_Waste_Bin_Type: "General waste (red bin) or designated pet waste bins",
    Compostable_Bags_Allowed: "Check with your local council",
    Fine_Amount: 330,
    Special_Rules: "Always clean up after your pet. Carry waste bags at all times.",
    Beach_Restrictions: "Check local signage for beach-specific rules",
    Contact_Info: "Contact your local council for specific guidelines"
  };

  // Get registration info for selected council
  const getCurrentRegistrationInfo = () => {
    const selectedCouncilName = councils.find(c => c.value === selectedCouncil)?.label;
    return registrationData.find(reg => reg.Council === selectedCouncilName) || null;
  };

  const currentRegistration = getCurrentRegistrationInfo();

  // Get training organizations for selected council
  const getCurrentTrainingOrgs = () => {
    const selectedCouncilName = councils.find(c => c.value === selectedCouncil)?.label;
    return trainingData.filter(training => training.Council === selectedCouncilName);
  };

  const currentTrainingOrgs = getCurrentTrainingOrgs();

  // Pet bulky waste items
  const petBulkyWasteItems = [
    {
      category: "Dog Houses & Kennels",
      items: ["Wooden kennels", "Plastic dog houses", "Metal crates"],
      disposal: "Check for reuse options first. Large items qualify for council hard waste collection.",
      bin: "red_landfill",
      alternatives: ["Donate to animal shelters", "List on Waste Billboard", "Council hard waste pickup"]
    },
    {
      category: "Pet Beds & Bedding",
      items: ["Dog beds", "Cat beds", "Cushions", "Blankets"],
      disposal: "Clean items can be donated. Soiled items go to landfill.",
      bin: "red_landfill",
      alternatives: ["Animal shelters", "Op shops (if clean)", "Textile recycling (clean only)"]
    },
    {
      category: "Carriers & Crates",
      items: ["Travel crates", "Pet carriers", "Transport boxes"],
      disposal: "Reusable items have high donation value.",
      bin: "red_landfill",
      alternatives: ["Pet rescue groups", "Veterinary clinics", "Online marketplace"]
    },
    {
      category: "Toys & Accessories",
      items: ["Plastic toys", "Ropes", "Balls", "Collars", "Leashes"],
      disposal: "Clean, usable items should be donated first.",
      bin: "red_landfill",
      alternatives: ["Animal welfare organizations", "Dog parks community boards"]
    },
    {
      category: "Feeding Equipment",
      items: ["Bowls", "Automatic feeders", "Water fountains"],
      disposal: "Metal and ceramic can often be recycled.",
      bin: "yellow_recycling",
      alternatives: ["Clean and donate", "Scrap metal (if metal)", "Red bin (if plastic/damaged)"]
    },
    {
      category: "Aquariums & Pet Habitats",
      items: ["Fish tanks", "Bird cages", "Rabbit hutches"],
      disposal: "Large items - council hard waste collection required.",
      bin: "special_collection",
      alternatives: ["Pet stores (some accept returns)", "Online marketplace", "Council cleanup"]
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center max-w-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-6"></div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Loading Pet Parks Data</h2>
          <p className="text-gray-600">Fetching parks and council information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-600">
              <AlertCircle className="w-6 h-6" />
              <span>Data Loading Error</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">{error}</p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
              <p className="font-semibold text-yellow-800 mb-2">Setup Instructions:</p>
              <ol className="list-decimal list-inside space-y-1 text-sm text-yellow-700">
                <li>Save Melbourne_Pets.csv in public/ folder</li>
                <li>Save Pets_Council_Rules.csv in public/ folder</li>
                <li>Save council_pet_registeration.csv in public/ folder</li>
                <li>Save minister_approved_dog_training_organizations.csv in public/ folder</li>
                <li>Refresh this page</li>
              </ol>
            </div>
            <Button onClick={loadData} className="mt-4">Retry Loading Data</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Hero Section */}
        <div className="text-center mb-12">
          {/* <BackToDashboard /> */}
          <div className="inline-flex items-center px-6 py-3 bg-emerald-50 rounded-full text-sm font-semibold text-emerald-700 mb-6">
            <PawPrint className="w-4 h-4 mr-2" />
            Pet-Friendly Melbourne
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pet Parks & Waste Disposal Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Find nearby pet-friendly spaces and learn responsible waste management for pets and pet items
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
          </div>
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
                  {councils.length === 0 ? (
                    <SelectItem value="none" disabled>No councils found</SelectItem>
                  ) : (
                    councils.map((council) => (
                      <SelectItem key={council.value} value={council.value}>
                        {council.label}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid - Parks and Waste Rules */}
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
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {filteredParks.map((park, index) => (
                      <div
                        key={index}
                        className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                          selectedPark?.Park_Name === park.Park_Name
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-emerald-300 bg-white"
                        }`}
                        onClick={() => setSelectedPark(park)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {park.Park_Name}
                            </h3>
                            <p className="text-gray-600 text-sm flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {park.Suburb}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            park.Off_Leash_Area === 'Yes'
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {park.Off_Leash_Area === 'Yes' ? 'Off-Leash' : 'On-Leash'}
                          </span>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500 mb-2">Available Amenities</p>
                          <div className="flex flex-wrap gap-2">
                            {park.Dog_Bag_Dispenser === 'Yes' && (
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium flex items-center space-x-1">
                                <Package className="w-3 h-3" />
                                <span>Bag Dispensers</span>
                              </span>
                            )}
                            {park.Bins === 'Yes' && (
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium flex items-center space-x-1">
                                <Trash2 className="w-3 h-3" />
                                <span>Waste Bins</span>
                              </span>
                            )}
                            {park.Water_Fountain === 'Yes' && (
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center space-x-1">
                                <Droplets className="w-3 h-3" />
                                <span>Water Station</span>
                              </span>
                            )}
                            {park.Off_Leash_Area === 'Yes' && (
                              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center space-x-1">
                                <PawPrint className="w-3 h-3" />
                                <span>Off-Leash Area</span>
                              </span>
                            )}
                            {park.Dog_Bag_Dispenser !== 'Yes' && park.Bins !== 'Yes' && 
                             park.Water_Fountain !== 'Yes' && park.Off_Leash_Area !== 'Yes' && (
                              <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                                Basic facilities
                              </span>
                            )}
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
                {!currentRules && (
                  <p className="text-xs text-amber-600 mt-2">
                    ℹ️ Showing general guidelines
                  </p>
                )}
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                {(currentRules?.Fine_Amount || generalRules.Fine_Amount) && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                    <div className="flex items-start space-x-3">
                      <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-red-800 mb-1">Fines Apply</h4>
                        <p className="text-sm text-red-700">
                          ${currentRules?.Fine_Amount || generalRules.Fine_Amount} fine for not cleaning up
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Trash2 className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Correct Bin</h4>
                      <p className="text-sm text-gray-600">
                        {currentRules?.Pet_Waste_Bin_Type || generalRules.Pet_Waste_Bin_Type}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Recycle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Bags</h4>
                      <p className="text-sm text-gray-600">
                        {currentRules?.Compostable_Bags_Allowed === 'Yes' 
                          ? 'Compostable bags accepted'
                          : currentRules?.Compostable_Bags_Allowed === 'No'
                          ? 'Regular plastic bags only'
                          : generalRules.Compostable_Bags_Allowed}
                      </p>
                    </div>
                  </div>

                  {(currentRules?.Special_Rules || generalRules.Special_Rules) && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Info className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Special Rules</h4>
                        <p className="text-sm text-gray-600">
                          {currentRules?.Special_Rules || generalRules.Special_Rules}
                        </p>
                      </div>
                    </div>
                  )}

                  {(currentRules?.Beach_Restrictions || generalRules.Beach_Restrictions) && (
                    <div className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Droplets className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Beach</h4>
                        <p className="text-sm text-gray-600">
                          {currentRules?.Beach_Restrictions || generalRules.Beach_Restrictions}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-amber-700">
                        Never use recycling bins for pet waste
                      </p>
                    </div>
                  </div>
                </div>

                {(currentRules?.Contact_Info || generalRules.Contact_Info) && (
                  <div className="pt-4 border-t">
                    <p className="text-xs text-gray-500 mb-1">Contact</p>
                    <p className="text-sm font-medium text-gray-900">
                      {currentRules?.Contact_Info || generalRules.Contact_Info}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pet Registration & Training */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Registration */}
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
              <CardTitle className="flex items-center space-x-2">
                <PawPrint className="w-6 h-6 text-emerald-600" />
                <span>Pet Registration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {currentRegistration ? (
                <div className="space-y-4">
                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                    <h4 className="font-semibold text-blue-900 mb-3">Annual Fees</h4>
                    <div className="space-y-2">
                      {currentRegistration.Annual_Fee_Desexed_Dog && (
                        <div className="flex justify-between">
                          <span className="text-sm text-blue-800">Desexed Dog:</span>
                          <span className="text-sm font-bold">{currentRegistration.Annual_Fee_Desexed_Dog}</span>
                        </div>
                      )}
                      {currentRegistration.Annual_Fee_Non_Desexed_Dog && (
                        <div className="flex justify-between">
                          <span className="text-sm text-blue-800">Non-Desexed:</span>
                          <span className="text-sm font-bold">{currentRegistration.Annual_Fee_Non_Desexed_Dog}</span>
                        </div>
                      )}
                      {currentRegistration.Annual_Fee_Cat && (
                        <div className="flex justify-between">
                          <span className="text-sm text-blue-800">Cat:</span>
                          <span className="text-sm font-bold">{currentRegistration.Annual_Fee_Cat}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {(currentRegistration.Pensioner_Discount_Available === 'Yes' || 
                    currentRegistration.Obedience_Training_Discount === 'Yes') && (
                    <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
                      <h4 className="font-semibold text-green-900 mb-2">💰 Discounts</h4>
                      <ul className="space-y-1">
                        {currentRegistration.Pensioner_Discount_Available === 'Yes' && (
                          <li className="text-sm text-green-800">• Pensioner discount</li>
                        )}
                        {currentRegistration.Obedience_Training_Discount === 'Yes' && (
                          <li className="text-sm text-green-800">• Training discount</li>
                        )}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${currentRegistration.Microchip_Required === 'Yes' ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                      <span className="text-sm">Microchip</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-3 h-3 rounded-full ${currentRegistration.Online_Registration_Available === 'Yes' ? 'bg-emerald-500' : 'bg-gray-300'}`}></div>
                      <span className="text-sm">Online</span>
                    </div>
                  </div>

                  {currentRegistration.Registration_URL && (
                    <Button 
                      onClick={() => window.open(currentRegistration.Registration_URL, '_blank')}
                      className="w-full bg-emerald-500 hover:bg-emerald-600"
                    >
                      Register Online
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No data for this council</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Training */}
          <Card className="shadow-xl">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="flex items-center space-x-2">
                <Droplets className="w-6 h-6 text-blue-600" />
                <span>Dog Training</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              {currentTrainingOrgs.length > 0 ? (
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {currentTrainingOrgs.map((org, index) => (
                    <div key={index} className="border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-all">
                      <div className="flex justify-between mb-2">
                        <h4 className="font-bold text-sm">{org.Training_Provider_Name}</h4>
                        {org.Registration_Fee_Discount_Eligible === 'Yes' && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">💰</span>
                        )}
                      </div>
                      {org.Training_Location && (
                        <p className="text-xs text-gray-600 mb-2">📍 {org.Training_Location}</p>
                      )}
                      {org.Website && (
                        <Button 
                          onClick={() => window.open(org.Website, '_blank')}
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                        >
                          Website
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No trainers for this council</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Pet Bulky Waste */}
        <Card className="shadow-xl mb-8">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50">
            <CardTitle className="flex items-center space-x-2">
              <Home className="w-6 h-6 text-orange-600" />
              <span>Pet Bulky Waste Disposal</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {petBulkyWasteItems.map((item, index) => (
                <div key={index} className="border-2 border-gray-200 rounded-xl p-6 hover:border-emerald-300 transition-all">
                  <h3 className="text-lg font-bold mb-4">{item.category}</h3>
                  
                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Items:</p>
                    <div className="flex flex-wrap gap-2">
                      {item.items.map((subItem, idx) => (
                        <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                          {subItem}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-1">Method:</p>
                    <p className="text-sm text-gray-700">{item.disposal}</p>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-gray-500 mb-2">Alternatives:</p>
                    <ul className="space-y-1">
                      {item.alternatives.map((alt, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5"></div>
                          <span className="text-sm text-gray-600">{alt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.bin === 'yellow_recycling' ? 'bg-yellow-100 text-yellow-700' :
                    item.bin === 'red_landfill' ? 'bg-red-100 text-red-700' :
                    'bg-purple-100 text-purple-700'
                  }`}>
                    {item.bin === 'yellow_recycling' ? '🟡 Recycling' :
                     item.bin === 'red_landfill' ? '🔴 Landfill' :
                     '🟣 Special'}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl p-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <PawPrint className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Use AI Lens for Pet Items</h3>
                  <p className="text-gray-700 mb-4">
                    Take a photo with our AI Lens for instant disposal advice
                  </p>
                  <Button 
                    onClick={() => navigate("/scanner")}
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    Open AI Lens
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billboard Link */}
        <Card className="shadow-xl">
          <CardContent className="p-6">
            <div className="max-w-md mx-auto text-center">
              <div className="p-6 bg-purple-50 rounded-xl">
                <AlertCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Waste Billboard</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Share unwanted pet items with neighbors
                </p>
                <Button 
                  onClick={() => navigate("/billboard")}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  View Billboard
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}