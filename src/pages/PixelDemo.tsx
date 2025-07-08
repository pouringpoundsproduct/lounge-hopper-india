
import React from 'react';
import PixelHero from '@/components/PixelHero';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PixelDemo = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-50">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/')}
          className="text-white hover:bg-white/10 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Lounge Finder
        </Button>
      </div>
      
      {/* Pixel Animation Hero */}
      <PixelHero 
        title="Pixel Magic"
        subtitle="Interactive pixel animations inspired by modern design trends"
        showCTA={true}
      />
      
      {/* Demo Content */}
      <div className="bg-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-8">
            Ready to Integrate?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            This pixel animation component is ready to be integrated into your existing design without breaking anything.
          </p>
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Interactive mouse effects</li>
                <li>• Customizable colors and pixel count</li>
                <li>• Smooth animations with 60fps</li>
                <li>• Responsive design</li>
                <li>• Zero impact on existing code</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Integration</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Drop-in component</li>
                <li>• Configurable props</li>
                <li>• Works as background or overlay</li>
                <li>• TypeScript support</li>
                <li>• Performance optimized</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixelDemo;
