import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Cake, Cookie, Sparkles, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import ARCakePreview from './ARCakePreview';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  quickReplies?: string[];
}

interface OrderData {
  type?: string;
  flavor?: string;
  occasion?: string;
  size?: string;
  theme?: string;
  budget?: string;
  name?: string;
  phone?: string;
  deliveryDate?: string;
}

// Knowledge base for Q&A about the bakery
const bakeryKnowledge = {
  baker: {
    name: "Aishwarya (Aish)",
    about: "Welcome to my little corner of sweetness! 🌸 What started as a passion for baking in my home kitchen has blossomed into Dunkin Delicacies, where every treat is crafted with love and attention to detail. I believe that the best baked goods come from the heart. Using only the finest ingredients and time-honored techniques, I create each cookie, brownie, cupcake, and cake as if it were for my own family. Because in a way, every customer becomes part of our sweet family! 💖",
    values: ["Made with Love ❤️", "Premium Quality ✨", "Fresh Daily 🌅"]
  },
  contact: {
    phone: "+91 80151 02020",
    email: "ashwarya99a@gmail.com",
    whatsapp: "918015102020",
    hours: "9:00 AM - 8:00 PM (Daily)"
  },
  menu: [
    { category: "Cookies 🍪", items: [
      { name: "Chocolate Chip Cookies", details: "100g (10 pieces)", price: "₹400" },
      { name: "Oatmeal Raisin Cookies", details: "100g (10 pieces)", price: "₹400" },
      { name: "Double Chocolate Cookies", details: "100g (5 pieces)", price: "₹250" }
    ]},
    { category: "Brownies 🍫", items: [
      { name: "Classic Fudge Brownies", details: "4 pieces", price: "₹320" },
      { name: "Walnut Brownies", details: "4 pieces", price: "₹350" },
      { name: "Assorted Brownie Box", details: "6 pieces", price: "₹900" }
    ]},
    { category: "Cupcakes 🧁", items: [
      { name: "Vanilla Bean Cupcakes", details: "6 pieces", price: "₹300" },
      { name: "Red Velvet Cupcakes", details: "6 pieces", price: "₹350" },
      { name: "Blueberry Cream Cheese Cupcakes", details: "6 pieces", price: "₹450" }
    ]},
    { category: "Artisan Cakes 🎂", items: [
      { name: "Birthday Celebration Cake", details: "1kg", price: "₹1000" },
      { name: "Anniversary Special Cake", details: "850gm", price: "₹1300" },
      { name: "Custom Theme Cake", details: "1kg", price: "₹1200" }
    ]},
    { category: "Healthy Options 🌱", items: [
      { name: "Whole Wheat Brownie Box", details: "600g - 6 pcs", price: "₹900" },
      { name: "Whole Wheat Butter Cookies", details: "200g - 12 pcs", price: "₹300" },
      { name: "Whole Wheat Oats & Nuts", details: "400g - 10 pcs", price: "₹800" },
      { name: "Classic Choco Chunk Cookies", details: "340g - 5 pcs", price: "₹300" },
      { name: "Whole Wheat Choco Chunk Cookies", details: "520g - 10 pcs", price: "₹800" }
    ]}
  ],
  business: {
    minOrder: "₹200 for delivery",
    advanceNotice: "24-48 hours for custom orders",
    serviceArea: "Home delivery within city limits",
    specialties: "🌱 Vegetarian • 🍃 Eggless • 🍯 Sugar-Free Options Available"
  },
  recentCreations: "We've recently created beautiful gourmet brownie boxes with premium toppings like cashews, almonds, hazelnuts, and golden sprinkles! 🎨 Also heart-shaped anniversary brownies with flavors like Nutella, Dark & White Chocolate, and Biscoff. Every order is crafted with love! 💝"
};

