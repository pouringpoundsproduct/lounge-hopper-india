
import React, { useState } from 'react';
import { ArrowLeft, MapPin, Clock, Users, Wifi, Coffee, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import LoungePage from './LoungePage';

interface SearchResultsProps {
  results: any[];
  searchType: 'card' | 'airport';
  searchQuery: string;
  onBack: () => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, searchType, searchQuery, onBack }) => {
  const [selectedLounge, setSelectedLounge] = useState<any>(null);

  if (selectedLounge) {
    return <LoungePage lounge={selectedLounge} onBack={() => setSelectedLounge(null)} />;
  }

  const getResultsTitle = () => {
    if (searchType === 'card') {
      return `Lounges you can access with ${searchQuery}`;
    } else {
      return `Lounges at ${searchQuery}`;
    }
  };

  const getResultsSubtitle = () => {
    if (searchType === 'card') {
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

        {/* Results */}
        {results.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-8">
              <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <MapPin className="w-16 h-16 text-gray-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">No luck this time!</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                No lounges found for your search. Try a different card or location.
              </p>
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
