
import React from 'react';
import { ArrowLeft, MapPin, Clock, Users, Wifi, Coffee, Car, Utensils, Bath, Baby, Star, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface LoungePageProps {
  lounge: any;
  onBack: () => void;
}

const LoungePage: React.FC<LoungePageProps> = ({ lounge, onBack }) => {
  const getAmenityIcon = (amenity: string) => {
    const iconMap: { [key: string]: any } = {
      'Free WiFi': Wifi,
      'Food & Beverages': Utensils,
      'Comfortable Seating': Users,
      'Shower Facilities': Bath,
      'Kids Play Area': Baby,
      'Business Center': Coffee,
      'Parking': Car,
    };
    
    const IconComponent = iconMap[amenity] || Coffee;
    return <IconComponent className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      <div className="container mx-auto px-4 py-6 max-w-4xl">
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
            <h1 className="text-3xl font-bold text-gray-900">{lounge.name}</h1>
            <div className="flex items-center text-gray-600 mt-2">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{lounge.airport} • {lounge.city}, {lounge.state}</span>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="relative h-64 md:h-96 bg-gradient-to-br from-blue-100 to-amber-100 rounded-xl overflow-hidden mb-8 shadow-lg">
          <img 
            src={lounge.image} 
            alt={lounge.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-white/90 text-gray-800 font-medium">
              <Star className="w-4 h-4 mr-1 fill-current text-yellow-500" />
              {lounge.rating} ({lounge.reviews} reviews)
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Info */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  Hours & Location
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Opening Hours</h4>
                  <p className="text-gray-600">{lounge.hours}</p>
                </div>
                <Separator />
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Location</h4>
                  <p className="text-gray-600">{lounge.location}</p>
                  <p className="text-sm text-blue-600 mt-1 cursor-pointer hover:underline">
                    How to find this lounge inside the terminal →
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Coffee className="w-5 h-5 mr-2 text-blue-600" />
                  Amenities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {lounge.amenities.map((amenity: string) => (
                    <div key={amenity} className="flex items-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-blue-600 mr-3">
                        {getAmenityIcon(amenity)}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{amenity}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Guest Policy */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-600" />
                  Guest Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Guest Access</h4>
                  <p className="text-gray-600">{lounge.guestPolicy}</p>
                </div>
                {lounge.paidAccess && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Paid Access</h4>
                      <p className="text-gray-600">{lounge.paidAccess}</p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Access Cards */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-600 to-blue-700 text-white">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <CreditCard className="w-5 h-5 mr-2" />
                  Access with these cards
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {lounge.eligibleCards.map((card: string) => (
                  <div key={card} className="flex items-center justify-between p-3 bg-white/10 rounded-lg backdrop-blur-sm">
                    <span className="font-medium">{card}</span>
                    <Badge variant="secondary" className="bg-white/20 text-white border-0">
                      Eligible
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">{lounge.rating}</div>
                    <div className="text-sm text-gray-600">User Rating</div>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">{lounge.reviews}</div>
                    <div className="text-sm text-gray-600">Reviews</div>
                  </div>
                  <Separator />
                  <div>
                    <div className="text-xl font-bold text-green-600">Open</div>
                    <div className="text-sm text-gray-600">Status</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-3">
              Get Directions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoungePage;
