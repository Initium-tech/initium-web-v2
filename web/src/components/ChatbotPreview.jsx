import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { chatService } from '../services/ChatService';

const ChatbotPreview = () => {
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: 'Hello! How can Initium Tech help you today?' },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMsg = { id: Date.now(), type: 'user', text: inputValue };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        try {
            const response = await chatService.sendMessage(userMsg.text);
            const botMsg = {
                id: Date.now() + 1,
                type: 'bot',
                text: response.text,
                source: response.source
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: "Critical system error." }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="w-full max-w-md mx-auto glass-dark rounded-2xl border border-white/10 overflow-hidden shadow-2xl flex flex-col h-[500px]">
            {/* Header */}
            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-initium-cyan/20 rounded-lg text-initium-cyan">
                        <Bot className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-white font-medium">Initium Assistant</h3>
                        <p className="text-xs text-green-400 flex items-center">
                            <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                            Online
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-black/20">
                {messages.map((msg) => (
                    <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.type === 'user'
                                    ? 'bg-initium-cyan text-slate-900 rounded-tr-none'
                                    : 'bg-white/10 text-slate-200 rounded-tl-none border border-white/5'
                                }`}
                        >
                            {msg.text}
                            {msg.source && (
                                <span className="block text-[10px] opacity-50 mt-1 uppercase tracking-wider">
                                    Src: {msg.source}
                                </span>
                            )}
                        </div>
                    </motion.div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white/10 rounded-2xl rounded-tl-none p-3 border border-white/5 flex space-x-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5 shrink-0">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full bg-black/40 text-white pl-4 pr-10 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-initium-cyan/50 focus:ring-1 focus:ring-initium-cyan/50 transition-all placeholder-slate-500"
                    />
                    <button
                        onClick={handleSend}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-initium-cyan text-slate-900 rounded-lg hover:bg-white transition-colors"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatbotPreview;
