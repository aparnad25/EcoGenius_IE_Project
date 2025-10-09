import { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const councils = [
  {
    id: 'melbourne',
    name: 'City of Melbourne',
    description: 'CBD and inner city areas',
    logo: '/melbourne-logo.png',
    keywords: [
      'melbourne', 'carlton', 'carlton north', 'docklands', 'east melbourne',
      'flemington', 'kensington', 'north melbourne', 'parkville', 'port melbourne',
      'southbank', 'south wharf', 'west melbourne', 'cbd', 'collins street',
      'bourke street', 'flinders street', 'spencer street', 'swanston street'
    ]
  },
  {
    id: 'monash',
    name: 'City of Monash',
    description: 'Eastern suburbs including Clayton',
    logo: '/monash-logo.png',
    keywords: [
      'ashwood', 'burwood', 'burwood east', 'clayton', 'clayton south',
      'glen waverley', 'hughesdale', 'mount waverley', 'mulgrave', 'notting hill',
      'oakleigh', 'oakleigh east', 'oakleigh south', 'monash', 'ferntree gully road'
    ]
  },
  {
    id: 'port-phillip',
    name: 'City of Port Phillip',
    description: 'St Kilda, South Melbourne areas',
    logo: '/port-phillip-logo.png',
    keywords: [
      'albert park', 'balaclava', 'elwood', 'middle park', 'port melbourne',
      'ripponlea', 'south melbourne', 'st kilda', 'st kilda east',
      'st kilda west', 'windsor', 'port phillip', 'chapel street', 'acland street'
    ]
  },
  {
    id: 'yarra',
    name: 'City of Yarra',
    description: 'Richmond, Collingwood areas',
    logo: '/yarra-logo.png',
    keywords: [
      'abbotsford', 'alphington', 'burnley', 'clifton hill', 'collingwood',
      'cremorne', 'fairfield', 'fitzroy', 'fitzroy north', 'princes hill',
      'richmond', 'richmond north', 'yarra', 'johnston street', 'smith street'
    ]
  }
];

function findCouncilByAddress(address) {
  const addressLower = address.toLowerCase().trim();
  console.log('Searching for:', addressLower);
  
  // Simple and effective matching
  for (const council of councils) {
    for (const keyword of council.keywords) {
      if (addressLower.includes(keyword)) {
        console.log('Match found:', keyword, 'for council:', council.name);
        return {
          councilId: council.id,
          matchedKeyword: keyword,
          confidence: 'high'
        };
      }
    }
  }

  console.log('No match found');
  return null;
}

export default function CouncilSelector({ onCouncilSelect, selectedCouncil }) {
  const [address, setAddress] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [searchError, setSearchError] = useState(null);

  const handleAddressSearch = async () => {
    if (!address.trim()) {
      setSearchError("Please enter your address");
      return;
    }

    setIsSearching(true);
    setSearchError(null);
    setSearchResult(null);

    // Simulate search delay for better UX
    setTimeout(() => {
      const result = findCouncilByAddress(address);
      
      if (result) {
        const council = councils.find(c => c.id === result.councilId);
        setSearchResult({
          council: council,
          matchedKeyword: result.matchedKeyword,
          confidence: result.confidence
        });
        
        // Auto-select the council after showing the result
        setTimeout(() => {
          onCouncilSelect(result.councilId);
        }, 2000);
      } else {
        setSearchError("We couldn't determine your council from this address. Please try entering just the suburb name or select manually below.");
      }
      
      setIsSearching(false);
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddressSearch();
    }
  };

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-slate-900 mb-3">
          Choose Your Council
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Enter your address or suburb, or manually select your Melbourne council for personalized recycling guidelines
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="max-w-lg mx-auto shadow-lg border-slate-200/60 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-emerald-700">
              <Search className="w-5 h-5" />
              Find Your Council
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <Input
                type="text"
                placeholder="e.g. Clayton, St Kilda, Collins Street, Richmond"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                onKeyPress={handleKeyPress}
                className="text-lg p-3"
              />
              <Button
                onClick={handleAddressSearch}
                disabled={isSearching}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                {isSearching ? (
                  <>
                    <Loader2 className="animate-spin h-4 w-4 mr-2" />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4 mr-2" />
                    Find My Council
                  </>
                )}
              </Button>
            </div>
            
            {searchResult && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center p-4 bg-emerald-50 rounded-lg border border-emerald-200"
              >
                <img 
                  src={searchResult.council.logo} 
                  alt={searchResult.council.name}
                  className="w-16 h-16 mx-auto mb-2 object-contain"
                />
                <p className="text-emerald-800 font-semibold">
                  Found: {searchResult.council.name}
                </p>
                <p className="text-sm text-emerald-600">
                  Matched: &quot;{searchResult.matchedKeyword}&quot;
                </p>
                <p className="text-xs text-emerald-500 mt-1">
                  Loading your council information...
                </p>
              </motion.div>
            )}
            
            {searchError && (
              <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-sm text-amber-700">{searchError}</p>
              </div>
            )}
            
            <div className="text-center">
              <span className="text-sm text-slate-500">or manually select your council below</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-4">
          <h3 className="text-lg font-semibold text-slate-700">Manual Selection</h3>
          <p className="text-sm text-slate-500">Click your council if the search didn&apos;t work</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {councils.map((council, index) => (
            <motion.div
              key={council.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card 
                className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
                  selectedCouncil === council.id 
                    ? 'border-emerald-500 bg-emerald-50/50' 
                    : 'border-slate-200/60 bg-white/80'
                } backdrop-blur-sm`}
                onClick={() => onCouncilSelect(council.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img 
                      src={council.logo} 
                      alt={council.name}
                      className="w-12 h-12 object-contain"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-slate-900 mb-1">
                        {council.name}
                      </h3>
                      <p className="text-slate-600 text-sm mb-2">{council.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {council.keywords.slice(0, 3).map((keyword) => (
                          <span key={keyword} className="text-xs bg-slate-100 px-2 py-1 rounded-full text-slate-600">
                            {keyword}
                          </span>
                        ))}
                        <span className="text-xs text-slate-500">
                          +{council.keywords.length - 3} areas
                        </span>
                      </div>
                    </div>
                    {selectedCouncil === council.id && (
                      <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

CouncilSelector.propTypes = {
  onCouncilSelect: PropTypes.func.isRequired,
  selectedCouncil: PropTypes.string,
};