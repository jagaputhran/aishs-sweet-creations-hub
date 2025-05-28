
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SpecialAnniversaryOrders = () => {
  const anniversaryOrders = [
    {
      orderId: "AN001",
      customer: "Rajesh & Meera K.",
      anniversary: "25th Wedding Anniversary",
      item: "Golden Anniversary Cake",
      size: "2kg",
      status: "Completed",
      amount: "₹2,500",
      date: "2024-05-20"
    },
    {
      orderId: "AN002",
      customer: "Sharma Family",
      anniversary: "50th Wedding Anniversary",
      item: "Golden Jubilee Special Cake",
      size: "3kg",
      status: "Delivered",
      amount: "₹3,800",
      date: "2024-05-22"
    },
    {
      orderId: "AN003",
      customer: "Ravi & Sunita",
      anniversary: "10th Wedding Anniversary",
      item: "Romantic Red Velvet Cake",
      size: "1.5kg",
      status: "In Progress",
      amount: "₹1,800",
      date: "2024-05-30"
    },
    {
      orderId: "AN004",
      customer: "Gupta Family",
      anniversary: "1st Wedding Anniversary",
      item: "Elegant Vanilla Bean Cake",
      size: "1kg",
      status: "Confirmed",
      amount: "₹1,200",
      date: "2024-06-01"
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
            Celebrating love stories with custom anniversary creations
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-purple-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-purple-100 to-pink-100 border-purple-200">
                  <TableHead className="font-semibold text-gray-700 text-center">Order ID</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center">Customer</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center">Anniversary</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center">Special Item</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center">Size</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center">Amount</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {anniversaryOrders.map((order, index) => (
                  <TableRow key={order.orderId} className="hover:bg-purple-50/50 transition-colors">
                    <TableCell className="font-medium text-purple-600 text-center">{order.orderId}</TableCell>
                    <TableCell className="text-gray-700 text-center font-medium">{order.customer}</TableCell>
                    <TableCell className="text-gray-700 text-center">{order.anniversary}</TableCell>
                    <TableCell className="text-gray-700 text-center font-medium">{order.item}</TableCell>
                    <TableCell className="text-gray-600 text-center">{order.size}</TableCell>
                    <TableCell className="text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Completed' || order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Confirmed' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="font-bold text-purple-600 text-center">{order.amount}</TableCell>
                    <TableCell className="text-gray-600 text-center">{order.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 italic">
              💕 Celebrating milestones with sweetness and love
            </p>
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
        </div>
      </div>
    </section>
  );
};

export default SpecialAnniversaryOrders;
