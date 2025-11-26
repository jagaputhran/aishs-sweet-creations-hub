import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Cake, Cookie, Sparkles, ShoppingBag, Trash2 } from 'lucide-react';
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

// Menu data structure for quick reference
const menuData = {
  cookies: [
    { name: "Chocolate Chip Cookies", weight: "100g (10 pcs)", price: "₹400" },
    { name: "Oatmeal Raisin Cookies", weight: "100g (10 pcs)", price: "₹400" },
    { name: "Double Chocolate Cookies", weight: "100g (5 pcs)", price: "₹250" }
  ],
  brownies: [
    { name: "Classic Fudge Brownies", weight: "4 pieces", price: "₹320" },
    { name: "Walnut Brownies", weight: "4 pieces", price: "₹350" },
    { name: "Assorted Brownie Box", weight: "6 pieces", price: "₹900" }
  ],
  cupcakes: [
    { name: "Vanilla Bean Cupcakes", weight: "6 pieces", price: "₹300" },
    { name: "Red Velvet Cupcakes", weight: "6 pieces", price: "₹350" },
    { name: "Blueberry Cream Cheese Cupcakes", weight: "6 pieces", price: "₹450" }
  ],
  cakes: [
    { name: "Birthday Celebration Cake", weight: "1kg", price: "₹1000" },
    { name: "Anniversary Special Cake", weight: "850gm", price: "₹1300" },
    { name: "Custom Theme Cake", weight: "1kg", price: "₹1200" }
  ],
  healthy: [
    { name: "Whole Wheat Brownie Box", weight: "600g - 6 pcs", price: "₹900" },
    { name: "Whole Wheat Butter Cookies", weight: "200g - 12 pcs", price: "₹300" },
    { name: "Whole Wheat Oats & Nuts", weight: "400g - 10 pcs", price: "₹800" }
  ]
};

const contactInfo = {
  phone: "+91 80151 02020",
  email: "ashwarya99a@gmail.com",
  whatsapp: "+918015102020",
  hours: "9:00 AM - 8:00 PM (Daily)",
  minOrder: "₹200 for delivery",
  advanceNotice: "24-48 hours for custom orders"
};

