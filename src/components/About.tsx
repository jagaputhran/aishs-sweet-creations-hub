
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Award, Clock } from 'lucide-react';

const About = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-cream">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-6">Meet the Baker</h2>
            <div className="w-32 h-32 bg-gradient-to-br from-pink-300 to-rose-400 rounded-full mx-auto mb-8 flex items-center justify-center">
              <span className="text-4xl font-bold text-white">A</span>
            </div>
          </div>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">Hi, I'm Aishwarya! 👋</h3>
              
              <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed">
                <p className="text-xl mb-6">
                  Welcome to my little corner of sweetness! What started as a passion for baking in my home kitchen has blossomed into Dunkin Delicacies, where every treat is crafted with love and attention to detail.
                </p>
                
                <p className="text-lg mb-6">
                  I believe that the best baked goods come from the heart. Using only the finest ingredients and time-honored techniques, I create each cookie, brownie, cupcake, and cake as if it were for my own family. Because in a way, every customer becomes part of our sweet family.
                </p>
                
                <p className="text-lg mb-8">
                  From celebrating life's precious moments with custom cakes to bringing smiles with everyday treats, I'm here to add sweetness to your special occasions and ordinary days alike.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-rose-500" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Made with Love</h4>
                  <p className="text-gray-600">Every recipe is perfected with care and passion</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-yellow-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Premium Quality</h4>
                  <p className="text-gray-600">Only the finest ingredients make it into our treats</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-2">Fresh Daily</h4>
                  <p className="text-gray-600">Baked fresh to order, ensuring perfect taste and texture</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
