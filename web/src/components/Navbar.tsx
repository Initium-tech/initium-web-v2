import React, { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { language, setLanguage, t } = useLanguage();

    const isActive = (path: string) => {
        return location.pathname === path ? "text-initium-cyan" : "text-slate-300 hover:text-white";
    };

    const toggleLanguage = () => {
        setLanguage(language === 'es' ? 'en' : 'es');
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/5">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-2 group">
                    <img src={logo} alt="Initium Tech" className="h-10 w-auto group-hover:brightness-110 transition-all" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
                    <Link to="/" className={`text-sm font-medium transition-colors ${isActive('/')}`}>{t('nav.home')}</Link>
                    <Link to="/nosotros" className={`text-sm font-medium transition-colors ${isActive('/nosotros')}`}>{t('nav.about')}</Link>
                    <Link to="/equipo" className={`text-sm font-medium transition-colors ${isActive('/equipo')}`}>{t('nav.team')}</Link>
                    <Link to="/servicios" className={`text-sm font-medium transition-colors ${isActive('/servicios')}`}>{t('nav.services')}</Link>
                    <Link to="/productos" className={`text-sm font-medium transition-colors ${isActive('/productos')}`}>{t('nav.products')}</Link>

                    <button
                        onClick={toggleLanguage}
                        className="flex items-center space-x-1 text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-white/5 transition-colors"
                    >
                        <Globe size={16} />
                        <span className="text-xs font-bold uppercase">{language}</span>
                    </button>

                    <Link to="/contacto" className="px-5 py-2 rounded-lg bg-initium-cyan/10 border border-initium-cyan/30 text-initium-cyan hover:bg-initium-cyan hover:text-deep-logic transition-all font-semibold text-sm">
                        {t('nav.cta')}
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center space-x-4 md:hidden">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center space-x-1 text-slate-400 hover:text-white"
                    >
                        <span className="text-sm font-bold uppercase">{language}</span>
                    </button>
                    <button className="p-2 text-slate-400 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden glass-dark border-t border-white/5">
                    <div className="flex flex-col p-4 space-y-4">
                        <Link to="/" className="text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>{t('nav.home')}</Link>
                        <Link to="/nosotros" className="text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>{t('nav.about')}</Link>
                        <Link to="/equipo" className="text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>{t('nav.team')}</Link>
                        <Link to="/servicios" className="text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>{t('nav.services')}</Link>
                        <Link to="/productos" className="text-slate-300 hover:text-white" onClick={() => setIsMenuOpen(false)}>{t('nav.products')}</Link>
                        <Link to="/contacto" className="text-initium-cyan font-bold" onClick={() => setIsMenuOpen(false)}>{t('nav.contact')}</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
