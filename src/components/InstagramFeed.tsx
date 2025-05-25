
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Instagram, ExternalLink } from 'lucide-react';

const InstagramFeed = () => {
  // Placeholder for Instagram posts - in a real implementation, you'd fetch from Instagram API
  const instagramPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&h=400&fit=crop",
      caption: "Fresh batch of chocolate chip cookies ready! 🍪✨"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=400&fit=crop",
      caption: "Custom birthday cake with rainbow layers! 🌈🎂"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400&h=400&fit=crop",
      caption: "Decadent fudge brownies - can you smell them? 😍"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=400&h=400&fit=crop",
      caption: "Vanilla cupcakes with buttercream dreams! 🧁💭"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop",
      caption: "Red velvet perfection for a special celebration! ❤️"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=400&fit=crop",
      caption: "Behind the scenes: Love goes into every batch! 👩‍🍳💕"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-pink-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Instagram className="w-8 h-8 text-pink-500 mr-3" />
            <h2 className="text-5xl font-bold text-gray-800">Follow Our Sweet Journey</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Get a behind-the-scenes look at our baking process and see our latest creations on Instagram
          </p>
          <Button 
            className="bg-gradient-to-r from-pink-400 to-purple-500 hover:from-pink-500 hover:to-purple-600 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            onClick={() => window.open('https://instagram.com/dunkinDelicacies', '_blank')}
          >
            <Instagram className="w-5 h-5 mr-2" />
            Follow @dunkinDelicacies
            <ExternalLink className="w-4 h-4 ml-2" />
          </Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {instagramPosts.map((post) => (
            <Card 
              key={post.id} 
              className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              onClick={() => window.open('https://instagram.com/dunkinDelicacies', '_blank')}
            >
              <CardContent className="p-0 relative">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <Instagram className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 text-lg">
            Tag us in your photos with <span className="font-semibold text-pink-500">#DunkinDelicacies</span> to be featured!
          </p>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
