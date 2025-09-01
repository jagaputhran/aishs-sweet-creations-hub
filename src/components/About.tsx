
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Award, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.h2 
              className="text-5xl font-bold text-gray-800 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Meet the Baker
            </motion.h2>
            <motion.div 
              className="w-32 h-32 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full mx-auto mb-8 flex items-center justify-center cursor-pointer"
              initial={{ opacity: 0, scale: 0, rotate: -180 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4,
                type: "spring",
                stiffness: 200
              }}
              whileHover={{ 
                scale: 1.1, 
                rotate: [0, -10, 10, -10, 0],
                transition: { duration: 0.5 }
              }}
              viewport={{ once: true }}
            >
              <span className="text-4xl font-bold text-white">A</span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50, rotateX: -10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
              <motion.div
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(0,0,0,0.1)"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <CardContent className="p-12">
                  <motion.h3 
                    className="text-3xl font-bold text-gray-800 mb-6 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    Hi, I'm Aishwarya! 👋
                  </motion.h3>
              
                  <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed">
                    <motion.p 
                      className="text-xl mb-6"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      Welcome to my little corner of sweetness! What started as a passion for baking in my home kitchen has blossomed into Dunkin Delicacies, where every treat is crafted with love and attention to detail.
                    </motion.p>
                    
                    <motion.p 
                      className="text-lg mb-6"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      I believe that the best baked goods come from the heart. Using only the finest ingredients and time-honored techniques, I create each cookie, brownie, cupcake, and cake as if it were for my own family. Because in a way, every customer becomes part of our sweet family.
                    </motion.p>
                    
                    <motion.p 
                      className="text-lg mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.0 }}
                      viewport={{ once: true }}
                    >
                      From celebrating life's precious moments with custom cakes to bringing smiles with everyday treats, I'm here to add sweetness to your special occasions and ordinary days alike.
                    </motion.p>
                  </div>

                  <div className="grid md:grid-cols-3 gap-8 mt-12">
                    {[
                      { icon: Heart, bg: "bg-pink-100", color: "text-rose-500", title: "Made with Love", desc: "Every recipe is perfected with care and passion" },
                      { icon: Award, bg: "bg-yellow-100", color: "text-yellow-600", title: "Premium Quality", desc: "Only the finest ingredients make it into our treats" },
                      { icon: Clock, bg: "bg-green-100", color: "text-green-600", title: "Fresh Daily", desc: "Baked fresh to order, ensuring perfect taste and texture" }
                    ].map((feature, index) => (
                      <motion.div 
                        key={index}
                        className="text-center"
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <motion.div 
                          className={`${feature.bg} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer`}
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: 360,
                            transition: { duration: 0.6 }
                          }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <feature.icon className={`w-8 h-8 ${feature.color}`} />
                        </motion.div>
                        <motion.h4 
                          className="font-semibold text-gray-800 mb-2"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {feature.title}
                        </motion.h4>
                        <motion.p 
                          className="text-gray-600"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {feature.desc}
                        </motion.p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
