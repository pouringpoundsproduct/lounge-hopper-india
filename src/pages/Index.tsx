
import React, { useState } from 'react';
import { Search, CreditCard, MapPin, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import SearchResults from '@/components/SearchResults';
import { sampleLounges, sampleCards } from '@/data/sampleData';

const Index = () => {
  const [searchType, setSearchType] = useState<'card' | 'airport'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
    
    if (searchType === 'card') {
      // Filter lounges by card eligibility
      const cardResults = sampleLounges.filter(lounge => 
        lounge.eligibleCards.some(card => 
          card.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setSearchResults(cardResults);
    } else {
      // Filter lounges by airport/city
      const airportResults = sampleLounges.filter(lounge => 
        lounge.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lounge.airport.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(airportResults);
    }
  };

  const handleReset = () => {
    setHasSearched(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  if (hasSearched) {
    return (
      <SearchResults 
        results={searchResults} 
        searchType={searchType}
        searchQuery={searchQuery}
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
            or discover the best cards for your city.
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-2xl mx-auto">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              {/* Search Type Toggle */}
              <div className="flex rounded-lg bg-gray-100 p-1 mb-8">
                <button
                  onClick={() => setSearchType('card')}
                  className={`flex-1 flex items-center justify-center py-3 px-4 rounded-md text-sm font-medium transition-all ${
                    searchType === 'card'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  By Credit Card
                </button>
                <button
                  onClick={() => setSearchType('airport')}
                  className={`flex-1 flex items-center justify-center py-3 px-4 rounded-md text-sm font-medium transition-all ${
                    searchType === 'airport'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  By City/Airport
                </button>
              </div>

              {/* Search Input */}
              <div className="relative mb-8">
                <Input
                  type="text"
                  placeholder={
                    searchType === 'card' 
                      ? "Enter or select your credit card (e.g., HDFC Diners Club)"
                      : "Enter your city or airport (e.g., Mumbai, BOM)"
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && searchQuery && handleSearch()}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>

              {/* Search Button */}
              <Button 
                onClick={handleSearch}
                disabled={!searchQuery.trim()}
                className="w-full py-4 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <Search className="w-5 h-5 mr-2" />
                Check Lounge Access
              </Button>

              {/* Quick suggestions */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <p className="text-sm text-gray-500 mb-3">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {searchType === 'card' ? (
                    <>
                      <button 
                        onClick={() => setSearchQuery('HDFC Diners Club')}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition-colors"
                      >
                        HDFC Diners Club
                      </button>
                      <button 
                        onClick={() => setSearchQuery('American Express')}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition-colors"
                      >
                        American Express
                      </button>
                      <button 
                        onClick={() => setSearchQuery('Axis Magnus')}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm hover:bg-blue-100 transition-colors"
                      >
                        Axis Magnus
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                        onClick={() => setSearchQuery('Mumbai')}
                        className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-sm hover:bg-amber-100 transition-colors"
                      >
                        Mumbai
                      </button>
                      <button 
                        onClick={() => setSearchQuery('Delhi')}
                        className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-sm hover:bg-amber-100 transition-colors"
                      >
                        Delhi
                      </button>
                      <button 
                        onClick={() => setSearchQuery('Bangalore')}
                        className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-sm hover:bg-amber-100 transition-colors"
                      >
                        Bangalore
                      </button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-500">
          <p className="text-sm">
            Covering all major airports across India • Updated lounge information
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
