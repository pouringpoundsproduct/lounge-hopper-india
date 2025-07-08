
import React from 'react';
import PixelAnimation from './PixelAnimation';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap, Plane, MapPin, CreditCard } from 'lucide-react';

interface PixelHeroProps {
  title?: string;
  subtitle?: string;
  showCTA?: boolean;
}

const PixelHero: React.FC<PixelHeroProps> = ({
  title = "Beat the queue.",
  subtitle = "Check your lounge eligibility on Lounge Finder.",
  showCTA = true
}) => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50 overflow-hidden">
      {/* Subtle Travel-Themed Background Animation */}
      <PixelAnimation 
        pixelCount={60}
        colors={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4']}
        enableInteraction={true}
        className="opacity-30"
      />
      
      {/* Animated Background Elements - Matching Original Design */}
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
      
      {/* Content - Using Original Design System */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-5xl mx-auto">
          {/* Hero Title - Matching Original Style */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mb-6 shadow-lg">
              <Plane className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {title.split('.')[0]}.
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text text-transparent">
                {subtitle}
              </span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Find out which airport lounges you can access with your credit card, 
            or discover the best cards for your destination.
          </p>
          
          {/* CTA Buttons - Original Style */}
          {showCTA && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <Button 
                size="lg" 
                className="px-12 py-6 text-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                <CreditCard className="w-6 h-6 mr-3" />
                Find My Lounges
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-12 py-6 text-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
              >
                <MapPin className="w-6 h-6 mr-3" />
                Browse Locations
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom gradient for smoother transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-50 via-blue-50/80 to-transparent z-8"></div>
    </div>
  );
};

export default PixelHero;
