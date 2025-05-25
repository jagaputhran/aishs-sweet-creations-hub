
import React from 'react';
import Hero from '../components/Hero';
import Menu from '../components/Menu';
import About from '../components/About';
import CustomOrders from '../components/CustomOrders';
import Testimonials from '../components/Testimonials';
import InstagramFeed from '../components/InstagramFeed';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      <Hero />
      <Menu />
      <About />
      <CustomOrders />
      <Testimonials />
      <InstagramFeed />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
