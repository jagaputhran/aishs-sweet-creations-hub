
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const RecentSweetCreations = () => {
  const recentCreations = [
    {
      id: 1,
      customer: "Sarah M.",
      item: "Heart-Shaped Brownie + Cookie Tins",
      image: "/placeholder.svg",
      description: "Handcrafted with love, delivered with joy - see what our happy customers received 🧁"
    },
    {
      id: 2,
      customer: "Priya S.",
      item: "Assorted Brownie Box",
      image: "/placeholder.svg",
      description: "Rich, fudgy brownies in beautiful packaging"
    },
    {
      id: 3,
      customer: "Amit L.",
      item: "Eggless Cookies",
      image: "/placeholder.svg",
      description: "Crispy, delicious eggless cookies made with care"
    },
    {
      id: 4,
      customer: "Neha R.",
      item: "Chocolate Cupcakes",
      image: "/placeholder.svg",
      description: "Moist chocolate cupcakes with creamy frosting"
    },
    {
      id: 5,
      customer: "Ravi K.",
      item: "Custom Birthday Cake",
      image: "/placeholder.svg",
      description: "Personalized birthday celebration cake"
    },
    {
      id: 6,
      customer: "Meera J.",
      item: "Valentine's Special Box",
      image: "/placeholder.svg",
      description: "Love-themed treats for special occasions"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4 font-serif">
            Recent Sweet Creations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto italic">
            Handcrafted with love, delivered with joy - see what our happy customers received 🧁
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {recentCreations.map((creation) => (
            <Card key={creation.id} className="bg-white/90 backdrop-blur-sm shadow-xl border border-pink-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src={creation.image} 
                  alt={creation.item}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  New
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{creation.item}</h3>
                <p className="text-gray-600 mb-3">{creation.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-pink-600 font-semibold">For {creation.customer}</span>
                  <span className="text-rose-600 font-bold">✨ Delivered</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 italic text-lg">
            🍰 Every creation tells a story of celebration and joy
          </p>
        </div>
      </div>
    </section>
  );
};

export default RecentSweetCreations;
