
import React from 'react';
import PixelAnimation from './PixelAnimation';
import { Button } from '@/components/ui/button';
import { Sparkles, Zap } from 'lucide-react';

interface PixelHeroProps {
  title?: string;
  subtitle?: string;
  showCTA?: boolean;
}

const PixelHero: React.FC<PixelHeroProps> = ({
  title = "Experience the Future",
  subtitle = "Pixel-perfect animations meet modern design",
  showCTA = true
}) => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Pixel Animation Background */}
      <PixelAnimation 
        pixelCount={150}
        colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff']}
        enableInteraction={true}
        className="opacity-60"
      />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 z-5"></div>
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-5xl mx-auto">
          {/* Animated Title */}
          <div className="mb-12">
            <h1 className="text-7xl md:text-9xl font-black text-white mb-6 tracking-tight leading-tight">
              <span className="inline-block animate-fade-in drop-shadow-2xl">
                {title.split(' ')[0]}
              </span>
              <br />
              <span className="inline-block animate-fade-in bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent drop-shadow-lg" style={{ animationDelay: '0.3s' }}>
                {title.split(' ').slice(1).join(' ')}
              </span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <p className="text-2xl md:text-3xl text-gray-100 mb-16 animate-fade-in leading-relaxed font-medium max-w-3xl mx-auto drop-shadow-lg" style={{ animationDelay: '0.6s' }}>
            {subtitle}
          </p>
          
          {/* CTA Buttons */}
          {showCTA && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <Button 
                size="lg" 
                className="px-12 py-6 text-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 font-semibold"
              >
                <Sparkles className="w-6 h-6 mr-3" />
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-12 py-6 text-xl border-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg"
              >
                <Zap className="w-6 h-6 mr-3" />
                Learn More
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom gradient for smoother transition */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-8"></div>
    </div>
  );
};

export default PixelHero;
