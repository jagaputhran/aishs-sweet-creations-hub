import React from 'react';
import AnimatedNavigation from '../components/AnimatedNavigation';
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
  return (
    <div className="min-h-screen bg-gradient-to-b from-cream to-white">
      <AnimatedNavigation />
      <Hero />
      <Menu />
      <FeaturedOrders />
      <div id="about">
        <About />
      </div>
      <div id="orders">
        <CustomOrders />
      </div>
      <Testimonials />
      <InstagramFeed />
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
