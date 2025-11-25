
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const Menu = () => {
  const categories = [
    {
      name: "Cookies",
      description: "Crispy, chewy, and irresistibly delicious",
      items: [
        { name: "Chocolate Chip Cookies", weight: "100g (10 pieces)", price: "₹400" },
        { name: "Oatmeal Raisin Cookies", weight: "100g (10 pieces)", price: "₹400" },
        { name: "Double Chocolate Cookies", weight: "100g (5 pieces)", price: "₹250" }
      ],
      bgColor: "bg-gradient-to-br from-orange-100 to-yellow-100"
    },
    {
      name: "Brownies",
      description: "Rich, fudgy, and decadently chocolatey",
      items: [
        { name: "Classic Fudge Brownies", weight: "4 pieces", price: "₹320" },
        { name: "Walnut Brownies", weight: "4 pieces", price: "₹350" },
        { name: "Assorted Brownie Box", weight: "6 pieces", price: "₹900" }
      ],
      bgColor: "bg-gradient-to-br from-amber-100 to-orange-100"
    },
    {
      name: "Cupcakes",
      description: "Moist, fluffy, and beautifully decorated",
      items: [
        { name: "Vanilla Bean Cupcakes", weight: "6 pieces", price: "₹300" },
        { name: "Red Velvet Cupcakes", weight: "6 pieces", price: "₹350" },
        { name: "Blueberry cream cheeseCupcakes", weight: "6 pieces", price: "₹450" }
      ],
      bgColor: "bg-gradient-to-br from-pink-100 to-rose-100"
    },
    {
      name: "Artisan Cakes",
      description: "Custom creations for your special moments",
      items: [
        { name: "Birthday Celebration Cake", weight: "1kg", price: "₹1000" },
        { name: "Anniversary Special Cake", weight: "850gm", price: "₹1300" },
        { name: "Custom Theme Cake", weight: "1kg", price: "₹1200" }
      ],
      bgColor: "bg-gradient-to-br from-purple-100 to-pink-100"
    },
    {
      name: "Healthy & Special Dietary Options",
      description: "Delicious treats for everyone - eggless, sugar-free & diabetic-friendly",
      items: [
        { name: "Assorted Whole Wheat Brownie Box", quantity: "600g - 6 pcs", price: "₹900" },
        { name: "Classic Butter Cookies Whole Wheat", quantity: "200g - 12 pcs", price: "300" },
        { name: "Whole Wheat Oats & Nuts", quantity: "400g - 10 pcs", price: "₹800" },
        { name: "Classic Choco chunk cookies", quantity: "340g - 5 pcs", price: "₹300" },
        { name: "Whole Wheat Choco Chunk Cookies", quantity: "520g - 10 pcs", price: "₹800" }
      ],
      bgColor: "bg-gradient-to-br from-green-100 to-emerald-100"
    }
  ];

  return (
    <section id="menu" className="py-20 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-5xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Our Sweet Menu
          </motion.h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-500 mx-auto mb-4 rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          />
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Every bite tells a story of passion, quality, and the joy of homemade goodness
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
              className={category.name === "Healthy & Special Dietary Options" ? "md:col-span-2" : ""}
            >
              <Card className={`${category.bgColor} border-0 shadow-lg transition-all duration-300 group overflow-hidden`}>
                <motion.div
                  whileHover={{ 
                    y: -8,
                    rotateY: 5,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <CardContent className="p-8">
                    <motion.h3 
                      className="text-3xl font-bold text-gray-800 mb-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      viewport={{ once: true }}
                    >
                      {category.name}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 mb-6 text-lg italic"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                      viewport={{ once: true }}
                    >
                      {category.description}
                    </motion.p>
                
                    <div className={`space-y-4 ${category.name === "Healthy & Special Dietary Options" ? "grid md:grid-cols-2 md:gap-4 md:space-y-0" : ""}`}>
                      {category.items.map((item, itemIndex) => (
                        <motion.div 
                          key={itemIndex} 
                          className="flex justify-between items-center bg-white/70 rounded-lg p-4 backdrop-blur-sm group-hover:bg-white/90 transition-all duration-300"
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.1 + itemIndex * 0.05 + 0.4 
                          }}
                          whileHover={{ 
                            scale: 1.02,
                            backgroundColor: "rgba(255, 255, 255, 0.95)"
                          }}
                          viewport={{ once: true }}
                        >
                          <div>
                            <h4 className="font-semibold text-gray-800 text-lg">{item.name}</h4>
                            <p className="text-gray-600">{item.weight}</p>
                          </div>
                          <motion.div 
                            className="text-2xl font-bold text-rose-600"
                            whileHover={{ scale: 1.1 }}
                            transition={{ type: "spring", stiffness: 400 }}
                          >
                            {item.price}
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </motion.div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            All prices are indicative. Custom orders and bulk discounts available!
          </p>
          <p className="text-gray-600 text-sm mt-2">
            🌱 Vegetarian • 🍃 Eggless • 🍯 Sugar-Free Options Available
          </p>
        </div>
      </div>
    </section>
  );
};

export default Menu;
