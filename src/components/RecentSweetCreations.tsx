
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
