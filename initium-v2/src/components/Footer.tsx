"use client";

import React from 'react';
import Link from 'next/link';
import { Linkedin, Twitter, Mail, MapPin } from 'lucide-react';
// Asegúrate de que este archivo exista en: src/context/LanguageContext.tsx
import { useLanguage } from '@/context/LanguageContext';

const Footer: React.FC = () => {
    const { t } = useLanguage();

    const sections = [
        {
            title: t('nav.about'),
            links: [
                { name: t('nav.home'), href: '/' },
                { name: t('nav.about'), href: '/about' },
                { name: t('nav.portfolio'), href: '/portfolio' },
            ]
        },
        {
            title: 'Labs',
            links: [
                { name: 'Concho Labs', href: '/concho' },
                { name: 'Concho Ads', href: '/concho-ads' },
                { name: t('nav.contact'), href: '/contact' },
            ]
        }
    ];

    return (
        <footer className="bg-[#111B27] text-slate-400 py-16 border-t border-white/5 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Columna 1: Logo y Misión */}
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            {/* Asegúrate de que logo.svg esté en la carpeta public/assets */}
                            <img src="/assets/logo.svg" alt="Initium Tech Logo" className="h-8 w-auto" />
                        </Link>
                        <p className="text-sm leading-relaxed mb-6 font-light">
                            {t('mission.missionText')}
                        </p>
                    </div>

                    {/* Columnas Dinámicas: Secciones */}
                    {sections.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
                                {section.title}
                            </h3>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            href={link.href}
                                            className="hover:text-[#2BB7E9] transition-colors text-sm font-light"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Columna 4: Contacto */}
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">
                            Contacto
                        </h3>
                        <ul className="space-y-4 text-sm font-light">
                            <li className="flex items-center gap-3">
                                <Mail size={16} className="text-[#2BB7E9]" />
                                <span>info@initium.tech</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin size={16} className="text-[#2BB7E9]" />
                                <span>San Juan, Puerto Rico</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright y Redes Sociales */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs font-light tracking-widest uppercase">
                        © {new Date().getFullYear()} Initium Tech. All rights reserved.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="hover:text-[#2BB7E9] transition-colors">
                            <Linkedin size={18} />
                        </a>
                        <a href="#" className="hover:text-[#2BB7E9] transition-colors">
                            <Twitter size={18} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
