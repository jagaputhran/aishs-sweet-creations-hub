import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Home, MenuIcon, Heart, User, Phone } from 'lucide-react';
import Hero from '../components/Hero';
import Menu from '../components/Menu';
import FeaturedOrders from '../components/FeaturedOrders';
import About from '../components/About';
import CustomOrders from '../components/CustomOrders';
import Testimonials from '../components/Testimonials';
import InstagramFeed from '../components/InstagramFeed';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  // Sample data for order summary table
  const recentOrders = [
    {
      orderId: "DD001",
      customer: "Sarah M.",
      item: "Heart-Shaped Brownie + Cookie Tins",
      quantity: "1 Brownie + 5 Tins",
      status: "Delivered",
      amount: "₹1,200"
    },
    {
      orderId: "DD002",
      customer: "Rajesh K.",
      item: "Custom Birthday Cake",
      quantity: "1 Cake (1.5kg)",
      status: "In Progress",
      amount: "₹1,500"
    },
    {
      orderId: "DD003",
      customer: "Priya S.",
      item: "Assorted Brownie Box",
      quantity: "2 Boxes",
      status: "Ready",
      amount: "₹800"
    },
    {
      orderId: "DD004",
      customer: "Amit L.",
      item: "Eggless Cookies",
      quantity: "3 Tins",
      status: "Delivered",
      amount: "₹450"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tabbed Navigation Header */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-pink-200 shadow-sm">
          <div className="container mx-auto px-4">
            <TabsList className="w-full h-16 bg-transparent p-0 justify-center md:justify-start">
              <TabsTrigger 
                value="home" 
                className="flex items-center gap-2 px-4 md:px-6 py-3 text-sm md:text-base font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-pink-500 data-[state=active]:bg-transparent data-[state=active]:text-pink-600 hover:text-pink-500 transition-all duration-200"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="menu" 
                className="flex items-center gap-2 px-4 md:px-6 py-3 text-sm md:text-base font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-pink-500 data-[state=active]:bg-transparent data-[state=active]:text-pink-600 hover:text-pink-500 transition-all duration-200"
              >
                <MenuIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Menu</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="custom" 
                className="flex items-center gap-2 px-4 md:px-6 py-3 text-sm md:text-base font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-pink-500 data-[state=active]:bg-transparent data-[state=active]:text-pink-600 hover:text-pink-500 transition-all duration-200"
              >
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Custom Orders</span>
                <span className="sm:hidden">Custom</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="about" 
                className="flex items-center gap-2 px-4 md:px-6 py-3 text-sm md:text-base font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-pink-500 data-[state=active]:bg-transparent data-[state=active]:text-pink-600 hover:text-pink-500 transition-all duration-200"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">About</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="contact" 
                className="flex items-center gap-2 px-4 md:px-6 py-3 text-sm md:text-base font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-pink-500 data-[state=active]:bg-transparent data-[state=active]:text-pink-600 hover:text-pink-500 transition-all duration-200"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">Contact</span>
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Tab Content Sections */}
        <TabsContent value="home" className="mt-0 focus-visible:outline-none">
          <div className="animate-fade-in">
            <Hero />
            <FeaturedOrders />
            
            {/* Recent Orders Table Section */}
            <section className="py-16 bg-gradient-to-b from-pink-50 to-cream">
              <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                  <h2 className="text-4xl font-bold text-gray-800 mb-4 font-serif">
                    Recent Order Activity
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto italic">
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
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentOrders.map((order, index) => (
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
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="text-center mt-8">
                    <p className="text-gray-600 italic">
                      💝 Every order tells a story of celebration and joy
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <Testimonials />
            <InstagramFeed />
          </div>
        </TabsContent>

        <TabsContent value="menu" className="mt-0 focus-visible:outline-none">
          <div className="animate-fade-in">
            <Menu />
          </div>
        </TabsContent>

        <TabsContent value="custom" className="mt-0 focus-visible:outline-none">
          <div className="animate-fade-in">
            <CustomOrders />
          </div>
        </TabsContent>

        <TabsContent value="about" className="mt-0 focus-visible:outline-none">
          <div className="animate-fade-in">
            <About />
          </div>
        </TabsContent>

        <TabsContent value="contact" className="mt-0 focus-visible:outline-none">
          <div className="animate-fade-in">
            <Contact />
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer appears on all tabs */}
      <Footer />
    </div>
  );
};

export default Index;
