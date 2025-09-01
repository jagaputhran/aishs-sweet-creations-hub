
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturedOrders = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-cream">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-5xl font-bold text-gray-800 mb-4 font-serif"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Recent Sweet Creations
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto italic"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Handcrafted with love, delivered with joy - see what our happy customers received
          </motion.p>
        </motion.div>

        {/* Gourmet Brownie Box Showcase */}
        <motion.div 
          className="max-w-6xl mx-auto mb-16"
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-0 shadow-xl overflow-hidden">
            <motion.div
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <CardContent className="p-8">
              <div className="space-y-8">
                {/* Brownie Box Image - Maintaining horizontal aspect ratio */}
                <motion.div 
                  className="relative w-full"
                  initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="relative overflow-hidden rounded-2xl shadow-2xl"
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                      z: 50
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <img 
                      src="/lovable-uploads/3cdf0e1d-f4bb-462c-806f-e0fed4349594.png" 
                      alt="Box of 6 assorted gourmet brownies with rich toppings"
                      className="w-full h-auto object-contain"
                      style={{ aspectRatio: 'auto' }}
                    />
                    <motion.div 
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Heart className="w-6 h-6 text-amber-600 fill-amber-600" />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Order Details */}
                <div className="max-w-4xl mx-auto">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-amber-200">
                    <h3 className="text-3xl font-bold text-gray-800 mb-6 font-serif text-center">
                      🧁 Order Details
                    </h3>
                    
                    <div className="space-y-4 text-gray-700">
                      <div className="flex items-start gap-3">
                        <span className="text-pink-500 text-xl">💝</span>
                        <span className="font-medium text-lg">Whole Wheat Heart-Shaped Eggless Brownie</span>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <span className="text-orange-500 text-xl">🍪</span>
                        <span className="font-medium text-lg">5 Tins of Cookies + 2 Assorted Brownie Boxes</span>
                      </div>
                      
                      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200">
                        <p className="font-semibold text-gray-800 mb-2">
                          ✨ Price inclusive of toppings:
                        </p>
                        <p className="text-gray-700">
                          Cashews, Almonds, Hazelnuts, Chocochips, Golden Sprinkles
                        </p>
                      </div>
                      
                      <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                        <p className="font-semibold text-gray-800 mb-2">
                          🍫 Flavours used:
                        </p>
                        <p className="text-gray-700">
                          Nutella, Dark & White Chocolate, Biscoff
                        </p>
                      </div>
                      
                      <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border border-yellow-200 text-center">
                        <p className="text-xl font-serif italic text-gray-800">
                          💛 Crafted with love at Dunkin Delicacies – By AISH
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </CardContent>
            </motion.div>
          </Card>
        </motion.div>

        {/* Original Anniversary Order */}
        <motion.div 
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 50, rotateX: -10 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <Card className="bg-gradient-to-br from-pink-50 to-rose-100 border-0 shadow-xl overflow-hidden">
            <motion.div
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
            <CardContent className="p-0">
              <div className="grid lg:grid-cols-2 gap-0">
                {/* Images Section */}
                <div className="p-8 space-y-6">
                  <motion.div 
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg group"
                    initial={{ opacity: 0, x: -30, rotateY: -15 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: 5,
                      z: 50
                    }}
                    viewport={{ once: true }}
                  >
                    <img 
                      src="/lovable-uploads/50c65959-72a2-4c1a-9d8f-959c48af0709.png" 
                      alt="Heart-shaped anniversary brownie cake with decorative toppings"
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                    />
                    <motion.div 
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2"
                      whileHover={{ scale: 1.2, rotate: 15 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                    </motion.div>
                  </motion.div>
                  
                  <motion.div 
                    className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg group"
                    initial={{ opacity: 0, x: -30, rotateY: 15 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    whileHover={{ 
                      scale: 1.05,
                      rotateY: -5,
                      z: 50
                    }}
                    viewport={{ once: true }}
                  >
                    <img 
                      src="/lovable-uploads/db3bbadf-488d-4dee-bd9b-2d7260fa935d.png" 
                      alt="Collection of cookie tins and brownie boxes with Dunkin Delicacies branding"
                      className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                    />
                    <motion.div 
                      className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1"
                      whileHover={{ scale: 1.1, y: -2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm font-semibold text-gray-800">Premium</span>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>

                {/* Order Details Section */}
                <div className="p-8 flex flex-col justify-center bg-gradient-to-br from-cream to-pink-50">
                  <div className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-3xl font-bold text-gray-800 mb-2 font-serif">
                        🧁 Special Anniversary Order
                      </h3>
                      <div className="w-20 h-1 bg-gradient-to-r from-pink-300 to-rose-400 mx-auto rounded-full"></div>
                    </div>

                    <div className="bg-white/70 rounded-2xl p-6 backdrop-blur-sm shadow-lg border border-pink-200">
                      <h4 className="text-2xl font-semibold text-gray-800 mb-4 font-serif">
                        Order Details:
                      </h4>
                      
                      <div className="space-y-3 text-gray-700">
                        <div className="flex items-start gap-3">
                          <span className="text-pink-500 text-xl">💝</span>
                          <span className="font-medium">Whole Wheat Heart-Shaped Eggless Brownie</span>
                        </div>
                        
                        <div className="flex items-start gap-3">
                          <span className="text-orange-500 text-xl">🍪</span>
                          <span className="font-medium">5 Tins of Cookies + 2 Assorted Brownie Boxes</span>
                        </div>
                        
                        <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-200">
                          <p className="font-semibold text-gray-800 mb-2">
                            ✨ Premium Toppings Included:
                          </p>
                          <p className="text-sm text-gray-700">
                            Cashews, Almonds, Hazelnuts, Chocochips, Golden Sprinkles
                          </p>
                        </div>
                        
                        <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-200">
                          <p className="font-semibold text-gray-800 mb-2">
                            🍫 Gourmet Flavours:
                          </p>
                          <p className="text-sm text-gray-700">
                            Nutella, Dark & White Chocolate, Biscoff
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-200">
                        <span className="text-sm text-gray-600 italic">Crafted with love in our home kitchen</span>
                        <Heart className="w-4 h-4 text-pink-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            </motion.div>
          </Card>
        </motion.div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg italic font-light">
            "Every order is a canvas for our passion, every bite a moment of pure joy"
          </p>
          <div className="flex justify-center items-center gap-2 mt-4">
            <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
            <div className="w-1 h-1 bg-pink-400 rounded-full"></div>
            <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedOrders;
