
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Menu = () => {
  const categories = [
    {
      name: "Cookies",
      description: "Crispy, chewy, and irresistibly delicious",
      items: [
        { name: "Chocolate Chip Cookies", weight: "100g (6 pieces)", price: "₹150" },
        { name: "Oatmeal Raisin Cookies", weight: "100g (6 pieces)", price: "₹160" },
        { name: "Double Chocolate Cookies", weight: "100g (5 pieces)", price: "₹180" }
      ],
      bgColor: "bg-gradient-to-br from-orange-100 to-yellow-100"
    },
    {
      name: "Brownies",
      description: "Rich, fudgy, and decadently chocolatey",
      items: [
        { name: "Classic Fudge Brownies", weight: "4 pieces", price: "₹200" },
        { name: "Walnut Brownies", weight: "4 pieces", price: "₹250" },
        { name: "Salted Caramel Brownies", weight: "4 pieces", price: "₹280" }
      ],
      bgColor: "bg-gradient-to-br from-amber-100 to-orange-100"
    },
    {
      name: "Cupcakes",
      description: "Moist, fluffy, and beautifully decorated",
      items: [
        { name: "Vanilla Bean Cupcakes", weight: "6 pieces", price: "₹300" },
        { name: "Red Velvet Cupcakes", weight: "6 pieces", price: "₹350" },
        { name: "Lemon Blueberry Cupcakes", weight: "6 pieces", price: "₹320" }
      ],
      bgColor: "bg-gradient-to-br from-pink-100 to-rose-100"
    },
    {
      name: "Artisan Cakes",
      description: "Custom creations for your special moments",
      items: [
        { name: "Birthday Celebration Cake", weight: "1kg", price: "₹800" },
        { name: "Anniversary Special Cake", weight: "1.5kg", price: "₹1200" },
        { name: "Custom Theme Cake", weight: "2kg", price: "₹1500" }
      ],
      bgColor: "bg-gradient-to-br from-purple-100 to-pink-100"
    }
  ];

  return (
    <section id="menu" className="py-20 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Our Sweet Menu</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Every bite tells a story of passion, quality, and the joy of homemade goodness
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <Card key={category.name} className={`${category.bgColor} border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2`}>
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-gray-800 mb-3">{category.name}</h3>
                <p className="text-gray-600 mb-6 text-lg italic">{category.description}</p>
                
                <div className="space-y-4">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center bg-white/70 rounded-lg p-4 backdrop-blur-sm">
                      <div>
                        <h4 className="font-semibold text-gray-800 text-lg">{item.name}</h4>
                        <p className="text-gray-600">{item.weight}</p>
                      </div>
                      <div className="text-2xl font-bold text-rose-600">{item.price}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            All prices are indicative. Custom orders and bulk discounts available!
          </p>
        </div>
      </div>
    </section>
  );
};

export default Menu;
