"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Terminal, Database, Check } from 'lucide-react';

interface TechStackCardProps {
    title: string;
    client: string;
    description: string;
    stack: string[];
    iconType: 'aws' | 'as400';
}

const TechStackCard: React.FC<TechStackCardProps> = ({ title, client, description, stack, iconType }) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-md"
        >
            <div className="p-1 px-4 bg-[#2BB7E9]/10 border-b border-white/10 flex items-center justify-between">
                <span className="text-[10px] font-bold text-[#2BB7E9] uppercase tracking-[0.2em] italic">Initium Case Study</span>
                <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                    <div className="w-2 h-2 rounded-full bg-green-500/50" />
                </div>
            </div>

            <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center border border-white/10">
                        {iconType === 'aws' ? <Cpu className="text-[#2BB7E9]" /> : <Terminal className="text-[#2BB7E9]" />}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white leading-none mb-1">{title}</h3>
                        <p className="text-xs text-[#2BB7E9] uppercase font-black opacity-70 tracking-tighter">{client}</p>
                    </div>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-8 font-light">
                    {description}
                </p>

                <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Database size={12} /> Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {stack.map((tech) => (
                            <span
                                key={tech}
                                className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-slate-300 font-medium"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 text-[#2BB7E9]">
                        <Check size={16} />
                        <span className="text-xs font-bold uppercase tracking-widest">Delivered & Verified</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default TechStackCard;
