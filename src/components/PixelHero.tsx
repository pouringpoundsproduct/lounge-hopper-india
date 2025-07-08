
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
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Pixel Animation Background */}
      <PixelAnimation 
        pixelCount={80}
        colors={['#3b82f6', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#f97316', '#06b6d4']}
        enableInteraction={true}
        className="opacity-70"
      />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Animated Title */}
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
              <span className="inline-block animate-fade-in bg-gradient-to-r from-blue-400 via-purple-400 to-amber-400 bg-clip-text text-transparent">
                {title.split(' ')[0]}
              </span>
              <br />
              <span className="inline-block animate-fade-in bg-gradient-to-r from-amber-400 via-pink-400 to-blue-400 bg-clip-text text-transparent" style={{ animationDelay: '0.3s' }}>
                {title.split(' ').slice(1).join(' ')}
              </span>
            </h1>
          </div>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 animate-fade-in leading-relaxed" style={{ animationDelay: '0.6s' }}>
            {subtitle}
          </p>
          
          {/* CTA Buttons */}
          {showCTA && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.9s' }}>
              <Button 
                size="lg" 
                className="px-8 py-4 text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-8 py-4 text-lg border-2 border-white/20 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform hover:scale-105"
              >
                <Zap className="w-5 h-5 mr-2" />
                Learn More
              </Button>
            </div>
          )}
          
          {/* Floating Elements */}
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-amber-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
      
      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent z-5"></div>
    </div>
  );
};

export default PixelHero;
