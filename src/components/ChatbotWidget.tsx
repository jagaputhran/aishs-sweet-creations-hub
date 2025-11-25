import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Cake, Cookie, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '@/hooks/use-toast';
import gsap from 'gsap';

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
  const { toast } = useToast();

  const conversationFlow = [
    {
      key: 'greeting',
      question: "Hi there! 🧁 Welcome to Aishu's Dunkin Delicacies! I'm here to help you create your perfect custom order. What would you like to order today?",
      quickReplies: ['🍰 Cake', '🧁 Cupcakes', '🥐 Pastries', '🍪 Cookies'],
      dataKey: 'type'
    },
    {
      key: 'flavor',
      question: "Yummy choice! What flavor are you craving?",
      quickReplies: ['🍫 Chocolate', '🍓 Strawberry', '🍋 Lemon', '🍦 Vanilla', '✨ Surprise Me'],
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
    const currentStepData = conversationFlow[currentStep];
    
    if (currentStepData.dataKey) {
      setOrderData(prev => ({
        ...prev,
        [currentStepData.dataKey!]: reply
      }));
    }

    moveToNextStep();
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    addUserMessage(userInput);
    const currentStepData = conversationFlow[currentStep];
    
    if (currentStepData.dataKey) {
      setOrderData(prev => ({
        ...prev,
        [currentStepData.dataKey!]: userInput
      }));
    }

    setUserInput('');
    moveToNextStep();
  };

  const moveToNextStep = () => {
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
      showSummaryAndSendToWhatsApp();
    }
  };

  const showSummaryAndSendToWhatsApp = () => {
    const summary = `Perfect! Here's your order summary:\n\n🎂 Type: ${orderData.type}\n🍰 Flavor: ${orderData.flavor}\n🎉 Occasion: ${orderData.occasion}\n📏 Size: ${orderData.size}\n🎨 Theme: ${orderData.theme}\n💰 Budget: ${orderData.budget}\n\n👤 Name: ${orderData.name}\n📱 Phone: ${orderData.phone}\n\nLet's send this to WhatsApp to finalize your order! 🎊`;
    
    addBotMessage(summary, [], 800);
    
    setTimeout(() => {
      sendToWhatsApp();
    }, 2000);
  };

  const sendToWhatsApp = () => {
    const message = `🧁 *Custom Order Request from Chatbot*\n\n` +
      `*Customer Details:*\n` +
      `Name: ${orderData.name}\n` +
      `Phone: ${orderData.phone}\n\n` +
      `*Order Details:*\n` +
      `Type: ${orderData.type}\n` +
      `Flavor: ${orderData.flavor}\n` +
      `Occasion: ${orderData.occasion}\n` +
      `Size: ${orderData.size}\n` +
      `Theme: ${orderData.theme}\n` +
      `Budget: ${orderData.budget}\n\n` +
      `Looking forward to creating something special! 🎂✨`;

    const whatsappUrl = `https://wa.me/918015102020?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    toast({
      title: "Opening WhatsApp! 🎉",
      description: "Your order details have been prepared. Complete your order on WhatsApp!",
    });

    setTimeout(() => {
      resetChat();
      setIsOpen(false);
    }, 2000);
  };

  const resetChat = () => {
    setMessages([]);
    setOrderData({});
    setCurrentStep(0);
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

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <div
            ref={chatWindowRef}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-gradient-to-b from-cream to-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border-2 border-pink-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-400 to-rose-500 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <Cake className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Aishu's Baker Bot</h3>
                  <p className="text-pink-100 text-xs">Your sweet assistant 🧁</p>
                </div>
              </div>
              <button
                onClick={toggleChat}
                className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 ${
                      message.isBot
                        ? 'bg-pink-50 text-gray-800 rounded-tl-none'
                        : 'bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-tr-none'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.text}</p>
                    {message.quickReplies && message.quickReplies.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {message.quickReplies.map((reply, index) => (
                          <button
                            key={index}
                            onClick={() => handleQuickReply(reply)}
                            className="bg-white text-pink-500 px-3 py-1.5 rounded-full text-xs font-medium hover:bg-pink-100 transition-colors border border-pink-200"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-pink-50 rounded-2xl rounded-tl-none p-3">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-pink-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-pink-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-pink-400 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
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