const ChatbotWidget = () => {
  // Version identifier - update this when making breaking changes to force cache clear
  const CHATBOT_VERSION = '1.1.0';
  
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [orderData, setOrderData] = useState<OrderData>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [conversationHistory, setConversationHistory] = useState<{step: number, data: OrderData}[]>([]);
  const [isAROpen, setIsAROpen] = useState(false);
  const [isInOrderMode, setIsInOrderMode] = useState(false); // Track if user is actively placing order
  const [showQuickActions, setShowQuickActions] = useState(true); // Show quick action buttons
  const [menuHistory, setMenuHistory] = useState<string[]>([]); // Track navigation for back button
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

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
        currentStep
      }));
    }
  }, [messages, orderData, currentStep]);

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
        const greetings = [
          "Hi there! 🧁 Welcome to Aishu's Dunkin Delicacies! I'm here to make your ordering experience sweet and easy!",
          "Hello! 👋 Thanks for stopping by Aishu's Dunkin Delicacies! What delicious treat can I help you with today?",
          "Hey! 🎂 Welcome to Aishu's sweet world! Let me help you find the perfect dessert!"
        ];
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        addBotMessage(
          randomGreeting,
          ['🛍️ Place an Order', '📋 View Menu & Prices', '📞 Contact Info', '❓ FAQs']
        );
        setMenuHistory([]);
      }, 800);
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
      
      // Floating animation for chat window - optimized for Samsung devices
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

  // Helper function to show menu and prices
  const showMenuPrices = () => {
    const menuMessage = {
      type: 'menu',
      content: 'Here\'s our complete menu with prices! 📋'
    };
    
    const replies = menuHistory.length > 0 
      ? ['🛍️ Place an Order', '📞 Contact Us', '⬅️ Go Back', '🏠 Main Menu']
      : ['🛍️ Place an Order', '📞 Contact Us', '🏠 Main Menu'];
    
    addBotMessage(JSON.stringify(menuMessage), replies, 800);
    setMenuHistory(prev => [...prev, 'menu']);
  };

  // Helper function to show contact information
  const showContactInfo = () => {
    const contactMessage = {
      type: 'contact',
      content: 'Here\'s how you can reach us! 📞'
    };
    
    const replies = menuHistory.length > 0
      ? ['💬 Message on WhatsApp', '🛍️ Place an Order', '⬅️ Go Back', '🏠 Main Menu']
      : ['💬 Message on WhatsApp', '🛍️ Place an Order', '🏠 Main Menu'];
    
    addBotMessage(JSON.stringify(contactMessage), replies, 800);
    setMenuHistory(prev => [...prev, 'contact']);
  };

  // Helper function to show FAQs
  const showFAQs = () => {
    const faqMessage = {
      type: 'faq',
      content: 'Here are answers to common questions! ❓'
    };
    
    const replies = menuHistory.length > 0
      ? ['🛍️ Place an Order', '📋 View Menu', '⬅️ Go Back', '🏠 Main Menu']
      : ['🛍️ Place an Order', '📋 View Menu', '🏠 Main Menu'];
    
    addBotMessage(JSON.stringify(faqMessage), replies, 800);
    setMenuHistory(prev => [...prev, 'faq']);
  };

  // Detect user intent from free text
  const detectIntent = (text: string): string | null => {
    const lowerText = text.toLowerCase().trim();
    
    // Greetings - friendly responses
    if (lowerText.match(/^(hi|hello|hey|hii|hiii|helo|hola|namaste|good morning|good afternoon|good evening|yo|sup|what'?s up)$/i)) {
      return 'greeting';
    }
    
    // Thank you / appreciation
    if (lowerText.match(/^(thank you|thanks|thank u|thanku|thnks|thnx|ty|thx|appreciate it|cool|awesome|great|nice|perfect|ok|okay|sure|alright)$/i)) {
      return 'thanks';
    }
    
    // Goodbye
    if (lowerText.match(/^(bye|goodbye|see you|see ya|cya|later|gtg|got to go|gotta go|talk later|ttyl)$/i)) {
      return 'goodbye';
    }
    
    // Menu/Price keywords - more specific patterns
    if (lowerText.match(/\b(show|view|see|display|what'?s?|check|browse)\b.*(menu|price|pricing|cost|rate)/i) ||
        lowerText.match(/\b(menu|price|pricing|catalogue|list)\b/i) ||
        lowerText.match(/how much (does|do|is|are|for)/i)) {
      return 'menu';
    }
    
    // Contact keywords - specific patterns
    if (lowerText.match(/\b(contact|phone|email|whatsapp|call|reach)\b.*(detail|info|number)/i) ||
        lowerText.match(/\b(how to|want to)\b.*(contact|reach|call)/i) ||
        lowerText.match(/\b(phone number|email address|whatsapp number|contact detail)/i)) {
      return 'contact';
    }
    
    // FAQ keywords - specific patterns
    if (lowerText.match(/\b(faq|frequently asked|common question)/i) ||
        lowerText.match(/\b(do you|can you|is it)\b.*(eggless|sugar.?free|vegan|diabetic|gluten)/i) ||
        lowerText.match(/\b(delivery|minimum order|advance notice|payment method|custom)/i) ||
        lowerText.match(/\b(question|help|wondering|curious)\b/i)) {
      return 'faq';
    }
    
    // Order keywords - only for clear ordering intent
    if (lowerText.match(/\b(place|make|create|start|begin)\b.*(order|purchase)/i) ||
        lowerText.match(/\b(i want|i need|i'?d like|looking for)\b.*(to order|to buy|a cake|cupcake|cookie|brownie)/i) ||
        lowerText.match(/\border\b/i)) {
      return 'order';
    }
    
    return null;
  };

  const handleQuickReply = (reply: string) => {
    // Handle main menu actions
    if (reply === '🛍️ Place an Order') {
      setIsInOrderMode(true);
      setShowQuickActions(false);
      addUserMessage(reply);
      setTimeout(() => {
        addBotMessage(conversationFlow[0].question, conversationFlow[0].quickReplies);
      }, 500);
      return;
    }

    if (reply === '📋 View Menu & Prices' || reply === '📋 View Menu') {
      addUserMessage(reply);
      showMenuPrices();
      return;
    }

    if (reply === '📞 Contact Info' || reply === '📞 Contact Us') {
      addUserMessage(reply);
      showContactInfo();
      return;
    }

    if (reply === '❓ FAQs') {
      addUserMessage(reply);
      showFAQs();
      return;
    }

    if (reply === '💬 Message on WhatsApp') {
      addUserMessage(reply);
      const whatsappMessage = `Hi! I'd like to know more about your menu and pricing.`;
      const whatsappUrl = `https://wa.me/${contactInfo.whatsapp}?text=${encodeURIComponent(whatsappMessage)}`;
      window.open(whatsappUrl, '_blank');
      
      toast({
        title: "Opening WhatsApp! 💬",
        description: "Chat with us directly on WhatsApp!"
      });
      
      setTimeout(() => {
        addBotMessage(
          "Great! I've opened WhatsApp for you. Is there anything else I can help with?",
          ['🛍️ Place an Order', '📋 View Menu', '🏠 Main Menu'],
          800
        );
      }, 1000);
      return;
    }

    if (reply === '🏠 Main Menu') {
      addUserMessage(reply);
      setIsInOrderMode(false);
      setShowQuickActions(true);
      setMenuHistory([]);
      setTimeout(() => {
        const responses = [
          "Back to the main menu! What would you like to explore? 🎂",
          "Sure thing! How else can I help you? 😊",
          "No problem! What would you like to do next? 🧁"
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addBotMessage(
          randomResponse,
          ['🛍️ Place an Order', '📋 View Menu & Prices', '📞 Contact Info', '❓ FAQs']
        );
      }, 500);
      return;
    }

    // Handle Go Back in browse mode
    if (reply === '⬅️ Go Back' && !isInOrderMode && menuHistory.length > 0) {
      addUserMessage(reply);
      const newHistory = [...menuHistory];
      newHistory.pop(); // Remove current page
      setMenuHistory(newHistory);
      
      setTimeout(() => {
        addBotMessage(
          "Going back! What would you like to check out? 😊",
          ['🛍️ Place an Order', '📋 View Menu & Prices', '📞 Contact Info', '❓ FAQs']
        );
      }, 500);
      return;
    }

    // Check if it's a restart request
    if (reply === '🔄 Start New Order') {
      resetChat();
      setTimeout(() => {
        addBotMessage(
          "Hi there! 🧁 Welcome to Aishu's Dunkin Delicacies!\n\nHow can I help you today?",
          ['🛍️ Place an Order', '📋 View Menu & Prices', '📞 Contact Info', '❓ FAQs']
        );
      }, 300);
      return;
    }

    // Handle go back
    if (reply === '⬅️ Go Back' && conversationHistory.length > 0) {
      const previous = conversationHistory[conversationHistory.length - 1];
      
      // Remove last 2 messages (user answer + current bot question)
      setMessages(prev => {
        const newMessages = prev.slice(0, -2);
        // Update the last message (previous question) to include/exclude Go Back button
        if (newMessages.length > 0) {
          const lastMsg = newMessages[newMessages.length - 1];
          if (lastMsg.isBot) {
            // Update quick replies for the previous step
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

    // Continue with order flow if in order mode
    if (isInOrderMode) {
      addUserMessage(reply);
      const currentStepData = conversationFlow[currentStep];
      
      if (currentStepData.dataKey) {
        // Save current state to history before updating
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

    const currentStepData = conversationFlow[currentStep];
    
    // If not in order mode, detect intent
    if (!isInOrderMode) {
      const intent = detectIntent(userInput.trim());
      
      addUserMessage(userInput.trim());
      setUserInput('');
      
      if (intent === 'greeting') {
        const greetingResponses = [
          "Hello! 👋 Great to see you! How can I make your day sweeter?",
          "Hey there! 🧁 Welcome back! What can I help you with today?",
          "Hi! 😊 So happy you're here! Let me know what you need!"
        ];
        const randomGreeting = greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
        addBotMessage(
          randomGreeting,
          ['🛍️ Place an Order', '📋 View Menu & Prices', '📞 Contact Info', '❓ FAQs'],
          500
        );
        return;
      } else if (intent === 'thanks') {
        const thanksResponses = [
          "You're very welcome! 😊 Anything else I can help with?",
          "Happy to help! 🎂 What else can I do for you?",
          "My pleasure! 🧁 Is there anything else you'd like to know?"
        ];
        const randomThanks = thanksResponses[Math.floor(Math.random() * thanksResponses.length)];
        addBotMessage(
          randomThanks,
          ['🛍️ Place an Order', '📋 View Menu & Prices', '📞 Contact Info', '🏠 Main Menu'],
          500
        );
        return;
      } else if (intent === 'goodbye') {
        const goodbyeResponses = [
          "Goodbye! 👋 Thanks for stopping by! Can't wait to see you again! 🧁",
          "Take care! 😊 Come back soon for more delicious treats! 🎂",
          "Bye! 💕 See you next time at Aishu's Dunkin Delicacies!"
        ];
        const randomGoodbye = goodbyeResponses[Math.floor(Math.random() * goodbyeResponses.length)];
        addBotMessage(
          randomGoodbye,
          ['🏠 Main Menu'],
          500
        );
        return;
      } else if (intent === 'menu') {
        showMenuPrices();
        return;
      } else if (intent === 'contact') {
        showContactInfo();
        return;
      } else if (intent === 'faq') {
        showFAQs();
        return;
      } else if (intent === 'order') {
        setIsInOrderMode(true);
        setShowQuickActions(false);
        setTimeout(() => {
          addBotMessage(conversationFlow[0].question, conversationFlow[0].quickReplies);
        }, 500);
        return;
      } else {
        // If no intent detected, provide helpful suggestions
        const helpResponses = [
          "I'm here to help! 😊 Here's what I can do for you:",
          "Not quite sure what you're looking for, but I can help with these! 🎂",
          "Let me show you what I can help you with! 🧁"
        ];
        const randomHelp = helpResponses[Math.floor(Math.random() * helpResponses.length)];
        addBotMessage(
          randomHelp,
          ['🛍️ Place an Order', '📋 View Menu & Prices', '📞 Contact Info', '❓ FAQs'],
          500
        );
        return;
      }
    }
    
    // Validate input if validation function exists (for order mode)
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
      // Save current state to history before updating
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
        // Add "Go Back" option if not the first step
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
    // Use the passed order data or fall back to state
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
    // Use the passed order data or fall back to state
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

    // Add a completion message instead of resetting
    setTimeout(() => {
      addBotMessage(
        "✅ Your order has been sent to WhatsApp! If you'd like to place another order, just click the 'Start New Order' button below.",
        ['🔄 Start New Order'],
        800
      );
    }, 2000);
  };

  const resetChat = () => {
    setMessages([]);
    setOrderData({});
    setCurrentStep(0);
    setConversationHistory([]);
    setIsInOrderMode(false);
    setShowQuickActions(true);
    setMenuHistory([]);
    localStorage.removeItem('chatbot-state');
  };

  const clearChat = () => {
    resetChat();
    toast({
      title: "Chat Cleared! 🧹",
      description: "Starting fresh! How can I help you?"
    });
    setTimeout(() => {
      const greetings = [
        "Fresh start! 🎉 What would you like to do?",
        "All clear! 🧹 How can I help you today?",
        "Chat reset! 😊 What can I do for you?"
      ];
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      addBotMessage(
        randomGreeting,
        ['🛍️ Place an Order', '📋 View Menu & Prices', '📞 Contact Info', '❓ FAQs']
      );
    }, 500);
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
                  <h3 className="text-white font-bold">Aishu's Baker Bot</h3>
                  <p className="text-pink-100 text-xs">Your sweet assistant 🧁</p>
                </div>
              </div>
              <div className="flex items-center gap-1 relative z-10">
                <button
                  onClick={clearChat}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  title="Clear chat"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleChat}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
                  title="Close chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Progress Indicator */}
            {currentStep > 0 && currentStep < conversationFlow.length && (
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
                  {message.isBot && msgIndex > 0 && orderData.type && (
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
                    {/* Timestamp on hover - positioned above message */}
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
                    ) : (() => {
                      // Try to parse as JSON for special message types
                      try {
                        const parsed = JSON.parse(message.text);
                        
                        // Menu Card
                        if (parsed.type === 'menu') {
                          return (
                            <div className="space-y-3 max-w-md">
                              <div className="flex items-center gap-2 mb-3">
                                <Cake className="w-5 h-5 text-pink-500" />
                                <h4 className="font-bold text-pink-600">Our Menu & Prices</h4>
                              </div>
                              
                              {/* Cookies */}
                              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-3 border-2 border-orange-200">
                                <h5 className="font-bold text-orange-700 mb-2 flex items-center gap-2">
                                  🍪 Cookies
                                </h5>
                                <div className="space-y-1.5 text-xs">
                                  {menuData.cookies.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start bg-white/60 rounded p-2">
                                      <div className="flex-1">
                                        <p className="font-medium text-gray-800">{item.name}</p>
                                        <p className="text-gray-600 text-xs">{item.weight}</p>
                                      </div>
                                      <span className="font-bold text-orange-600 ml-2">{item.price}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Brownies */}
                              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-3 border-2 border-amber-200">
                                <h5 className="font-bold text-amber-700 mb-2 flex items-center gap-2">
                                  🍫 Brownies
                                </h5>
                                <div className="space-y-1.5 text-xs">
                                  {menuData.brownies.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start bg-white/60 rounded p-2">
                                      <div className="flex-1">
                                        <p className="font-medium text-gray-800">{item.name}</p>
                                        <p className="text-gray-600 text-xs">{item.weight}</p>
                                      </div>
                                      <span className="font-bold text-amber-600 ml-2">{item.price}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Cupcakes */}
                              <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-3 border-2 border-pink-200">
                                <h5 className="font-bold text-pink-700 mb-2 flex items-center gap-2">
                                  🧁 Cupcakes
                                </h5>
                                <div className="space-y-1.5 text-xs">
                                  {menuData.cupcakes.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start bg-white/60 rounded p-2">
                                      <div className="flex-1">
                                        <p className="font-medium text-gray-800">{item.name}</p>
                                        <p className="text-gray-600 text-xs">{item.weight}</p>
                                      </div>
                                      <span className="font-bold text-pink-600 ml-2">{item.price}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Cakes */}
                              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border-2 border-purple-200">
                                <h5 className="font-bold text-purple-700 mb-2 flex items-center gap-2">
                                  🎂 Artisan Cakes
                                </h5>
                                <div className="space-y-1.5 text-xs">
                                  {menuData.cakes.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start bg-white/60 rounded p-2">
                                      <div className="flex-1">
                                        <p className="font-medium text-gray-800">{item.name}</p>
                                        <p className="text-gray-600 text-xs">{item.weight}</p>
                                      </div>
                                      <span className="font-bold text-purple-600 ml-2">{item.price}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Healthy Options */}
                              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border-2 border-green-200">
                                <h5 className="font-bold text-green-700 mb-2 flex items-center gap-2">
                                  🌱 Healthy Options
                                </h5>
                                <div className="space-y-1.5 text-xs">
                                  {menuData.healthy.map((item, idx) => (
                                    <div key={idx} className="flex justify-between items-start bg-white/60 rounded p-2">
                                      <div className="flex-1">
                                        <p className="font-medium text-gray-800">{item.name}</p>
                                        <p className="text-gray-600 text-xs">{item.weight}</p>
                                      </div>
                                      <span className="font-bold text-green-600 ml-2">{item.price}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg p-2 text-center border border-pink-200">
                                <p className="text-xs text-gray-700 font-medium">💡 Custom orders & bulk discounts available!</p>
                              </div>
                            </div>
                          );
                        }
                        
                        // Contact Card
                        if (parsed.type === 'contact') {
                          return (
                            <div className="space-y-3 max-w-md">
                              <div className="flex items-center gap-2 mb-3">
                                <MessageCircle className="w-5 h-5 text-blue-500" />
                                <h4 className="font-bold text-blue-600">Contact Information</h4>
                              </div>
                              
                              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200 space-y-3">
                                <div className="flex items-center gap-3">
                                  <div className="bg-pink-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-lg">📱</span>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-600">Phone</p>
                                    <p className="font-semibold text-gray-800">{contactInfo.phone}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-lg">📧</span>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-600">Email</p>
                                    <p className="font-semibold text-gray-800 text-sm break-all">{contactInfo.email}</p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-3">
                                  <div className="bg-green-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-lg">💬</span>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-600">WhatsApp</p>
                                    <p className="font-semibold text-gray-800">{contactInfo.whatsapp}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200 space-y-2">
                                <h5 className="font-bold text-purple-700 flex items-center gap-2">
                                  ⏰ Business Hours
                                </h5>
                                <p className="text-sm text-gray-700">{contactInfo.hours}</p>
                              </div>

                              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4 border-2 border-orange-200 space-y-2">
                                <h5 className="font-bold text-orange-700 flex items-center gap-2">
                                  📦 Delivery Information
                                </h5>
                                <div className="space-y-1 text-sm text-gray-700">
                                  <p>• Minimum Order: <span className="font-semibold">{contactInfo.minOrder}</span></p>
                                  <p>• Advance Notice: <span className="font-semibold">{contactInfo.advanceNotice}</span></p>
                                  <p>• Service Area: <span className="font-semibold">Within city limits</span></p>
                                </div>
                              </div>

                              <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg p-2 text-center border border-pink-200">
                                <p className="text-xs text-gray-700 font-medium">😊 We're here to help!</p>
                              </div>
                            </div>
                          );
                        }
                        
                        // FAQ Card
                        if (parsed.type === 'faq') {
                          const faqs = [
                            {
                              q: "Do you make eggless cakes?",
                              a: "Yes! All our products can be made eggless. We also offer sugar-free and whole wheat options.",
                              icon: "🥚"
                            },
                            {
                              q: "How much advance notice do you need?",
                              a: `${contactInfo.advanceNotice} for custom orders. Standard items may be available sooner!`,
                              icon: "📅"
                            },
                            {
                              q: "What's your minimum order value?",
                              a: contactInfo.minOrder,
                              icon: "💰"
                            },
                            {
                              q: "Do you deliver?",
                              a: "Yes, we deliver within city limits. Delivery charges may apply based on distance.",
                              icon: "🚗"
                            },
                            {
                              q: "Can I customize my order?",
                              a: "Absolutely! We love creating custom designs. Just let us know your ideas!",
                              icon: "🎨"
                            },
                            {
                              q: "What payment methods do you accept?",
                              a: "We accept cash, UPI, and online transfers.",
                              icon: "💳"
                            }
                          ];

                          return (
                            <div className="space-y-3 max-w-md">
                              <div className="flex items-center gap-2 mb-3">
                                <span className="text-xl">❓</span>
                                <h4 className="font-bold text-indigo-600">Frequently Asked Questions</h4>
                              </div>
                              
                              {faqs.map((faq, idx) => (
                                <div key={idx} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-3 border-2 border-indigo-200">
                                  <div className="flex items-start gap-2 mb-2">
                                    <span className="text-lg flex-shrink-0">{faq.icon}</span>
                                    <p className="font-bold text-indigo-700 text-sm">{faq.q}</p>
                                  </div>
                                  <p className="text-sm text-gray-700 pl-8">{faq.a}</p>
                                </div>
                              ))}

                              <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg p-2 text-center border border-pink-200">
                                <p className="text-xs text-gray-700 font-medium">💬 Have more questions? Just ask!</p>
                              </div>
                            </div>
                          );
                        }
                      } catch (e) {
                        // Not a JSON message, render as regular text
                        return <p className="text-sm whitespace-pre-line">{message.text}</p>;
                      }
                      
                      return <p className="text-sm whitespace-pre-line">{message.text}</p>;
                    })()}
                    
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

            {/* Input Area */}
            {((isInOrderMode && conversationFlow[currentStep]?.requiresInput) || (!isInOrderMode && !isTyping)) && (
              <form onSubmit={handleInputSubmit} className="p-4 border-t border-pink-100 bg-white">
                <div className="flex gap-2">
                  <Input
                    value={userInput}
                    onChange={(e) => {
                      // Auto-format phone number as user types (only in order mode)
                      if (isInOrderMode && conversationFlow[currentStep]?.key === 'phone') {
                        const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setUserInput(digits);
                      } else {
                        setUserInput(e.target.value);
                      }
                    }}
                    placeholder={
                      isInOrderMode && conversationFlow[currentStep]?.key === 'phone' 
                        ? "Enter 10-digit number..." 
                        : isInOrderMode && conversationFlow[currentStep]?.key === 'name'
                        ? "Enter your name..."
                        : "Ask me anything..."
                    }
                    type={isInOrderMode && conversationFlow[currentStep]?.key === 'phone' ? 'tel' : 'text'}
                    maxLength={isInOrderMode && conversationFlow[currentStep]?.key === 'phone' ? 10 : undefined}
                    className="flex-1 border-pink-200 focus:border-pink-400"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600"
                    disabled={isInOrderMode && conversationFlow[currentStep]?.key === 'phone' && userInput.length !== 10}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                {isInOrderMode && conversationFlow[currentStep]?.key === 'phone' && userInput.length > 0 && (
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
                {isInOrderMode && conversationFlow[currentStep]?.key === 'name' && userInput.length > 0 && (
                  <p className="text-xs mt-2 text-gray-500">
                    {userInput.length} characters
                  </p>
                )}
                {!isInOrderMode && (
                  <p className="text-xs mt-2 text-gray-500">
                    💡 Try: "Show menu" • "Contact details" • "Do you make eggless?"
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
