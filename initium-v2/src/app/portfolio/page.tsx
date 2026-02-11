"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import TechStackCard from '@/components/TechStackCard';
import { ExternalLink } from 'lucide-react';

const PortfolioPage: React.FC = () => {
    const { t } = useLanguage();

    const cases = [
        {
            title: t('portfolio.cases.requisitions.title'),
            client: t('portfolio.cases.requisitions.client'),
            description: t('portfolio.cases.requisitions.desc'),
            stack: t('portfolio.cases.requisitions.stack').split(', '),
            iconType: 'aws' as const
        },
        {
            title: t('portfolio.cases.transcriptions.title'),
            client: t('portfolio.cases.transcriptions.client'),
            description: t('portfolio.cases.transcriptions.desc'),
            stack: t('portfolio.cases.transcriptions.stack').split(', '),
            iconType: 'as400' as const
        }
    ];

    const brandingLinks = [
        { name: 'Proyecto Coral 2026', url: 'https://proyectocoral2026.org' },
        { name: 'Yael Abdiel Music', url: 'https://yaelabdielmusic.com' }
    ];

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center mb-20">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-bold text-white mb-6"
                >
                    {t('portfolio.title')}
                </motion.h1>
                <p className="text-xl text-slate-300 font-light leading-relaxed">
                    {t('portfolio.subtitle')}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-32">
                {cases.map((c) => (
                    <TechStackCard key={c.title} {...c} />
                ))}
            </div>

            <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-white mb-10 text-center uppercase tracking-widest italic opacity-50">
                    Desarrollo Web & Branding
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {brandingLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between hover:bg-[#2BB7E9]/10 hover:border-[#2BB7E9]/30 transition-all group"
                        >
                            <span className="text-white font-bold">{link.name}</span>
                            <ExternalLink size={20} className="text-[#2BB7E9] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PortfolioPage;
