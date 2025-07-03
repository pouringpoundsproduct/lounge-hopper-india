
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
    // Scroll to top when returning to search
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
    label: network.name
  }));

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 flex items-center justify-center">
        <div className="text-center">
          <Plane className="w-12 h-12 text-blue-600 animate-bounce mx-auto mb-4" />
          <p className="text-xl text-gray-600">Loading lounge data...</p>
          <p className="text-sm text-gray-500 mt-2">Fetching lounges, cards, and networks...</p>
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
    // Calculate eligible cards properly for all search types
    let eligibleCardsForResults: string[] = [];
    if (selectedCity || selectedNetwork) {
      // For city/network searches, get eligible cards for that location/network
      eligibleCardsForResults = getEligibleCards(selectedCity, selectedNetwork);
    } else if (selectedCard && searchResults.length === 0) {
      // For card searches with no results, get ALL eligible cards from all lounges
      eligibleCardsForResults = getEligibleCards();
    }

    return (
      <SearchResults 
        results={searchResults} 
        searchType={searchType}
        searchQuery={selectedCard || selectedCity || selectedNetwork}
        selectedCard={selectedCard}
        selectedLocation={selectedCity}
        selectedNetwork={selectedNetwork}
        eligibleCards={eligibleCardsForResults}
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

        {/* Travel-Themed Hero Search Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white/90 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-8 md:p-12">
              {/* Animated Hero Section */}
              <div className="text-center mb-12">
                <div className="relative mb-8">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-amber-600 rounded-full mb-6 shadow-xl relative overflow-hidden">
                    <Plane className="w-12 h-12 text-white animate-bounce" />
                    {/* Animated flight path */}
                    <div className="absolute inset-0 animate-ping opacity-30">
                      <div className="w-full h-full border-2 border-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Lounge</h2>
                <p className="text-lg text-gray-600 mb-8">Answer either or both questions to discover your lounge access</p>
              </div>

              {/* Main Search Questions */}
              <div className="space-y-8">
                {/* Primary Questions - Responsive Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                  {/* Credit Card Question */}
                  <div className="w-full space-y-4 animate-fade-in">
                    <div className="text-left">
                      <label className="flex items-start text-lg font-bold text-gray-900 mb-3">
                        <CreditCard className="w-6 h-6 mr-3 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>Which credit card do you have?</span>
                      </label>
                      <div className="flex items-start text-sm text-gray-600 mb-4 ml-9">
                        <span className="mr-2">💡</span>
                        <span>Select your credit card to see eligible lounges</span>
                      </div>
                    </div>
                    <div className="w-full">
                      <SearchableDropdown
                        options={cardOptions}
                        placeholder={loading ? "Loading cards..." : "Search your credit card"}
                        value={selectedCard}
                        onChange={setSelectedCard}
                        icon={<CreditCard className="w-5 h-5" />}
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* City Question */}
                  <div className="w-full space-y-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="text-left">
                      <label className="flex items-start text-lg font-bold text-gray-900 mb-3">
                        <MapPin className="w-6 h-6 mr-3 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>Where do you want to use the lounge?</span>
                      </label>
                      <div className="flex items-start text-sm text-gray-600 mb-4 ml-9">
                        <span className="mr-2">💡</span>
                        <span>Choose a city to find lounges there</span>
                      </div>
                    </div>
                    <div className="w-full">
                      <SearchableDropdown
                        options={cityOptions}
                        placeholder={loading ? "Loading cities..." : "Search destination city"}
                        value={selectedCity}
                        onChange={setSelectedCity}
                        icon={<MapPin className="w-5 h-5" />}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Conditional Network Field - Only show if card is selected */}
                {selectedCard && (
                  <div className="space-y-4 animate-fade-in border-t border-gray-100 pt-8">
                    <div className="text-center">
                      <label className="flex items-center justify-center text-lg font-semibold text-gray-800 mb-2">
                        <NetworkIcon className="w-5 h-5 mr-3 text-green-600" />
                        Select your card network
                      </label>
                      <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
                        <span className="mr-2">💡</span>
                        <span>Filter by card network (Visa, Mastercard, Diners Club, etc.)</span>
                      </div>
                    </div>
                    <div className="max-w-md mx-auto">
                      <SearchableDropdown
                        options={networkOptions}
                        placeholder={loading ? "Loading networks..." : "Select network"}
                        value={selectedNetwork}
                        onChange={setSelectedNetwork}
                        icon={<NetworkIcon className="w-5 h-5" />}
                        className="transform transition-all duration-300 hover:scale-105"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Search Logic Indicator */}
              {(selectedCard || selectedCity || selectedNetwork) && (
                <div className="bg-gradient-to-r from-blue-50 to-amber-50 border border-blue-200 rounded-xl p-6 mt-8 mb-8 animate-fade-in">
                  <div className="text-center mb-4">
                    <p className="text-sm font-medium text-gray-700">Your search criteria:</p>
                  </div>
                  <div className="flex items-center justify-center text-blue-800 flex-wrap gap-3">
                    {selectedCard && (
                      <span className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-blue-100 transform transition-all hover:scale-105">
                        <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                        <span className="font-medium">{selectedCard}</span>
                      </span>
                    )}
                    {selectedCity && (
                      <span className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-amber-100 transform transition-all hover:scale-105">
                        <MapPin className="w-4 h-4 mr-2 text-amber-600" />
                        <span className="font-medium">{selectedCity}</span>
                      </span>
                    )}
                    {selectedNetwork && (
                      <span className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm border border-green-100 transform transition-all hover:scale-105">
                        <NetworkIcon className="w-4 h-4 mr-2 text-green-600" />
                        <span className="font-medium">{selectedNetwork}</span>
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Conversion-Focused Search Button */}
              <div className="relative mt-8">
                <Button 
                  onClick={handleSearch}
                  disabled={!selectedCard && !selectedCity && !selectedNetwork}
                  className="w-full py-6 text-xl font-bold bg-gradient-to-r from-green-500 via-blue-600 to-purple-600 hover:from-green-600 hover:via-blue-700 hover:to-purple-700 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100 relative overflow-hidden group border-0"
                  size="lg"
                >
                  {/* Animated Background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                  
                  <div className="relative flex items-center justify-center">
                    <Search className="w-7 h-7 mr-3" />
                    <span className="tracking-wide">Find My Lounges</span>
                    <ArrowRight className="w-7 h-7 ml-3 transform group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                  
                  {/* Conversion-focused decorative elements */}
                  <div className="absolute top-2 right-4 opacity-40">
                    <Plane className="w-5 h-5 transform rotate-45 text-white animate-pulse" />
                  </div>
                  
                  {/* Pulsing effect for conversion */}
                  <div className="absolute inset-0 rounded-2xl animate-ping opacity-20 bg-gradient-to-r from-green-400 to-purple-400"></div>
                </Button>
              </div>

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
