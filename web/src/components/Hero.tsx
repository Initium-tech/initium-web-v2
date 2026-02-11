import React from 'react';
import { motion } from 'framer-motion';
import ParticlesBackground from './ParticlesBackground';

const Hero: React.FC = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-deep-logic">
            {/* Background - Network Animation */}
            <div className="absolute inset-0 z-0">
                <ParticlesBackground />
            </div>

            {/* Gradient Overlay for modern dark theme feel */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-logic/50 to-deep-logic z-0 pointer-events-none" />

            {/* Content */}
            <div className="container mx-auto px-4 z-10 text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-initium-cyan/30 bg-initium-cyan/10 text-initium-cyan text-xs font-bold mb-8 tracking-widest uppercase backdrop-blur-sm">
                        Transformación Digital • Infraestructura • Innovación
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
                        Elevamos tu infraestructura. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-initium-cyan to-ai-spark animate-pulse">
                            Innovamos tu futuro.
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
                        Liderando la transformación digital de Puerto Rico.
                        Infraestructura resiliente y soluciones estratégicas diseñadas por <span className="text-initium-cyan font-medium">Rafael I. García Rivera</span>.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                        <motion.button
                            className="px-8 py-4 bg-gradient-to-r from-initium-cyan to-ai-spark text-deep-logic font-bold rounded-xl text-lg shadow-lg shadow-initium-cyan/25 hover:shadow-initium-cyan/40 transition-shadow"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Comenzar Transformación
                        </motion.button>

                        <motion.button
                            className="px-8 py-4 glass-card text-white font-bold rounded-xl text-lg hover:bg-white/10 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Conoce Nuestra Misión
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
