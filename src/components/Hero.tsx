import React, { useEffect, useRef, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Lazy load 3D component for better performance
const BakeryScene3D = React.lazy(() => import('./BakeryScene3D'));

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const scrollToMenu = () => {
    document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // GSAP entrance animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(titleRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 1,
        ease: 'power3.out'
      })
      .from(subtitleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out'
      }, '-=0.5')
      .from(ctaRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.6,
        ease: 'back.out(1.7)'
      }, '-=0.4');

      // Scroll-triggered animations
      gsap.to(heroRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
        opacity: 0.8,
        y: -100,
        scale: 0.95,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-cream to-pink-100 overflow-hidden"
    >
      {/* Floating sparkles background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [-100, window.innerHeight + 100],
              x: Math.random() * window.innerWidth
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          >
            <Sparkles className="w-4 h-4 text-yellow-400 opacity-60" />
          </motion.div>
        ))}
      </div>

      {/* Decorative background elements with parallax */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute top-20 left-20 w-32 h-32 bg-pink-300 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-40 right-32 w-40 h-40 bg-orange-200 rounded-full blur-3xl"
          animate={{
            y: [0, 15, 0],
            x: [0, -10, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-yellow-200 rounded-full blur-2xl"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* 3D Bakery Scene - More Visible */}
      <div className="absolute inset-0 z-0 opacity-90">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-pulse text-pink-300">Loading 3D Scene...</div>
          </div>
        }>
          <BakeryScene3D />
        </Suspense>
      </div>

      <motion.div 
        className="container mx-auto px-6 text-center relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-4xl mx-auto backdrop-blur-sm bg-white/30 rounded-3xl p-8 shadow-2xl">
          {/* Brand name with playful entrance */}
          <h1 
            ref={titleRef}
            className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-500 to-orange-400 drop-shadow-lg"
          >
            Dunkin Delicacies
          </h1>
          
          {/* Subtitle with sparkle effect */}
          <div
            ref={subtitleRef}
            className="relative inline-block"
          >
            <p className="text-2xl md:text-3xl text-gray-800 mb-4 font-light italic drop-shadow">
              By AISH
            </p>
            <motion.div
              className="absolute -top-2 -right-2"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-yellow-400 drop-shadow-lg" />
            </motion.div>
          </div>
          
          {/* Slogan */}
          <h2 className="text-2xl md:text-4xl font-semibold mb-8 text-gray-900 drop-shadow">
            Crafted with Love, Baked to Delight
          </h2>
          
          {/* Description */}
          <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed drop-shadow-sm">
            Indulge in artisan cookies, heavenly brownies, delicate cupcakes, and custom celebration cakes made with the finest ingredients and boundless passion.
          </p>
          
          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Button 
                onClick={scrollToMenu}
                size="lg" 
                className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-pink-300/50 transition-all duration-300"
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Recipes
                </motion.span>
              </Button>
            </motion.div>
            
            <Button 
              onClick={() => document.getElementById('orders')?.scrollIntoView({ behavior: 'smooth' })}
              size="lg" 
              variant="outline"
              className="border-2 border-pink-400 text-pink-600 hover:bg-pink-50 px-8 py-4 text-lg font-semibold rounded-full shadow-lg backdrop-blur-sm bg-white/50 transition-all duration-300"
            >
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Baking
              </motion.span>
            </Button>
          </div>
        </div>
      </motion.div>
      
      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ 
          opacity: 1, 
          y: [0, 10, 0]
        }}
        transition={{ 
          duration: 0.5,
          delay: 1,
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <ChevronDown className="w-8 h-8 text-gray-500" />
      </motion.div>
    </section>
  );
};

export default Hero;
