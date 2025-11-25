import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Cake, Cookie, Sparkles, ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import gsap from 'gsap';
import confetti from 'canvas-confetti';

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
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [orderData, setOrderData] = useState<OrderData>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [userInput, setUserInput] = useState('');
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load saved conversation from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('chatbot-state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setMessages(parsed.messages || []);
        setOrderData(parsed.orderData || {});
        setCurrentStep(parsed.currentStep || 0);
      } catch (e) {
        console.error('Failed to load saved state');
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
      question: "And your phone number so we can reach you?",
      quickReplies: [],
      dataKey: 'phone',
      requiresInput: true
    }
  ];

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(conversationFlow[0].question, conversationFlow[0].quickReplies);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && chatWindowRef.current) {
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
        ease: 'sine.inOut'
      });
    }
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
    // Check if it's a restart request
    if (reply === '🔄 Start New Order') {
      resetChat();
      setTimeout(() => {
        addBotMessage(conversationFlow[0].question, conversationFlow[0].quickReplies);
      }, 300);
      return;
    }

    addUserMessage(reply);
    const currentStepData = conversationFlow[currentStep];
    
    if (currentStepData.dataKey) {
      const updatedOrderData = {
        ...orderData,
        [currentStepData.dataKey!]: reply
      };
      setOrderData(updatedOrderData);
      moveToNextStep(updatedOrderData);
    } else {
      moveToNextStep();
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    addUserMessage(userInput);
    const currentStepData = conversationFlow[currentStep];
    
    if (currentStepData.dataKey) {
      const updatedOrderData = {
        ...orderData,
        [currentStepData.dataKey!]: userInput
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
        addBotMessage(
          conversationFlow[nextStep].question,
          conversationFlow[nextStep].quickReplies,
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

    const summary = `Perfect! Here's your order summary:\n\n🎂 Type: ${finalOrderData.type}\n🍰 Flavor: ${finalOrderData.flavor}\n🎉 Occasion: ${finalOrderData.occasion}\n📏 Size: ${finalOrderData.size}\n🎨 Theme: ${finalOrderData.theme}\n💰 Budget: ${finalOrderData.budget}\n\n👤 Name: ${finalOrderData.name}\n📱 Phone: ${finalOrderData.phone}\n\nLet's send this to WhatsApp to finalize your order! 🎊`;
    
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
      `Phone: ${dataToSend.phone}\n\n` +
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
    localStorage.removeItem('chatbot-state');
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
      gsap.to(chatWindowRef.current, {
        scale: 0,
        opacity: 0,
        y: 50,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => setIsOpen(false)
      });
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
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
            className="fixed bottom-24 right-6 w-96 h-[600px] rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-pink-200 backdrop-blur-xl bg-gradient-to-b from-cream/95 to-white/95"
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
              <button
                onClick={toggleChat}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors relative z-10"
              >
                <X className="w-5 h-5" />
              </button>
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
                  
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 shadow-lg ${
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
            {conversationFlow[currentStep]?.requiresInput && !isTyping && (
              <form onSubmit={handleInputSubmit} className="p-4 border-t border-pink-100 bg-white">
                <div className="flex gap-2">
                  <Input
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type your answer..."
                    className="flex-1 border-pink-200 focus:border-pink-400"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatbotWidget;
