
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const handleWhatsAppOrder = () => {
    const message = "Hi! I'd like to place an order from Dunkin Delicacies. Could you please help me with the menu and pricing?";
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCall = () => {
    window.location.href = 'tel:+919876543210';
  };

  const handleEmail = () => {
    window.location.href = 'mailto:orders@dunkinDelicacies.com';
  };

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-cream">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Get in Touch</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to place an order or have questions? We'd love to hear from you!
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center">
                    <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Phone className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Phone</h4>
                      <p className="text-gray-600">+91 98765 43210</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Email</h4>
                      <p className="text-gray-600">orders@dunkinDelicacies.com</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">WhatsApp Orders</h4>
                      <p className="text-gray-600">Quick & Easy ordering</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Service Area</h4>
                      <p className="text-gray-600">Home delivery within city limits</p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                      <Clock className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Order Hours</h4>
                      <p className="text-gray-600">9:00 AM - 8:00 PM (Daily)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Information */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Business Information</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">FSSAI License:</span>
                    <span className="text-gray-600">Available on request</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">GST Registration:</span>
                    <span className="text-gray-600">Available on request</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Minimum Order:</span>
                    <span className="text-gray-600">₹200 for delivery</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium text-gray-700">Advance Notice:</span>
                    <span className="text-gray-600">24-48 hours for custom orders</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Order Buttons */}
          <div className="space-y-8">
            <Card className="bg-gradient-to-br from-green-100 to-emerald-100 border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <MessageCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">WhatsApp Order</h3>
                <p className="text-gray-600 mb-6">
                  The fastest way to place your order! Chat with us directly and get instant responses.
                </p>
                <Button 
                  onClick={handleWhatsAppOrder}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Order via WhatsApp
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-100 to-cyan-100 border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <Phone className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Call to Order</h3>
                <p className="text-gray-600 mb-6">
                  Prefer to talk? Give us a call and we'll help you choose the perfect treats.
                </p>
                <Button 
                  onClick={handleCall}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Call Now
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-100 to-pink-100 border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <Mail className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Email Us</h3>
                <p className="text-gray-600 mb-6">
                  For detailed inquiries or business collaborations, drop us an email.
                </p>
                <Button 
                  onClick={handleEmail}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Send Email
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
