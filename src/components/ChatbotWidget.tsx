import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, X } from 'lucide-react';
import { ChatbotService, type ChatMessage } from '../services/ChatbotService';
import { motion, AnimatePresence } from 'framer-motion';

export const ChatbotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'bot',
      text: 'Olá! Sou a IA do Lucas. Pergunte-me sobre seus projetos ou experiência.',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const response = await ChatbotService.sendMessage(userMsg.text);
    
    setIsTyping(false);
    setMessages(prev => [...prev, {
      id: (Date.now() + 1).toString(),
      role: 'bot',
      text: response,
      timestamp: new Date()
    }]);
  };

  return (
    <div className="w-full lg:w-[350px] 2xl:w-[450px] relative z-10">
      {/* Container que fica "in-line" no fluxo em telas menores (descendo) e lateral em desktop */}
      <AnimatePresence>
        {isOpen ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-[#111116] border border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col h-[400px] max-h-[60vh] lg:h-[450px] 2xl:h-[600px]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800 bg-[#16161c]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-brand-primary/20 rounded-md">
                  <Bot size={18} className="text-brand-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Lucas AI Assist</h3>
                  <span className="text-[10px] text-green-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                    Online
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm font-mono scrollbar-thin scrollbar-thumb-gray-700">
              {messages.map(msg => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'bot' ? 'bg-brand-primary/20 text-brand-primary' : 'bg-gray-800 text-gray-300'}`}>
                    {msg.role === 'bot' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={`px-4 py-2 rounded-2xl max-w-[80%] ${msg.role === 'user' ? 'bg-brand-primary text-white rounded-tr-none' : 'bg-gray-800 text-gray-200 rounded-tl-none'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-brand-primary/20 text-brand-primary">
                    <Bot size={16} />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-gray-800 flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-gray-800 bg-[#16161c]">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Pergunte-me algo..."
                  className="w-full bg-gray-900 text-white placeholder-gray-500 text-sm font-mono rounded-lg pl-4 pr-10 py-2.5 outline-none border border-gray-800 focus:border-brand-primary/50 transition-colors"
                />
                <button 
                  type="submit" 
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-1.5 text-brand-primary hover:text-brand-accent disabled:text-gray-600 transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 w-14 h-14 bg-brand-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-brand-primary/30 hover:scale-105 transition-transform z-50"
          >
            <Bot size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
