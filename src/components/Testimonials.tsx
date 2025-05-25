
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Priya Sharma",
      rating: 5,
      text: "Aishwarya made the most beautiful birthday cake for my daughter! Not only did it look amazing, but it tasted absolutely divine. The attention to detail was incredible, and everyone at the party couldn't stop talking about how delicious it was.",
      occasion: "Birthday Cake"
    },
    {
      name: "Rajesh Kumar",
      rating: 5,
      text: "I ordered brownies for our office party and they were a huge hit! Rich, fudgy, and perfectly sweet. The entire batch was finished within minutes. Definitely ordering again for our next event.",
      occasion: "Office Party"
    },
    {
      name: "Sneha Patel",
      rating: 5,
      text: "The cupcakes for our anniversary were absolutely perfect! Beautiful presentation and the flavors were out of this world. Aishwarya truly understands how to make special moments even more memorable with her amazing baking skills.",
      occasion: "Anniversary Cupcakes"
    },
    {
      name: "Amit Gupta",
      rating: 5,
      text: "Best cookies I've ever had! Ordered them for my family gathering and everyone loved them. The texture was perfect - crispy on the outside, chewy on the inside. Will definitely be a regular customer!",
      occasion: "Family Gathering"
    },
    {
      name: "Kavya Reddy",
      rating: 5,
      text: "Aishwarya created a custom wedding cake that exceeded all our expectations! It was not only stunning to look at but tasted incredible. Our guests are still talking about it months later. Thank you for making our special day even more magical!",
      occasion: "Wedding Cake"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Sweet Words from Happy Customers</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Nothing makes us happier than seeing the joy our treats bring to our customers
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-12">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <blockquote className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8 italic">
                  "{testimonials[currentIndex].text}"
                </blockquote>
                
                <div className="border-t border-gray-200 pt-6">
                  <h4 className="text-2xl font-semibold text-gray-800 mb-2">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-lg text-gray-600">
                    {testimonials[currentIndex].occasion}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation buttons */}
          <div className="flex justify-center mt-8 space-x-4">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="icon"
              className="rounded-full bg-white hover:bg-pink-50 border-pink-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
            
            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="icon"
              className="rounded-full bg-white hover:bg-pink-50 border-pink-200"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-pink-400' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
