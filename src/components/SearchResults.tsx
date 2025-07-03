
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Star, CreditCard, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LoungePage from './LoungePage';

interface SearchResultsProps {
  results: any[];
  searchType: 'card' | 'airport' | 'both';
  searchQuery: string;
  selectedCard?: string;
  selectedLocation?: string;
  eligibleCards?: string[];
  onBack: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  searchType, 
  searchQuery, 
  selectedCard,
  selectedLocation,
  eligibleCards = [],
  onBack 
}) => {
  const [selectedLounge, setSelectedLounge] = useState<any>(null);

  if (selectedLounge) {
    return <LoungePage lounge={selectedLounge} onBack={() => setSelectedLounge(null)} />;
  }

  const getResultsTitle = () => {
    if (searchType === 'both') {
      return `Lounges for ${selectedCard} at ${selectedLocation}`;
    } else if (searchType === 'card') {
      return `Lounges you can access with ${selectedCard}`;
    } else {
      return `Lounges at ${selectedLocation}`;
    }
  };

  const getResultsSubtitle = () => {
    if (searchType === 'both') {
      return "Perfect matches for your card and destination:";
    } else if (searchType === 'card') {
      return "Enjoy your journey! Here's where you can relax:";
    } else {
      return "Available lounges at your destination:";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mr-4 p-2 hover:bg-white/50 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{getResultsTitle()}</h1>
            <p className="text-gray-600 mt-1">{getResultsSubtitle()}</p>
          </div>
        </div>

        {/* Search Summary */}
        {(selectedCard || selectedLocation) && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 border border-gray-200">
            <div className="flex items-center justify-center text-gray-700">
              {selectedCard && selectedLocation ? (
                <span className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                  {selectedCard}
                  <span className="mx-3 font-bold text-gray-400">+</span>
                  <MapPin className="w-4 h-4 mr-2 text-amber-600" />
                  {selectedLocation}
                </span>
              ) : selectedCard ? (
                <span className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                  {selectedCard}
                </span>
              ) : (
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-amber-600" />
                  {selectedLocation}
                </span>
              )}
              <span className="ml-3 text-gray-500">• {results.length} result{results.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        )}

        {/* Results */}
        {results.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <Plane className="w-16 h-16 text-gray-400 transform rotate-45" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No lounges found</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                {searchType === 'both' 
                  ? `No lounges found for ${selectedCard} at ${selectedLocation}.`
                  : searchType === 'card'
                  ? `No lounges found for ${selectedCard}.`
                  : `No lounges found at ${selectedLocation}.`
                }
              </p>
              
              {/* Show eligible cards for location-only searches */}
              {searchType === 'airport' && eligibleCards.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Cards that unlock lounges at {selectedLocation}:
                  </h3>
                  <div className="grid gap-3 max-w-md mx-auto">
                    {eligibleCards.slice(0, 5).map((cardName, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                        <span className="font-medium text-gray-800">{cardName}</span>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          Eligible
                        </Badge>
                      </div>
                    ))}
                    {eligibleCards.length > 5 && (
                      <p className="text-sm text-gray-500">
                        +{eligibleCards.length - 5} more cards available
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700">
                Try Another Search
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((lounge, index) => (
              <Card 
                key={lounge.id} 
                className="cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm border-0 shadow-lg"
                onClick={() => setSelectedLounge(lounge)}
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  animation: 'fade-in 0.6s ease-out forwards'
                }}
              >
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-amber-100 rounded-t-lg overflow-hidden">
                  <img 
                    src={lounge.image} 
                    alt={lounge.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.svg';
                    }}
                  />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-white/90 text-gray-800 font-medium">
                      <Star className="w-3 h-3 mr-1 fill-current text-yellow-500" />
                      {lounge.rating}
                    </Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{lounge.name}</h3>
                  <div className="flex items-center text-gray-600 mb-4">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span className="text-sm">{lounge.airport} • {lounge.city}, {lounge.state}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{lounge.hours}</span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {lounge.amenities.slice(0, 3).map((amenity: string) => (
                      <Badge key={amenity} variant="secondary" className="text-xs">
                        {amenity}
                      </Badge>
                    ))}
                    {lounge.amenities.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{lounge.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Show eligible cards for location searches */}
                  {searchType === 'airport' && lounge.eligibleCards.length > 0 && (
                    <div className="mb-4">
                      <p className="text-xs text-gray-500 mb-2">Eligible cards:</p>
                      <div className="flex flex-wrap gap-1">
                        {lounge.eligibleCards.slice(0, 2).map((card: string) => (
                          <Badge key={card} variant="outline" className="text-xs">
                            {card}
                          </Badge>
                        ))}
                        {lounge.eligibleCards.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{lounge.eligibleCards.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
