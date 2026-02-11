"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
}

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', text: "¡Hola! Soy el asistente virtual de Initium Tech. ¿En qué puedo ayudarte hoy?", sender: 'bot' }
    ]);
    const [input, setInput] = useState('');
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMsg: Message = { id: Date.now().toString(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        setInput('');

        // Simple mock response logic
        setTimeout(() => {
            let reply = "Gracias por tu mensaje. Un especialista te contactará pronto.";
            const lowerInput = input.toLowerCase();

            if (lowerInput.includes('concho')) {
                reply = "Concho es nuestra plataforma de movilidad y rideshare líder en Puerto Rico.";
            } else if (lowerInput.includes('servicios') || lowerInput.includes('services')) {
                reply = "Ofrecemos desarrollo de software a medida, consultoría en la nube (AWS/Azure) y soluciones de transformación digital.";
            } else if (lowerInput.includes('precio') || lowerInput.includes('costo')) {
                reply = "Cada proyecto es único. Contáctanos para una cotización personalizada.";
            }

            const botMsg: Message = { id: (Date.now() + 1).toString(), text: reply, sender: 'bot' };
            setMessages(prev => [...prev, botMsg]);
        }, 1000);
    };

    return (
        <>
            <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="fixed bottom-6 right-6 z-50 bg-[#2BB7E9] text-white p-4 rounded-full shadow-lg hover:bg-[#1A97C9] transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X /> : <Bot />}
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-50 w-80 md:w-96 bg-[#1A2B3C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-[#0f1923] p-4 flex items-center gap-3 border-b border-white/5">
                            <div className="w-8 h-8 rounded-full bg-[#2BB7E9]/20 flex items-center justify-center text-[#2BB7E9]">
                                <Bot size={18} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm">Initium AI Assistant</h3>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <span className="text-xs text-slate-400">Online</span>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={cn(
                                        "max-w-[80%] p-3 rounded-2xl text-sm",
                                        msg.sender === 'user'
                                            ? "bg-[#2BB7E9] text-white self-end ml-auto rounded-tr-none"
                                            : "bg-white/10 text-slate-200 self-start rounded-tl-none"
                                    )}
                                >
                                    {msg.text}
                                </div>
                            ))}
                            <div ref={endRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-[#0f1923] border-t border-white/5">
                            <form
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex gap-2"
                            >
                                <input
                                    type="text"
                                    placeholder="Escribe tu mensaje..."
                                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#2BB7E9] placeholder-slate-500"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                />
                                <button
                                    type="submit"
                                    className="bg-[#2BB7E9] text-white p-2 rounded-lg hover:bg-[#1A97C9] transition-colors disabled:opacity-50"
                                    disabled={!input.trim()}
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

// Quick util since we are inside component file (avoids import cycle issues during rapid dev)
function cn(...classes: (string | undefined | null | boolean)[]) {
    return classes.filter(Boolean).join(' ');
}

export default ChatWidget;
