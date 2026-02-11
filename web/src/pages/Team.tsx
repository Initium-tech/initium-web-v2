import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Mail, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Team: React.FC = () => {
    const { t } = useLanguage();

    const teamMembers = [
        {
            name: "Rafael I. García Rivera",
            role: "CEO & Founder",
            bio: {
                es: "Líder de TI con más de 20 años de experiencia y múltiples certificaciones en arquitectura cloud. Visionario detrás de la transformación digital de Initium Tech.",
                en: "IT Leader with over 20 years of experience and multiple cloud architecture certifications. The visionary behind Initium Tech's digital transformation."
            },
            tags: ["Cloud Architecture", "Strategy", "Leadership"]
        },
        {
            name: "José Skerrett",
            role: "COO",
            bio: {
                es: "Experto en operaciones, dirige el diseño de productos y desarrollo. Encargado de la división de desarrollo de Concho-Ads.",
                en: "Operations expert leading product design and development. Head of the Concho-Ads development division."
            },
            tags: ["Operations", "Product Design", "Concho-Ads"]
        },
        {
            name: "Karim O. Nieves",
            role: "Board Secretary & Marketing Director",
            bio: {
                es: "Estratega de marca y ventas, impulsando la presencia de Initium Tech en el mercado.",
                en: "Brand and sales strategist, driving Initium Tech's market presence."
            },
            tags: ["Marketing", "Brand Strategy", "Sales"]
        },
        {
            name: "Lisbel Meléndez",
            role: "CFO",
            bio: {
                es: "Encargada de las finanzas y operaciones globales de Initium Tech y Concho Ads.",
                en: "In charge of global finances and operations for Initium Tech and Concho Ads."
            },
            tags: ["Finance", "Operations", "Strategy"]
        }
    ];

    return (
        <div className="pt-24 pb-20 container mx-auto px-4 bg-deep-logic min-h-screen">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    {t('nav.team')}
                </h1>
                <div className="h-1.5 w-24 bg-gradient-to-r from-initium-cyan to-ai-spark mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                    <motion.div
                        key={index}
                        className="group relative glass-dark rounded-xl p-6 text-center border border-white/5 overflow-hidden hover:border-initium-cyan/30 transition-all"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <div className="w-24 h-24 mx-auto bg-slate-800 rounded-full flex items-center justify-center mb-6 border-4 border-white/5 shadow-xl group-hover:scale-105 transition-transform">
                            <User size={40} className="text-slate-500" />
                        </div>

                        <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                        <p className="text-initium-cyan font-medium text-xs uppercase tracking-wider mb-4">{member.role}</p>

                        <p className="text-slate-400 text-sm mb-6 leading-relaxed min-h-[80px]">
                            {/* @ts-ignore */}
                            {member.bio[t('lang') === 'en' ? 'en' : 'es'] || member.bio.es}
                        </p>

                        <div className="flex justify-center space-x-3">
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-initium-cyan/20 text-slate-400 hover:text-white transition-colors">
                                <Linkedin size={16} />
                            </a>
                            <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-initium-cyan/20 text-slate-400 hover:text-white transition-colors">
                                <Mail size={16} />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Team;
