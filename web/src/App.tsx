import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Team from './pages/Team';
import Services from './pages/Services'; // Wrapper page that includes ServicesComponent + WebDesign
import Contact from './pages/Contact';
import ChatWidget from './components/ChatWidget';
// import SuccessStories from './components/SuccessStories'; // Integrated into Home, but could be a route if desired
import logo from './assets/logo.svg';
import { LanguageProvider, useLanguage } from './context/LanguageContext';

// Layout component extracts useLanguage hook and renders Navbar, Footer, and Content
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();
    const { t } = useLanguage();

    // Scroll to top on route change
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <div className="min-h-screen bg-deep-logic text-slate-200 font-sans selection:bg-initium-cyan/30 selection:text-initium-cyan flex flex-col">
            <Navbar />

            <main className="flex-grow">
                {children}
            </main>

            <ChatWidget />

            <footer className="border-t border-white/5 bg-[#0f1923] py-16 relative z-10 mt-auto">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <img src={logo} alt="Initium Tech" className="h-8 w-auto mb-6 opacity-80" />
                        <p className="text-slate-500 text-sm leading-relaxed">
                            {t('hero.subtitle')}
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">{t('footer.solutions')}</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li><Link to="/productos" className="hover:text-initium-cyan transition-colors">EdTech</Link></li>
                            <li><Link to="/productos" className="hover:text-initium-cyan transition-colors">SaludConnect</Link></li>
                            <li><Link to="/productos" className="hover:text-initium-cyan transition-colors">Concho Ads</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">{t('footer.company')}</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li><Link to="/nosotros" className="hover:text-initium-cyan transition-colors">{t('nav.about')}</Link></li>
                            <li><Link to="/equipo" className="hover:text-initium-cyan transition-colors">{t('nav.team')}</Link></li>
                            <li><Link to="/contacto" className="hover:text-initium-cyan transition-colors">{t('nav.contact')}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4">{t('footer.contact')}</h4>
                        <ul className="space-y-2 text-sm text-slate-500">
                            <li><a href="mailto:info@initiumtec.com" className="hover:text-initium-cyan transition-colors">info@initiumtec.com</a></li>
                            <li><span className="text-slate-600">San Juan, Puerto Rico</span></li>
                        </ul>
                    </div>
                </div>

                <div className="container mx-auto px-4 border-t border-white/5 pt-8 text-center">
                    <p className="text-slate-600 text-xs">&copy; 2026 Initium Tech. {t('footer.rights')}</p>
                </div>
            </footer>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <LanguageProvider>
            <Router>
                <Layout>
                    <Routes>
                        {/* A. Homepage */}
                        <Route path="/" element={<Home />} />

                        {/* B. Servicios y Productos */}
                        <Route path="/servicios" element={<Services />} />
                        <Route path="/productos" element={<Products />} />

                        {/* C. Sobre Nosotros (Liderazgo) + Mission/Vision */}
                        <Route path="/equipo" element={<Team />} />
                        <Route path="/nosotros" element={<About />} />

                        {/* Contact */}
                        <Route path="/contacto" element={<Contact />} />
                    </Routes>
                </Layout>
            </Router>
        </LanguageProvider>
    );
}

export default App;
