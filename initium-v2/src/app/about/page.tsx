"use client";

import React from 'react';
import * as LucideIcons from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

const { User, Linkedin } = LucideIcons;

const AboutPage: React.FC = () => {
    const { t } = useLanguage();

    const team = [
        {
            name: "Rafael I. García Rivera",
            role: t('about.team.rafael.role'),
            bio: t('about.team.rafael.bio'),
            linkedin: "#"
        },
        {
            name: "Lisbel Melendez",
            role: t('about.team.lisbel.role'),
            bio: t('about.team.lisbel.bio'),
            linkedin: "#"
        },
        {
            name: "Karim Nieves Otero",
            role: t('about.team.karim.role'),
            bio: t('about.team.karim.bio'),
            linkedin: "#"
        },
        {
            name: "José I. Skerrett",
            role: t('about.team.jose.role'),
            bio: t('about.team.jose.bio'),
            linkedin: "#"
        }
    ];

    return (
        <div className="container mx-auto px-4 py-20">
            <div className="max-w-4xl mx-auto text-center mb-24">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">{t('mission.title')}</h1>
                <p className="text-xl text-slate-300 leading-relaxed font-light">
                    {t('mission.visionText')}
                </p>
            </div>

            <div className="mb-24">
                <h2 className="text-3xl font-bold text-white mb-12 text-center">{t('about.title')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {team.map((member) => (
                        <div
                            key={member.name}
                            className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center hover:border-[#2BB7E9]/30 transition-colors backdrop-blur-md"
                        >
                            <div className="w-24 h-24 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-6 border-2 border-white/5">
                                <User size={48} className="text-slate-500" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                            <p className="text-[#2BB7E9] font-black uppercase tracking-tighter text-sm mb-4 italic opacity-80">
                                {member.role}
                            </p>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-light">
                                {member.bio}
                            </p>
                            <a href={member.linkedin} className="inline-flex items-center text-slate-500 hover:text-[#2BB7E9] transition-colors text-xs font-bold uppercase tracking-widest">
                                <Linkedin size={16} className="mr-2" /> LinkedIn Profile
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
