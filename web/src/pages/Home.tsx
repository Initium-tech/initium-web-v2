import React from 'react';
import Hero from '../components/Hero';
import Partners from '../components/Partners'; // Trust Bar
import ServicesComponent from '../components/Services'; // Main Services (Business Lines)
import SuccessStories from '../components/SuccessStories'; // Success Cases
import ContactForm from '../components/ContactForm';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const { t } = useLanguage();

    return (
        <>
            <Hero />

            {/* Trust Bar directly after Hero */}
            <Partners />

            {/* Mission Section (Short version for Homepage impact) */}
            <section className="py-20 bg-deep-logic border-b border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <span className="text-initium-cyan font-bold tracking-widest uppercase text-sm mb-4 block">Nuestra Misión</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                            Iniciar una nueva era de <span className="text-transparent bg-clip-text bg-gradient-to-r from-initium-cyan to-blue-400">inclusión digital</span>.
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl leading-relaxed mb-8">
                            Nuestra visión es un Puerto Rico donde cada estudiante, paciente y ciudadano esté conectado.
                            Tecnología con propósito para un futuro resiliente.
                        </p>
                        <Link to="/nosotros" className="inline-flex items-center text-white hover:text-initium-cyan transition-colors font-medium group">
                            Conoce más sobre nosotros <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Business Lines / Services */}
            <ServicesComponent />

            {/* Success Stories */}
            <SuccessStories />

            {/* Contact */}
            <ContactForm />
        </>
    );
};

export default Home;