const ChatbotWidget = () => {
  // Version identifier
  const CHATBOT_VERSION = '2.0.0';
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [orderData, setOrderData] = useState<OrderData>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [conversationHistory, setConversationHistory] = useState<{step: number, data: OrderData}[]>([]);
  const [isAROpen, setIsAROpen] = useState(false);
  const [chatMode, setChatMode] = useState<'menu' | 'custom-order' | 'qa'>('menu');
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Q&A keyword matching function
  const handleQA = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    // Baker/About queries
    if (msg.includes('baker') || msg.includes('aish') || msg.includes('who') || msg.includes('meet') || msg.includes('about') || msg.includes('story')) {
      return `🌸 Meet ${bakeryKnowledge.baker.name}!\n\n${bakeryKnowledge.baker.about}\n\n✨ What makes us special:\n${bakeryKnowledge.baker.values.join('\n')}\n\nIs there anything else you'd like to know? 💝`;
    }
    
    // Contact queries
    if (msg.includes('contact') || msg.includes('phone') || msg.includes('call') || msg.includes('email') || msg.includes('reach') || msg.includes('message')) {
      return `📞 Contact Information:\n\n📱 Phone: ${bakeryKnowledge.contact.phone}\n📧 Email: ${bakeryKnowledge.contact.email}\n💬 WhatsApp: Available for quick orders!\n🕐 Hours: ${bakeryKnowledge.contact.hours}\n\nFeel free to reach out anytime! 💖`;
    }
    
    // Hours/Operating time queries
    if (msg.includes('hour') || msg.includes('open') || msg.includes('close') || msg.includes('time') || msg.includes('when') || msg.includes('schedule')) {
      return `🕐 We're here for you!\n\n⏰ Operating Hours:\n${bakeryKnowledge.contact.hours}\n\n💝 We take orders every day and bake fresh to order. For custom orders, we recommend placing them 24-48 hours in advance to ensure we create the perfect treat for you!`;
    }
    
    // Menu/Price queries
    if (msg.includes('menu') || msg.includes('price') || msg.includes('cost') || msg.includes('cake') || msg.includes('cookie') || msg.includes('brownie') || msg.includes('cupcake') || msg.includes('pastry') || msg.includes('item')) {
      let menuText = "🍰 Our Sweet Menu:\n\n";
      bakeryKnowledge.menu.forEach(category => {
        menuText += `${category.category}\n`;
        category.items.forEach(item => {
          menuText += `• ${item.name}\n  ${item.details} - ${item.price}\n`;
        });
        menuText += "\n";
      });
      menuText += `✨ ${bakeryKnowledge.business.specialties}\n\nWould you like to place a custom order? 🎂💖`;
      return menuText;
    }
    
    // Delivery/Service queries
    if (msg.includes('delivery') || msg.includes('pickup') || msg.includes('service') || msg.includes('area') || msg.includes('location') || msg.includes('ship')) {
      return `🚚 Delivery Information:\n\n📍 Service Area: ${bakeryKnowledge.business.serviceArea}\n💵 Minimum Order: ${bakeryKnowledge.business.minOrder}\n⏰ Advance Notice: ${bakeryKnowledge.business.advanceNotice}\n\nWe bring sweetness right to your doorstep! 🏠💝`;
    }
    
    // Recent orders/gallery queries
    if (msg.includes('recent') || msg.includes('gallery') || msg.includes('memory') || msg.includes('memories') || msg.includes('past') || msg.includes('photo') || msg.includes('creation') || msg.includes('work')) {
      return `🎨 Recent Sweet Memories!\n\n${bakeryKnowledge.recentCreations}\n\nCheck out our website's featured section to see more of our beautiful creations! ✨\n\nWould you like to create something special too? 💖`;
    }
    
    // Dietary/Special options
    if (msg.includes('eggless') || msg.includes('sugar') || msg.includes('diet') || msg.includes('vegan') || msg.includes('healthy') || msg.includes('wheat') || msg.includes('allergy')) {
      return `🌱 Special Dietary Options:\n\nWe offer:\n• 🍃 Eggless options\n• 🍯 Sugar-free treats\n• 🌾 Whole wheat varieties\n• 🥗 Healthier alternatives\n\nAll our products are vegetarian! We can also work with you on specific dietary requirements. Just let us know what you need! 💚`;
    }
    
    // Default response
    return `Aww! I don't have that detail baked in yet, but I can check with the baker for you! 💖\n\nI can help you with:\n• 👩‍🍳 About the baker\n• 📞 Contact information\n• 🍰 Menu & pricing\n• 🎉 Recent sweet memories\n• 🧁 Custom orders\n• 🏪 Hours & delivery info\n• 🌱 Dietary options\n\nWhat would you like to know? 🌟`;
  };

  // Load saved conversation from localStorage with version check
  useEffect(() => {
    const savedVersion = localStorage.getItem('chatbot-version');
    const saved = localStorage.getItem('chatbot-state');
    
    // Clear cache if version mismatch
    if (savedVersion !== CHATBOT_VERSION) {
      localStorage.removeItem('chatbot-state');
      localStorage.setItem('chatbot-version', CHATBOT_VERSION);
      console.log('Chatbot cache cleared due to version update');
      return;
    }
    
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.messages || []);
        setOrderData(parsed.orderData || {});
        setCurrentStep(parsed.currentStep || 0);
        setChatMode(parsed.chatMode || 'menu');
      } catch (e) {
        console.error('Failed to load saved state');
        localStorage.removeItem('chatbot-state');
      }
    }
  }, []);

  // Save conversation to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('chatbot-state', JSON.stringify({
        messages,
        orderData,
        currentStep,
        chatMode
      }));
    }
  }, [messages, orderData, currentStep, chatMode]);

  const conversationFlow = [
    {
      key: 'greeting',
      question: "Hi there! 🧁 Welcome to Aishu's Dunkin Delicacies! I'm here to help you create your perfect custom order. What would you like to order today?",
      quickReplies: ['🍰 Cake', '🧁 Cupcakes', '🥐 Pastries', '🍪 Cookies','🍫🎁 Brownie Box'],
      dataKey: 'type'
    },
    {
      key: 'flavor',
      question: "Yummy choice! What flavor are you craving?",
      quickReplies: ['🍫 Chocolate', '🍓 Strawberry', '🫐 Blueberry', '🍦 Vanilla', '✨ Surprise Me'],
      dataKey: 'flavor'
    },
    {
      key: 'occasion',
      question: "What's the special occasion?",
      quickReplies: ['🎂 Birthday', '💍 Wedding', '🎉 Anniversary', '🎓 Graduation', '💼 Corporate Event', '🎈 Just Because'],
      dataKey: 'occasion'
    },
    {
      key: 'size',
      question: "How many people will be enjoying this treat?",
      quickReplies: ['👤 Small (1-5)', '👥 Medium (6-15)', '👨‍👩‍👧‍👦 Large (16-30)', '🎪 Extra Large (30+)'],
      dataKey: 'size'
    },
    {
      key: 'theme',
      question: "Do you have a theme or special design in mind?",
      quickReplies: ['🌸 Floral', '🎨 Colorful', '✨ Elegant', '🎪 Fun & Playful', '💭 Tell me later'],
      dataKey: 'theme'
    },
    {
      key: 'budget',
      question: "What's your budget range?",
      quickReplies: ['💰 Under ₹1000', '💵 ₹1000-₹2000', '💳 ₹2000-₹5000', '💎 Above ₹5000'],
      dataKey: 'budget'
    },
    {
      key: 'name',
      question: "Great! I have all the details. What's your name?",
      quickReplies: [],
      dataKey: 'name',
      requiresInput: true
    },
    {
      key: 'phone',
      question: "And your phone number so we can reach you? (10 digits)",
      quickReplies: [],
      dataKey: 'phone',
      requiresInput: true,
      validation: (value: string) => /^[6-9]\d{9}$/.test(value)
    },
    {
      key: 'deliveryDate',
      question: "When would you like to receive your order?",
      quickReplies: ['📅 Tomorrow', '📅 In 2 days', '📅 In 3 days', '📅 This Weekend', '💬 Tell me later'],
      dataKey: 'deliveryDate'
    }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          "Hello! I'm Aishu's Sweet Assistant! 🧁✨ I'm here to help you with love, cheer, and sweetness! How can I brighten your day?",
          ['🧁 Place Custom Order', '💬 Ask Questions', '🍰 View Menu & Prices'],
          800
        );
      }, 500);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && chatWindowRef.current) {
      // Enable hardware acceleration
      gsap.set(chatWindowRef.current, {
        force3D: true,
        transformPerspective: 1000,
        backfaceVisibility: 'hidden',
        willChange: 'transform'
      });

      gsap.fromTo(
        chatWindowRef.current,
        { scale: 0, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );
      
      // Floating animation for chat window
      gsap.to(chatWindowRef.current, {
        y: -3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        force3D: true
      });
    }

    return () => {
      if (chatWindowRef.current) {
        gsap.killTweensOf(chatWindowRef.current);
      }
    };
  }, [isOpen]);

  // Header cupcake bounce animation
  useEffect(() => {
    if (isOpen && headerRef.current) {
      const cupcakeIcon = headerRef.current.querySelector('.cupcake-icon');
      if (cupcakeIcon) {
        gsap.to(cupcakeIcon, {
          y: -5,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          repeatDelay: 29.5
        });
      }
    }
  }, [isOpen]);

  const addBotMessage = (text: string, quickReplies?: string[], delay = 1000) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text,
        isBot: true,
        quickReplies
      }]);
    }, delay);
  };

  const addUserMessage = (text: string) => {
    setMessages(prev => [...prev, {
      id: Date.now().toString(),
      text,
      isBot: false
    }]);
  };

  const handleQuickReply = (reply: string) => {
    addUserMessage(reply);

    // Check if it's a restart request
    if (reply === '🔄 Start New Order' || reply === '🔄 Start Over') {
      resetChat();
      setTimeout(() => {
        addBotMessage(
          "Hello! I'm Aishu's Sweet Assistant! 🧁✨ I'm here to help you with love, cheer, and sweetness! How can I brighten your day?",
          ['🧁 Place Custom Order', '💬 Ask Questions', '🍰 View Menu & Prices'],
          500
        );
      }, 300);
      return;
    }

    // Handle mode selection from menu
    if (chatMode === 'menu') {
      if (reply === '🧁 Place Custom Order') {
        setChatMode('custom-order');
        setTimeout(() => {
          addBotMessage(
            conversationFlow[0].question,
            conversationFlow[0].quickReplies,
            800
          );
        }, 500);
        return;
      } else if (reply === '💬 Ask Questions') {
        setChatMode('qa');
        setTimeout(() => {
          addBotMessage(
            "I'm here to answer all your sweet questions! 🌟 Ask me about our menu, prices, the baker, contact info, delivery, or anything else!",
            ['📞 Contact Info', '⭐ Meet the Baker', '🍰 View Full Menu', '🚚 Delivery Info', '🧁 Place Custom Order'],
            800
          );
        }, 500);
        return;
      } else if (reply === '🍰 View Menu & Prices') {
        setChatMode('qa');
        setTimeout(() => {
          const menuResponse = handleQA('menu');
          addBotMessage(
            menuResponse,
            ['🧁 Place Custom Order', '📞 Contact Info', '💬 Ask Another Question'],
            800
          );
        }, 500);
        return;
      }
    }

    // Handle Q&A mode quick replies
    if (chatMode === 'qa') {
      let response = '';
      let nextOptions: string[] = ['🧁 Place Custom Order', '💬 Ask Another Question', '🔄 Start Over'];

      if (reply === '📞 Contact Info') {
        response = handleQA('contact');
      } else if (reply === '⭐ Meet the Baker') {
        response = handleQA('baker');
      } else if (reply === '🍰 View Full Menu') {
        response = handleQA('menu');
      } else if (reply === '🚚 Delivery Info') {
        response = handleQA('delivery');
      } else if (reply === '🧁 Place Custom Order') {
        setChatMode('custom-order');
        setTimeout(() => {
          addBotMessage(
            conversationFlow[0].question,
            conversationFlow[0].quickReplies,
            800
          );
        }, 500);
        return;
      } else if (reply === '💬 Ask Another Question') {
        response = "Of course! What else would you like to know? 💝";
        nextOptions = ['📞 Contact Info', '⭐ Meet the Baker', '🍰 View Full Menu', '🚚 Delivery Info', '🧁 Place Custom Order'];
      }

      if (response) {
        setTimeout(() => {
          addBotMessage(response, nextOptions, 800);
        }, 500);
        return;
      }
    }

    // Handle go back in custom order flow
    if (reply === '⬅️ Go Back' && conversationHistory.length > 0) {
      const previous = conversationHistory[conversationHistory.length - 1];
      
      setMessages(prev => {
        const newMessages = prev.slice(0, -2);
        if (newMessages.length > 0) {
          const lastMsg = newMessages[newMessages.length - 1];
          if (lastMsg.isBot) {
            const replies = previous.step > 0 
              ? [...conversationFlow[previous.step].quickReplies, '⬅️ Go Back']
              : conversationFlow[previous.step].quickReplies;
            lastMsg.quickReplies = replies;
          }
        }
        return newMessages;
      });
      
      setCurrentStep(previous.step);
      setOrderData(previous.data);
      setConversationHistory(prev => prev.slice(0, -1));
      
      toast({
        title: "Step Reverted ↩️",
        description: "You can change your previous answer"
      });
      return;
    }

    // Handle custom order flow
    if (chatMode === 'custom-order') {
      const currentStepData = conversationFlow[currentStep];
      
      if (currentStepData.dataKey) {
        setConversationHistory(prev => [...prev, { step: currentStep, data: orderData }]);
        
        const updatedOrderData = {
          ...orderData,
          [currentStepData.dataKey!]: reply
        };
        setOrderData(updatedOrderData);
        moveToNextStep(updatedOrderData);
      } else {
        moveToNextStep();
      }
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Handle Q&A mode text input
    if (chatMode === 'qa') {
      addUserMessage(userInput);
      const response = handleQA(userInput);
      setTimeout(() => {
        addBotMessage(
          response,
          ['🧁 Place Custom Order', '💬 Ask Another Question', '🔄 Start Over'],
          800
        );
      }, 500);
      setUserInput('');
      return;
    }

    // Handle custom order mode text input
    const currentStepData = conversationFlow[currentStep];
    
    // Validate input if validation function exists
    if (currentStepData.validation && !currentStepData.validation(userInput.trim())) {
      toast({
        title: "Invalid Input 😅",
        description: currentStepData.key === 'phone' 
          ? "Please enter a valid 10-digit Indian mobile number starting with 6-9"
          : "Please check your input and try again",
        variant: "destructive"
      });
      return;
    }

    // Auto-format phone number
    let formattedInput = userInput.trim();
    if (currentStepData.key === 'phone') {
      formattedInput = userInput.replace(/\D/g, '').slice(0, 10);
    }

    addUserMessage(formattedInput);
    
    if (currentStepData.dataKey) {
      setConversationHistory(prev => [...prev, { step: currentStep, data: orderData }]);
      
      const updatedOrderData = {
        ...orderData,
        [currentStepData.dataKey!]: formattedInput
      };
      setOrderData(updatedOrderData);
      
      setUserInput('');
      moveToNextStep(updatedOrderData);
    } else {
      setUserInput('');
      moveToNextStep();
    }
  };

  const moveToNextStep = (currentOrderData?: OrderData) => {
    const nextStep = currentStep + 1;
    
    if (nextStep < conversationFlow.length) {
      setCurrentStep(nextStep);
      setTimeout(() => {
        const replies = nextStep > 0 
          ? [...conversationFlow[nextStep].quickReplies, '⬅️ Go Back']
          : conversationFlow[nextStep].quickReplies;
        
        addBotMessage(
          conversationFlow[nextStep].question,
          replies,
          800
        );
      }, 500);
    } else {
      showSummaryAndSendToWhatsApp(currentOrderData);
    }
  };

  const showSummaryAndSendToWhatsApp = (currentOrderData?: OrderData) => {
    const finalOrderData = currentOrderData || orderData;
    
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FFD700', '#FFA07A']
    });

    const summary = `Perfect! Here's your order summary:\n\n🎂 Type: ${finalOrderData.type}\n🍰 Flavor: ${finalOrderData.flavor}\n🎉 Occasion: ${finalOrderData.occasion}\n📏 Size: ${finalOrderData.size}\n🎨 Theme: ${finalOrderData.theme}\n💰 Budget: ${finalOrderData.budget}\n📅 Delivery: ${finalOrderData.deliveryDate}\n\n👤 Name: ${finalOrderData.name}\n📱 Phone: ${finalOrderData.phone}\n\nLet's send this to WhatsApp to finalize your order! 🎊`;
    
    addBotMessage(summary, [], 800);
    
    setTimeout(() => {
      sendToWhatsApp(finalOrderData);
    }, 2000);
  };

  const sendToWhatsApp = (finalOrderData?: OrderData) => {
    const dataToSend = finalOrderData || orderData;
    
    const message = `🧁 *Custom Order Request from Chatbot*\n\n` +
      `*Customer Details:*\n` +
      `Name: ${dataToSend.name}\n` +
      `Phone: ${dataToSend.phone}\n` +
      `Preferred Delivery: ${dataToSend.deliveryDate}\n\n` +
      `*Order Details:*\n` +
      `Type: ${dataToSend.type}\n` +
      `Flavor: ${dataToSend.flavor}\n` +
      `Occasion: ${dataToSend.occasion}\n` +
      `Size: ${dataToSend.size}\n` +
      `Theme: ${dataToSend.theme}\n` +
      `Budget: ${dataToSend.budget}\n\n` +
      `Looking forward to creating something special! 🎂✨`;

    const whatsappUrl = `https://wa.me/918015102020?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Opening WhatsApp! 🎉",
      description: "Your order details have been prepared. Complete your order on WhatsApp!",
    });

    setTimeout(() => {
      addBotMessage(
        "✅ Your order has been sent to WhatsApp! If you'd like to place another order or ask more questions, just click below.",
        ['🔄 Start New Order', '💬 Ask Questions'],
        800
      );
    }, 2000);
  };

  const resetChat = () => {
    setMessages([]);
    setOrderData({});
    setCurrentStep(0);
    setConversationHistory([]);
    setChatMode('menu');
    localStorage.removeItem('chatbot-state');
  };

  const copyOrderSummary = () => {
    const summary = `Order Details:\n` +
      `Type: ${orderData.type}\n` +
      `Flavor: ${orderData.flavor}\n` +
      `Occasion: ${orderData.occasion}\n` +
      `Size: ${orderData.size}\n` +
      `Theme: ${orderData.theme}\n` +
      `Budget: ${orderData.budget}\n` +
      `Delivery: ${orderData.deliveryDate}\n\n` +
      `Name: ${orderData.name}\n` +
      `Phone: ${orderData.phone}`;
    
    navigator.clipboard.writeText(summary);
    toast({
      title: "Copied! 📋",
      description: "Order summary copied to clipboard"
    });
  };

  const getCategoryIcon = (type: string) => {
    if (type?.includes('Cake')) return '🎂';
    if (type?.includes('Cupcake')) return '🧁';
    if (type?.includes('Pastries')) return '🥐';
    if (type?.includes('Cookie')) return '🍪';
    if (type?.includes('Brownie')) return '🍫';
    return '🎂';
  };

  const toggleChat = () => {
    if (isOpen) {
      gsap.killTweensOf(chatWindowRef.current);
      gsap.to(chatWindowRef.current, {
        scale: 0,
        opacity: 0,
        y: 50,
        duration: 0.3,
        ease: 'back.in(1.7)',
        force3D: true,
        onComplete: () => setIsOpen(false)
      });
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      {/* AR Preview Modal */}
      <ARCakePreview
        isOpen={isAROpen}
        onClose={() => setIsAROpen(false)}
        cakeType={orderData.type || ''}
        flavor={orderData.flavor || ''}
        theme={orderData.theme || ''}
      />

      {/* Floating Chat Bubble */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      >
        <motion.button
          onClick={toggleChat}
          className="relative w-16 h-16 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full shadow-lg flex items-center justify-center group"
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
          whileTap={{ scale: 0.95 }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-yellow-300 animate-pulse" />
          <MessageCircle className="w-8 h-8 text-white" />
          <motion.div
            className="absolute inset-0 rounded-full bg-pink-300"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.button>
      </motion.div>

      {/* Sprinkles Background */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed bottom-24 right-6 w-96 h-[600px] pointer-events-none z-40">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: ['#FFB6C1', '#FFC0CB', '#FFD700', '#87CEEB', '#98FB98'][i % 5],
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  x: [0, Math.random() * 10 - 5, 0],
                  rotate: [0, 360],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <div
            ref={chatWindowRef}
            className="fixed bottom-24 right-6 w-96 h-[600px] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-pink-200 bg-gradient-to-b from-cream/95 to-white/95"
            style={{
              transform: 'translateZ(0)',
              WebkitBackfaceVisibility: 'hidden',
              WebkitPerspective: 1000,
              WebkitTransform: 'translateZ(0)',
              willChange: 'transform'
            }}
          >
            {/* Header - Glassmorphic */}
            <div 
              ref={headerRef}
              className="relative p-4 flex items-center justify-between overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(244, 114, 182, 0.9), rgba(251, 113, 133, 0.9))',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* Gradient shine animation */}
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                    'linear-gradient(45deg, transparent, rgba(255,255,255,0.3), transparent)',
                  ],
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
              
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cupcake-icon">
                  <Cake className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Aishu's Sweet Assistant</h3>
                  <p className="text-pink-100 text-xs">Here with love & cheer! 🧁</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Progress Indicator - Only show in custom order mode */}
            {chatMode === 'custom-order' && currentStep > 0 && currentStep < conversationFlow.length && (
              <div className="px-4 py-2 bg-pink-50 border-b border-pink-100">
                <div className="flex items-center justify-between text-xs text-pink-600">
                  <span className="font-medium">Step {currentStep + 1} of {conversationFlow.length}</span>
                  <div className="flex gap-1">
                    {conversationFlow.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors ${
                          index <= currentStep ? 'bg-pink-400' : 'bg-pink-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Mode Indicator for Q&A */}
            {chatMode === 'qa' && (
              <div className="px-4 py-2 bg-purple-50 border-b border-purple-100 text-center">
                <span className="text-xs text-purple-600 font-medium">💬 Q&A Mode - Ask me anything!</span>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, msgIndex) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} items-end gap-2`}
                >
                  {/* Category Icon for bot messages */}
                  {message.isBot && msgIndex > 0 && orderData.type && chatMode === 'custom-order' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: 'spring' }}
                      className="text-2xl mb-1"
                    >
                      {getCategoryIcon(orderData.type)}
                    </motion.div>
                  )}
                  
                  <div className="relative flex flex-col group">
                    {/* Timestamp on hover */}
                    <span className={`text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1 ${
                      message.isBot ? 'self-start' : 'self-end'
                    }`}>
                      {new Date(parseInt(message.id)).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div
                      className={`rounded-2xl p-3 shadow-lg ${
                        message.isBot
                          ? 'bg-white/90 text-gray-800 rounded-tl-none border border-pink-100'
                          : 'bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-tr-none'
                      }`}
                      style={message.isBot ? {
                        boxShadow: '0 4px 12px rgba(255, 182, 193, 0.3)',
                      } : undefined}
                    >
                    {/* Visual Order Summary Card */}
                    {message.text.includes('Perfect! Here\'s your order summary:') ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 mb-3">
                          <ShoppingBag className="w-5 h-5 text-pink-500" />
                          <h4 className="font-bold text-pink-600">Your Custom Order</h4>
                        </div>
                        <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-3 space-y-2 border-2 border-pink-200">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{getCategoryIcon(orderData.type)}</span>
                            <span className="font-semibold text-gray-800">{orderData.type}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-gray-600">Flavor:</span>
                              <p className="font-medium text-gray-800">{orderData.flavor}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Occasion:</span>
                              <p className="font-medium text-gray-800">{orderData.occasion}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Size:</span>
                              <p className="font-medium text-gray-800">{orderData.size}</p>
                            </div>
                            <div>
                              <span className="text-gray-600">Theme:</span>
                              <p className="font-medium text-gray-800">{orderData.theme}</p>
                            </div>
                          </div>
                          <div className="pt-2 border-t border-pink-200">
                            <span className="text-gray-600 text-xs">Budget:</span>
                            <p className="font-semibold text-pink-600">{orderData.budget}</p>
                          </div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-2 text-xs border border-blue-200">
                          <p className="font-medium text-gray-700">👤 {orderData.name}</p>
                          <p className="text-gray-600">📱 {orderData.phone}</p>
                          <p className="text-gray-600">📅 {orderData.deliveryDate}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={copyOrderSummary}
                            className="py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium text-gray-700 transition-colors flex items-center justify-center gap-2"
                          >
                            📋 Copy
                          </button>
                          <button
                            onClick={() => setIsAROpen(true)}
                            className="py-2 px-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-xs font-medium text-white transition-colors flex items-center justify-center gap-2"
                          >
                            📱 AR Preview
                          </button>
                        </div>
                        <p className="text-sm text-gray-700 pt-2">Let's send this to WhatsApp to finalize your order! 🎊</p>
                      </div>
                    ) : (
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                    )}
                    
                    {message.quickReplies && message.quickReplies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.quickReplies.map((reply, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleQuickReply(reply)}
                            className="bg-white text-pink-500 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-pink-100 transition-all border-2 border-pink-200 hover:border-pink-300 hover:shadow-md"
                          >
                            {reply}
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div 
                  className="flex justify-start items-end gap-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-2xl mb-1">🧁</div>
                  <div className="bg-white/90 rounded-2xl rounded-tl-none p-3 shadow-lg border border-pink-100">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-pink-400 rounded-full"
                        animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-pink-400 rounded-full"
                        animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-pink-400 rounded-full"
                        animate={{ y: [0, -5, 0], opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area - Show for custom order requiresInput steps AND for Q&A mode */}
            {((chatMode === 'custom-order' && conversationFlow[currentStep]?.requiresInput) || 
              (chatMode === 'qa' && messages.length > 0)) && !isTyping && (
              <form onSubmit={handleInputSubmit} className="p-4 border-t border-pink-100 bg-white">
                <div className="flex gap-2">
                  <Input
                    value={userInput}
                    onChange={(e) => {
                      // Auto-format phone number as user types (only in custom order mode)
                      if (chatMode === 'custom-order' && conversationFlow[currentStep]?.key === 'phone') {
                        const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setUserInput(digits);
                      } else {
                        setUserInput(e.target.value);
                      }
                    }}
                    placeholder={
                      chatMode === 'qa'
                        ? "Type your question..."
                        : conversationFlow[currentStep]?.key === 'phone' 
                        ? "Enter 10-digit number..." 
                        : conversationFlow[currentStep]?.key === 'name'
                        ? "Enter your name..."
                        : "Type your answer..."
                    }
                    type={chatMode === 'custom-order' && conversationFlow[currentStep]?.key === 'phone' ? 'tel' : 'text'}
                    maxLength={chatMode === 'custom-order' && conversationFlow[currentStep]?.key === 'phone' ? 10 : undefined}
                    className="flex-1 border-pink-200 focus:border-pink-400"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600"
                    disabled={chatMode === 'custom-order' && conversationFlow[currentStep]?.key === 'phone' && userInput.length !== 10}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                {chatMode === 'custom-order' && conversationFlow[currentStep]?.key === 'phone' && userInput.length > 0 && (
                  <p className={`text-xs mt-2 ${
                    userInput.length === 10 && /^[6-9]/.test(userInput) 
                      ? 'text-green-600' 
                      : 'text-gray-500'
                  }`}>
                    {userInput.length === 10 && /^[6-9]/.test(userInput) 
                      ? '✓ Valid phone number' 
                      : `${userInput.length}/10 digits`}
                  </p>
                )}
                {chatMode === 'custom-order' && conversationFlow[currentStep]?.key === 'name' && userInput.length > 0 && (
                  <p className="text-xs mt-2 text-gray-500">
                    {userInput.length} characters
                  </p>
                )}
              </form>
            )}
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;