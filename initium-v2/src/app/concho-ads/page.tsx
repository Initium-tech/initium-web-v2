"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Monitor, BarChart3, Radio } from 'lucide-react';

const ConchoAdsPage: React.FC = () => {
    const { t } = useLanguage();

    const features = [
        { title: 'DOOH Display', icon: Monitor },
        { title: 'Target Analytics', icon: BarChart3 },
        { title: 'Segmented Exposure', icon: Radio },
    ];

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center mb-20">
                <div className="inline-flex items-center bg-yellow-500/20 text-yellow-500 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-yellow-500/30">
                    MVP Phase
                </div>
                <div className="flex justify-center mb-4">
                    <img src="/assets/concho-icon-gold.png" alt="Concho Logo" className="h-24 w-auto" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tighter italic">
                    CONCHO<span className="text-[#2BB7E9] not-italic">ADS</span>
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed font-light">
                    Transformamos el mercado local con publicidad digital <strong>DOOH (Digital Out Of Home)</strong>. Segmentación real para experiencias memorables.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {features.map((feature, index) => (
                    <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white/5 border border-white/10 p-8 rounded-3xl text-center backdrop-blur-md"
                    >
                        <div className="w-14 h-14 mx-auto bg-[#2BB7E9]/10 rounded-2xl flex items-center justify-center mb-6 border border-[#2BB7E9]/20 font-bold">
                            <feature.icon className="text-[#2BB7E9]" />
                        </div>
                        <h3 className="text-lg font-bold text-white uppercase tracking-widest mb-2 italic">{feature.title}</h3>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ConchoAdsPage;
