"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Gamepad2, Map as MapIcon, Sparkles } from 'lucide-react';

const ConchoPage: React.FC = () => {
    const { t } = useLanguage();

    const labProjects = [
        {
            title: t('concho.games.borinquen.title'),
            desc: t('concho.games.borinquen.desc'),
            icon: Gamepad2,
            type: 'IP Development'
        },
        {
            title: t('concho.games.rutas.title'),
            desc: t('concho.games.rutas.desc'),
            icon: MapIcon,
            type: 'Application'
        }
    ];

    return (
        <div className="container mx-auto px-4 py-20">
            {/* Header */}
            <div className="max-w-4xl mx-auto text-center mb-24">
                <div className="inline-flex items-center gap-2 bg-[#2BB7E9]/10 text-[#2BB7E9] px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                    <Sparkles size={14} /> Initium Labs
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
                    {t('concho.title')}
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed font-light">
                    {t('concho.subtitle')}
                </p>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {labProjects.map((project) => (
                    <motion.div
                        key={project.title}
                        whileHover={{ y: -8 }}
                        className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-md relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                            <project.icon size={120} />
                        </div>

                        <div className="w-16 h-16 bg-slate-800 rounded-2xl flex items-center justify-center mb-8 border border-white/10">
                            <project.icon className="text-[#2BB7E9]" size={32} />
                        </div>

                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#2BB7E9] opacity-70 mb-2 block">
                            {project.type}
                        </span>
                        <h2 className="text-2xl font-bold text-white mb-4 italic tracking-tight">{project.title}</h2>
                        <p className="text-slate-400 leading-relaxed font-light">
                            {project.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ConchoPage;
