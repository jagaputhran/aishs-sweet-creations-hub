
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const SpecialAnniversaryOrders = () => {
  const anniversaryOrders = [
    {
      id: 1,
      customer: "Rajesh & Meera K.",
      anniversary: "25th Wedding Anniversary",
      item: "Golden Anniversary Cake",
      image: "/placeholder.svg",
      description: "Elegant golden-themed cake celebrating 25 years of love"
    },
    {
      id: 2,
      customer: "Sharma Family",
      anniversary: "50th Wedding Anniversary",
      item: "Golden Jubilee Special Cake",
      image: "/placeholder.svg",
      description: "Magnificent celebration cake for golden jubilee"
    },
    {
      id: 3,
      customer: "Ravi & Sunita",
      anniversary: "10th Wedding Anniversary",
      item: "Romantic Red Velvet Cake",
      image: "/placeholder.svg",
      description: "Beautiful red velvet cake with romantic decorations"
    },
    {
      id: 4,
      customer: "Gupta Family",
      anniversary: "1st Wedding Anniversary",
      item: "Elegant Vanilla Bean Cake",
      image: "/placeholder.svg",
      description: "Classic vanilla cake for first anniversary celebration"
    },
    {
      id: 5,
      customer: "Kumar & Priya",
      anniversary: "15th Wedding Anniversary",
      item: "Crystal Anniversary Cake",
      image: "/placeholder.svg",
      description: "Sparkling cake design for crystal anniversary"
    },
    {
      id: 6,
      customer: "Agarwal Family",
      anniversary: "30th Wedding Anniversary",
      item: "Pearl Anniversary Special",
      image: "/placeholder.svg",
      description: "Pearl-themed elegant anniversary cake"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-pink-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4 font-serif">
            Special Anniversary Orders
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto italic">
            Celebrating love stories with custom anniversary creations 💕
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {anniversaryOrders.map((order) => (
            <Card key={order.id} className="bg-white/90 backdrop-blur-sm shadow-xl border border-purple-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative">
                <img 
                  src={order.image} 
                  alt={order.item}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Anniversary
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{order.item}</h3>
                <p className="text-purple-600 font-semibold mb-2">{order.anniversary}</p>
                <p className="text-gray-600 mb-3">{order.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-purple-600 font-semibold">For {order.customer}</span>
                  <span className="text-rose-600 font-bold">💕 Special</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Anniversary Features */}
        <div className="grid md:grid-cols-2 gap-8 mt-16">
          <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Anniversary Specialties</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Custom photo cakes with edible prints</li>
                <li>• Golden/Silver themed decorations</li>
                <li>• Personalized anniversary messages</li>
                <li>• Multi-tier celebration cakes</li>
                <li>• Vintage-style fondant work</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-rose-100 to-pink-100 border-0 shadow-lg">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Popular Anniversary Flavors</h3>
              <ul className="space-y-3 text-gray-700">
                <li>• Classic Vanilla Bean (timeless elegance)</li>
                <li>• Rich Red Velvet (romantic choice)</li>
                <li>• Chocolate Truffle (indulgent celebration)</li>
                <li>• Strawberry Delight (sweet memories)</li>
                <li>• Coffee Caramel (sophisticated taste)</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 italic text-lg">
            💕 Celebrating milestones with sweetness and love
          </p>
        </div>
      </div>
    </section>
  );
};

export default SpecialAnniversaryOrders;
