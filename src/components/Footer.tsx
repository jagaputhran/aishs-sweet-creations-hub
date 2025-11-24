
import React from 'react';
import { Instagram, Phone, Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-400">
              Dunkin Delicacies
            </h3>
            <p className="text-lg text-gray-300 mb-4 italic">By AISH</p>
            <p className="text-gray-400 leading-relaxed">
              Crafting sweet memories, one treat at a time. Made with love in our home kitchen for your special moments.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-xl font-semibold mb-4 text-pink-300">Quick Links</h4>
            <div className="space-y-2">
              <a href="#menu" className="block text-gray-400 hover:text-pink-300 transition-colors duration-300">
                Our Menu
              </a>
              <a href="#about" className="block text-gray-400 hover:text-pink-300 transition-colors duration-300">
                About the Baker
              </a>
              <a href="#custom" className="block text-gray-400 hover:text-pink-300 transition-colors duration-300">
                Custom Orders
              </a>
              <a href="#contact" className="block text-gray-400 hover:text-pink-300 transition-colors duration-300">
                Contact Us
              </a>
            </div>
          </div>

          {/* Contact & Social */}
          <div className="text-center md:text-right">
            <h4 className="text-xl font-semibold mb-4 text-pink-300">Connect With Us</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-center md:justify-end">
                <Phone className="w-5 h-5 mr-2 text-pink-400" />
                <span className="text-gray-400">+91 80151 02020</span>
              </div>
              <div className="flex items-center justify-center md:justify-end">
                <Mail className="w-5 h-5 mr-2 text-pink-400" />
                <span className="text-gray-400">ashwarya99a@gmail.com</span>
              </div>
              <div className="flex justify-center md:justify-end mt-4">
                <a 
                  href="https://instagram.com/dunkin.delicacies" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 p-3 rounded-full transition-all duration-300 transform hover:scale-110"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Business Info */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 text-center md:text-left">
            <div>
              <h5 className="font-semibold mb-2 text-pink-300">Business Hours</h5>
              <p className="text-gray-400">Orders: 9:00 AM - 8:00 PM (Daily)</p>
              <p className="text-gray-400">Custom orders require 24-48 hours advance notice</p>
            </div>
            <div className="md:text-right">
              <h5 className="font-semibold mb-2 text-pink-300">Service Area</h5>
              <p className="text-gray-400">Home delivery within city limits</p>
              <p className="text-gray-400">Minimum order: ₹200 for delivery</p>
            </div>
          </div>
        </div>

        {/* Legal Info */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              <p>FSSAI License & GST Registration available on request</p>
            </div>
            <div className="flex items-center text-gray-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
              <span>by Aishwarya</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-gray-500 text-sm">
              © {currentYear} Dunkin Delicacies - By AISH. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
