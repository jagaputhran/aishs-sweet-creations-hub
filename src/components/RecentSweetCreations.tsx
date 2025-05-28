
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const RecentSweetCreations = () => {
  const recentCreations = [
    {
      orderId: "DD001",
      customer: "Sarah M.",
      item: "Heart-Shaped Brownie + Cookie Tins",
      quantity: "1 Brownie + 5 Tins",
      status: "Delivered",
      amount: "₹1,200",
      date: "2024-05-25"
    },
    {
      orderId: "DD003",
      customer: "Priya S.",
      item: "Assorted Brownie Box",
      quantity: "2 Boxes",
      status: "Ready",
      amount: "₹800",
      date: "2024-05-26"
    },
    {
      orderId: "DD004",
      customer: "Amit L.",
      item: "Eggless Cookies",
      quantity: "3 Tins",
      status: "Delivered",
      amount: "₹450",
      date: "2024-05-27"
    },
    {
      orderId: "DD005",
      customer: "Neha R.",
      item: "Chocolate Cupcakes",
      quantity: "12 pieces",
      status: "In Progress",
      amount: "₹600",
      date: "2024-05-28"
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
            A glimpse into our daily creations and happy customers
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-200 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gradient-to-r from-pink-100 to-rose-100 border-pink-200">
                  <TableHead className="font-semibold text-gray-700 text-center">Order ID</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center">Customer</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center">Item</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center">Quantity</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center">Amount</TableHead>
                  <TableHead className="font-semibold text-gray-700 text-center">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCreations.map((order, index) => (
                  <TableRow key={order.orderId} className="hover:bg-pink-50/50 transition-colors">
                    <TableCell className="font-medium text-pink-600 text-center">{order.orderId}</TableCell>
                    <TableCell className="text-gray-700 text-center">{order.customer}</TableCell>
                    <TableCell className="text-gray-700 text-center font-medium">{order.item}</TableCell>
                    <TableCell className="text-gray-600 text-center">{order.quantity}</TableCell>
                    <TableCell className="text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        order.status === 'Ready' ? 'bg-blue-100 text-blue-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell className="font-bold text-rose-600 text-center">{order.amount}</TableCell>
                    <TableCell className="text-gray-600 text-center">{order.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 italic">
              🍰 Every creation tells a story of celebration and joy
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RecentSweetCreations;
