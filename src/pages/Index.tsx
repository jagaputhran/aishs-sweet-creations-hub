
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, MenuIcon, Heart, User, Phone, Cake, Star } from 'lucide-react';
import Hero from '../components/Hero';
import Menu from '../components/Menu';
import FeaturedOrders from '../components/FeaturedOrders';
import About from '../components/About';
import CustomOrders from '../components/CustomOrders';
import Testimonials from '../components/Testimonials';
import InstagramFeed from '../components/InstagramFeed';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import RecentSweetCreations from '../components/RecentSweetCreations';
import SpecialAnniversaryOrders from '../components/SpecialAnniversaryOrders';

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tabbed Navigation Header */}
        <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-pink-200 shadow-sm">
          <div className="container mx-auto px-4">
            <TabsList className="w-full h-16 bg-transparent p-0 justify-center md:justify-start">
              <TabsTrigger 
                value="home" 
                className="flex items-center gap-2 px-2 md:px-4 py-3 text-xs md:text-base font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-pink-500 data-[state=active]:bg-transparent data-[state=active]:text-pink-600 hover:text-pink-500 transition-all duration-200"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="menu" 
                className="flex items-center gap-2 px-2 md:px-4 py-3 text-xs md:text-base font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-pink-500 data-[state=active]:bg-transparent data-[state=active]:text-pink-600 hover:text-pink-500 transition-all duration-200"
              >
                <MenuIcon className="w-4 h-4" />
                <span className="hidden sm:inline">Menu</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="recent-creations" 
                className="flex items-center gap-2 px-2 md:px-4 py-3 text-xs md:text-base font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-pink-500 data-[state=active]:bg-transparent data-[state=active]:text-pink-600 hover:text-pink-500 transition-all duration-200"
              >
                <Cake className="w-4 h-4" />
                <span className="hidden sm:inline">Recent Creations</span>
                <span className="sm:hidden">Recent</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="anniversary-orders" 
                className="flex items-center gap-2 px-2 md:px-4 py-3 text-xs md:text-base font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-pink-500 data-[state=active]:bg-transparent data-[state=active]:text-pink-600 hover:text-pink-500 transition-all duration-200"
              >
                <Star className="w-4 h-4" />
                <span className="hidden sm:inline">Anniversary Orders</span>
                <span className="sm:hidden">Anniversary</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="custom" 
                className="flex items-center gap-2 px-2 md:px-4 py-3 text-xs md:text-base font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-pink-500 data-[state=active]:bg-transparent data-[state=active]:text-pink-600 hover:text-pink-500 transition-all duration-200"
              >
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">Custom Orders</span>
                <span className="sm:hidden">Custom</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="about" 
                className="flex items-center gap-2 px-2 md:px-4 py-3 text-xs md:text-base font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-pink-500 data-[state=active]:bg-transparent data-[state=active]:text-pink-600 hover:text-pink-500 transition-all duration-200"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">About</span>
              </TabsTrigger>
              
              <TabsTrigger 
                value="contact" 
                className="flex items-center gap-2 px-2 md:px-4 py-3 text-xs md:text-base font-medium rounded-none border-b-2 border-transparent data-[state=active]:border-pink-500 data-[state=active]:bg-transparent data-[state=active]:text-pink-600 hover:text-pink-500 transition-all duration-200"
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
            <Testimonials />
            <InstagramFeed />
          </div>
        </TabsContent>

        <TabsContent value="menu" className="mt-0 focus-visible:outline-none">
          <div className="animate-fade-in">
            <Menu />
          </div>
        </TabsContent>

        <TabsContent value="recent-creations" className="mt-0 focus-visible:outline-none">
          <div className="animate-fade-in">
            <RecentSweetCreations />
          </div>
        </TabsContent>

        <TabsContent value="anniversary-orders" className="mt-0 focus-visible:outline-none">
          <div className="animate-fade-in">
            <SpecialAnniversaryOrders />
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
