
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const CustomOrders = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    occasion: '',
    flavor: '',
    size: '',
    toppings: '',
    date: '',
    message: '',
    budget: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Order Request Received!",
      description: "Thank you! We'll contact you within 24 hours to discuss your custom order.",
    });
    // Reset form
    setFormData({
      name: '', phone: '', email: '', occasion: '', flavor: '', size: '', 
      toppings: '', date: '', message: '', budget: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-cream to-pink-50">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-800 mb-4">Custom Orders</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Let's create something special together! Share your vision and we'll bring it to life.
            </p>
          </div>

          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-t-lg">
              <CardTitle className="text-2xl text-center text-gray-800">Place Your Custom Order</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name" className="text-lg font-medium text-gray-700">Your Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-lg font-medium text-gray-700">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="mt-2"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-lg font-medium text-gray-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-2"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-lg font-medium text-gray-700">Occasion</Label>
                    <Select value={formData.occasion} onValueChange={(value) => handleInputChange('occasion', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select occasion" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="birthday">Birthday</SelectItem>
                        <SelectItem value="anniversary">Anniversary</SelectItem>
                        <SelectItem value="wedding">Wedding</SelectItem>
                        <SelectItem value="graduation">Graduation</SelectItem>
                        <SelectItem value="corporate">Corporate Event</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-lg font-medium text-gray-700">Preferred Flavor</Label>
                    <Select value={formData.flavor} onValueChange={(value) => handleInputChange('flavor', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select flavor" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vanilla">Vanilla</SelectItem>
                        <SelectItem value="chocolate">Chocolate</SelectItem>
                        <SelectItem value="strawberry">Strawberry</SelectItem>
                        <SelectItem value="red-velvet">Red Velvet</SelectItem>
                        <SelectItem value="lemon">Lemon</SelectItem>
                        <SelectItem value="carrot">Carrot</SelectItem>
                        <SelectItem value="custom">Custom Flavor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-lg font-medium text-gray-700">Size/Servings</Label>
                    <Select value={formData.size} onValueChange={(value) => handleInputChange('size', value)}>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">Small (10-15 servings)</SelectItem>
                        <SelectItem value="medium">Medium (20-25 servings)</SelectItem>
                        <SelectItem value="large">Large (30-40 servings)</SelectItem>
                        <SelectItem value="xl">Extra Large (50+ servings)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="date" className="text-lg font-medium text-gray-700">Required Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="mt-2"
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="toppings" className="text-lg font-medium text-gray-700">Special Toppings/Decorations</Label>
                  <Input
                    id="toppings"
                    value={formData.toppings}
                    onChange={(e) => handleInputChange('toppings', e.target.value)}
                    placeholder="e.g., fresh berries, chocolate drizzle, fondant decorations..."
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="budget" className="text-lg font-medium text-gray-700">Budget Range</Label>
                  <Input
                    id="budget"
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    placeholder="e.g., ₹1000-1500"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-lg font-medium text-gray-700">Additional Details</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    placeholder="Tell us more about your vision, theme, colors, or any special requirements..."
                    className="mt-2 min-h-[120px]"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600 text-white py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Submit Custom Order Request
                </Button>

                <p className="text-center text-gray-600 text-sm">
                  * We'll contact you within 24 hours to discuss pricing and finalize details
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CustomOrders;
