
import React, { useState } from 'react';
import { Search, CreditCard, MapPin, Plane, ArrowRight, Network as NetworkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SearchResults from '@/components/SearchResults';
import SearchableDropdown from '@/components/SearchableDropdown';
import { useLoungeFinder } from '@/hooks/useLoungeFinder';

const Index = () => {
  const { cards, lounges, networks, cities, loading, error, searchLounges, getEligibleCards } = useLoungeFinder();
  const [selectedCard, setSelectedCard] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedNetwork, setSelectedNetwork] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchType, setSearchType] = useState<'card' | 'city' | 'network' | 'multi'>('multi');

  const handleSearch = () => {
    if (!selectedCard && !selectedCity && !selectedNetwork) return;
    
    setHasSearched(true);
    const results = searchLounges(selectedCard, selectedCity, selectedNetwork);
    setSearchResults(results);
    
    // Determine search type for results display
    const searchCriteria = [selectedCard, selectedCity, selectedNetwork].filter(Boolean);
    if (searchCriteria.length > 1) {
      setSearchType('multi');
    } else if (selectedCard) {
      setSearchType('card');  
    } else if (selectedCity) {
      setSearchType('city');
    } else {
      setSearchType('network');
    }
  };

  const handleReset = () => {
    setHasSearched(false);
    setSelectedCard('');
    setSelectedCity('');
    setSelectedNetwork('');
    setSearchResults([]);
  };

  // Prepare dropdown options
  const cardOptions = cards.map(card => ({
    value: card.name,
    label: card.name,
    icon: '/placeholder.svg'
  }));

  const cityOptions = cities.map(city => ({
    value: city,
    label: city
  }));

  const networkOptions = networks.map(network => ({
    value: network.name,
    label: `${network.name} (${network.cardCount} cards)`
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <Plane className="w-12 h-12 text-blue-600 animate-bounce mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading lounge data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  if (hasSearched) {
    return (
      <SearchResults 
        results={searchResults} 
        searchType={searchType}
        searchQuery={selectedCard || selectedCity || selectedNetwork}
        selectedCard={selectedCard}
        selectedLocation={selectedCity}
        selectedNetwork={selectedNetwork}
        eligibleCards={getEligibleCards(selectedCity, selectedNetwork)}
        onBack={handleReset}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-amber-100 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-48 h-48 bg-blue-50 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating Plane Animation */}
        <div className="absolute top-1/3 left-0 w-full h-full pointer-events-none">
          <div className="relative w-full h-full">
            <Plane className="absolute w-8 h-8 text-blue-400 opacity-60 animate-bounce" 
                   style={{ 
                     left: '10%', 
                     top: '20%',
                     animationDuration: '3s',
                     animationDelay: '0.5s'
                   }} />
            <Plane className="absolute w-6 h-6 text-amber-400 opacity-50 animate-pulse" 
                   style={{ 
                     right: '15%', 
                     top: '60%',
                     animationDuration: '4s',
                     animationDelay: '1.5s'
                   }} />
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mb-6 shadow-lg">
              <Plane className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Beat the queue.
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
              Check your lounge eligibility
            </span>
            <br />
            on Lounge Finder.
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Find out which airport lounges you can access with your credit card, 
            or discover the best cards for your destination.
          </p>
        </div>

        {/* Enhanced Triple Search Section */}
        <div className="max-w-5xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Your Perfect Lounge</h2>
                <p className="text-gray-600">Choose any combination of card, city, or network for precise results</p>
              </div>

              {/* Triple Search Inputs */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Credit Card Input */}
                <div className="space-y-3">
                  <label className="flex items-center text-lg font-semibold text-gray-800">
                    <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                    Which credit card do you have?
                  </label>
                  <SearchableDropdown
                    options={cardOptions}
                    placeholder="Select or search your credit card"
                    value={selectedCard}
                    onChange={setSelectedCard}
                    icon={<CreditCard className="w-5 h-5" />}
                  />
                  <p className="text-sm text-gray-500">Optional - Find lounges for your specific card</p>
                </div>

                {/* City Input */}
                <div className="space-y-3">
                  <label className="flex items-center text-lg font-semibold text-gray-800">
                    <MapPin className="w-5 h-5 mr-2 text-amber-600" />
                    Where do you want to use the lounge?
                  </label>
                  <SearchableDropdown
                    options={cityOptions}
                    placeholder="Select city"
                    value={selectedCity}
                    onChange={setSelectedCity}
                    icon={<MapPin className="w-5 h-5" />}
                  />
                  <p className="text-sm text-gray-500">Optional - Find lounges in your destination city</p>
                </div>

                {/* Network Input */}
                <div className="space-y-3">
                  <label className="flex items-center text-lg font-semibold text-gray-800">
                    <NetworkIcon className="w-5 h-5 mr-2 text-green-600" />
                    Select your card network
                  </label>
                  <SearchableDropdown
                    options={networkOptions}
                    placeholder="Select network"
                    value={selectedNetwork}
                    onChange={setSelectedNetwork}
                    icon={<NetworkIcon className="w-5 h-5" />}
                  />
                  <p className="text-sm text-gray-500">Optional - Filter by Visa, Mastercard, etc.</p>
                </div>
              </div>

              {/* Search Logic Indicator */}
              {(selectedCard || selectedCity || selectedNetwork) && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-center text-blue-800 flex-wrap gap-2">
                    {selectedCard && (
                      <span className="flex items-center bg-white px-3 py-1 rounded-full">
                        <CreditCard className="w-4 h-4 mr-2" />
                        {selectedCard}
                      </span>
                    )}
                    {selectedCity && (
                      <span className="flex items-center bg-white px-3 py-1 rounded-full">
                        <MapPin className="w-4 h-4 mr-2" />
                        {selectedCity}
                      </span>
                    )}
                    {selectedNetwork && (
                      <span className="flex items-center bg-white px-3 py-1 rounded-full">
                        <NetworkIcon className="w-4 h-4 mr-2" />
                        {selectedNetwork}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Search Button */}
              <Button 
                onClick={handleSearch}
                disabled={!selectedCard && !selectedCity && !selectedNetwork}
                className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Search className="w-5 h-5 mr-2" />
                Check Lounge Access
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              {/* Popular Searches */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-4 text-center">Popular searches:</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <button 
                    onClick={() => setSelectedCard('HDFC Diners Club')}
                    className="px-3 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm hover:bg-blue-100 transition-colors"
                  >
                    HDFC Diners Club
                  </button>
                  <button 
                    onClick={() => setSelectedCity('Mumbai')}
                    className="px-3 py-2 bg-amber-50 text-amber-600 rounded-lg text-sm hover:bg-amber-100 transition-colors"
                  >
                    Mumbai
                  </button>
                  <button 
                    onClick={() => setSelectedNetwork('Visa')}
                    className="px-3 py-2 bg-green-50 text-green-600 rounded-lg text-sm hover:bg-green-100 transition-colors"
                  >
                    Visa Network
                  </button>
                  <button 
                    onClick={() => setSelectedCity('Delhi')}
                    className="px-3 py-2 bg-amber-50 text-amber-600 rounded-lg text-sm hover:bg-amber-100 transition-colors"
                  >
                    Delhi
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p className="text-sm">
            Covering {lounges.length} lounges across India • {cards.length} credit cards • {networks.length} networks
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
