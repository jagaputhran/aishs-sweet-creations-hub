
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onSweetTreatsClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSweetTreatsClick }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-cream to-pink-100 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-pink-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-32 w-40 h-40 bg-orange-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-yellow-200 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Brand name */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-500 to-orange-400 animate-fade-in">
            Dunkin Delicacies
          </h1>
          
          {/* Subtitle */}
          <p className="text-2xl md:text-3xl text-gray-700 mb-4 font-light italic">
            By AISH
          </p>
          
          {/* Slogan */}
          <h2 className="text-2xl md:text-4xl font-semibold mb-8 text-gray-800 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Crafted with Love, Baked to Delight
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
            Indulge in artisan cookies, heavenly brownies, delicate cupcakes, and custom celebration cakes made with the finest ingredients and boundless passion.
          </p>
          
          {/* CTA Button */}
          <Button 
            onClick={onSweetTreatsClick}
            size="lg" 
            className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-fade-in"
            style={{ animationDelay: '0.6s' }}
          >
            Explore Sweet Treats
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-gray-500" />
      </div>
    </section>
  );
};

export default Hero;
