"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { ArrowRight, Shield, Cpu, Cloud, Target, Eye } from 'lucide-react';
import PartnerBar from '@/components/PartnerBar';

const HomePage: React.FC = () => {
    const { t } = useLanguage();

    const services = [
        {
            title: "EdTech Consulting",
            description: "Modernización de infraestructuras educativas basadas en integraciones de Microsoft y AWS.",
            icon: Cpu
        },
        {
            title: "Cloud Engineering",
            description: "Arquitecturas resilientes y escalables para procesos críticos de negocio.",
            icon: Cloud
        },
        {
            title: "Cybersecurity",
            description: "Protección proactiva de activos digitales y cumplimiento de normativas.",
            icon: Shield
        }
    ];

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                            {t('hero.headline')}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
                            {t('hero.subheadline')}
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link
                                href="/portfolio"
                                className="px-8 py-4 bg-[#2BB7E9] text-white rounded-full font-bold hover:bg-[#24a3d1] transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(43,183,233,0.3)]"
                            >
                                {t('hero.cta')}
                                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Partner Trust Bar */}
            <PartnerBar />

            {/* Mission & Vision Section */}
            <section className="py-24 bg-[#1A2B3C]/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-center text-3xl md:text-4xl font-bold text-white mb-16">
                        {t('mission.title')}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-md"
                        >
                            <div className="w-12 h-12 bg-[#2BB7E9]/20 rounded-xl flex items-center justify-center mb-6">
                                <Target className="text-[#2BB7E9]" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{t('mission.missionTitle')}</h3>
                            <p className="text-lg text-slate-300 leading-relaxed font-light">
                                {t('mission.missionText')}
                            </p>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-md"
                        >
                            <div className="w-12 h-12 bg-[#2BB7E9]/20 rounded-xl flex items-center justify-center mb-6">
                                <Eye className="text-[#2BB7E9]" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{t('mission.visionTitle')}</h3>
                            <p className="text-lg text-slate-300 leading-relaxed font-light">
                                {t('mission.visionText')}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Core Services Grid */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-3xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:border-[#2BB7E9]/30 transition-all group"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-[#2BB7E9] transition-colors duration-500">
                                    <service.icon className="h-7 w-7 text-[#2BB7E9] group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{service.title}</h3>
                                <p className="text-slate-400 group-hover:text-slate-300 transition-colors leading-relaxed font-light">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
