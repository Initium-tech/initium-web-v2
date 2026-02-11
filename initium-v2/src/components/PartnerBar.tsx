"use client";

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';

const PartnerBar: React.FC = () => {
    const { t } = useLanguage();

    const partners = [
        { name: 'Microsoft Partner', role: 'Venta y distribución' },
        { name: 'AWS Partner', role: 'Infraestructura Cloud' },
        { name: '3CX Reseller', role: 'Telefonía VoIP' },
    ];

    return (
        <div className="w-full bg-white/5 border-y border-white/10 py-10 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-xs uppercase tracking-[0.3em] text-[#2BB7E9] font-bold mb-8 opacity-70">
                    {t('partners.title')}
                </p>
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
                    {partners.map((partner) => (
                        <div
                            key={partner.name}
                            className="flex flex-col items-center group cursor-default"
                        >
                            <span className="text-xl md:text-2xl font-black text-slate-500 group-hover:text-slate-300 transition-colors tracking-tighter uppercase italic">
                                {partner.name.split(' ')[0]}
                                <span className="text-[#2BB7E9] opacity-50 group-hover:opacity-100 transition-opacity">
                                    {partner.name.split(' ')[1]}
                                </span>
                            </span>
                            <span className="text-[10px] uppercase tracking-widest text-slate-600 group-hover:text-[#2BB7E9] transition-colors mt-1 font-bold">
                                {partner.role}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PartnerBar;
