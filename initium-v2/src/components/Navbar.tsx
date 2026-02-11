"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const { language, setLanguage, t } = useLanguage();

    const links = [
        { name: t('nav.home'), href: '/' },
        { name: t('nav.about'), href: '/about' },
        { name: t('nav.portfolio'), href: '/portfolio' },
        { name: t('nav.concho'), href: '/concho' },
        { name: t('nav.conchoAds'), href: '/concho-ads' },
        { name: t('nav.contact'), href: '/contact' },
    ];

    return (
        <nav className="fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md bg-[#1A2B3C]/70 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2">
                            <img src="/assets/logo.svg" alt="Initium Tech Logo" className="h-10 w-auto" />
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <div className="flex items-baseline space-x-4">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className={cn(
                                        "px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                                        pathname === link.href
                                            ? "text-[#2BB7E9] bg-white/10"
                                            : "text-gray-300 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Language Toggle */}
                        <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
                            <button
                                onClick={() => setLanguage('es')}
                                className={cn(
                                    "px-3 py-1 text-xs font-bold rounded-full transition-all",
                                    language === 'es' ? "bg-[#2BB7E9] text-white" : "text-gray-400 hover:text-white"
                                )}
                            >
                                ES
                            </button>
                            <button
                                onClick={() => setLanguage('en')}
                                className={cn(
                                    "px-3 py-1 text-xs font-bold rounded-full transition-all",
                                    language === 'en' ? "bg-[#2BB7E9] text-white" : "text-gray-400 hover:text-white"
                                )}
                            >
                                EN
                            </button>
                        </div>
                    </div>

                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#1A2B3C]/95 border-b border-white/5"
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "block px-3 py-2 rounded-md text-base font-medium",
                                        pathname === link.href
                                            ? "text-[#2BB7E9] bg-white/10"
                                            : "text-gray-300 hover:text-white hover:bg-white/5"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex items-center space-x-4 px-3 py-4 border-t border-white/10">
                                <span className="text-gray-400 text-sm">Language:</span>
                                <div className="flex items-center bg-white/5 rounded-full p-1 border border-white/10">
                                    <button
                                        onClick={() => { setLanguage('es'); setIsOpen(false); }}
                                        className={cn(
                                            "px-4 py-1 text-sm font-bold rounded-full transition-all",
                                            language === 'es' ? "bg-[#2BB7E9] text-white" : "text-gray-400 hover:text-white"
                                        )}
                                    >
                                        ES
                                    </button>
                                    <button
                                        onClick={() => { setLanguage('en'); setIsOpen(false); }}
                                        className={cn(
                                            "px-4 py-1 text-sm font-bold rounded-full transition-all",
                                            language === 'en' ? "bg-[#2BB7E9] text-white" : "text-gray-400 hover:text-white"
                                        )}
                                    >
                                        EN
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
