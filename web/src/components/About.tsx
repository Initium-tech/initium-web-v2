import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, User } from 'lucide-react';

const About: React.FC = () => {
    return (
        <section className="py-20 relative bg-deep-logic">
            <div className="container mx-auto px-4">

                {/* Mission & Vision - Side by Side */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                    <motion.div
                        className="glass-dark p-8 rounded-2xl border border-white/5 relative group overflow-hidden"
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Target size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-initium-cyan/20 rounded-lg flex items-center justify-center mb-6 text-initium-cyan">
                                <Target size={24} />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Nuestra Misión</h2>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                Iniciar una nueva era de <span className="text-initium-cyan font-semibold">inclusión digital</span> en Puerto Rico.
                                Empoderamos a las comunidades mediante soluciones tecnológicas innovadoras en educación, salud y transporte,
                                asegurando que cada ciudadano tenga acceso a las herramientas modernas necesarias para prosperar.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        className="glass-dark p-8 rounded-2xl border border-white/5 relative group overflow-hidden"
                        whileHover={{ y: -5 }}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Eye size={120} />
                        </div>
                        <div className="relative z-10">
                            <div className="w-12 h-12 bg-ai-spark/20 rounded-lg flex items-center justify-center mb-6 text-ai-spark">
                                <Eye size={24} />
                            </div>
                            <h2 className="text-3xl font-bold text-white mb-4">Nuestra Visión</h2>
                            <p className="text-slate-300 text-lg leading-relaxed">
                                Un Puerto Rico resiliente y globalmente competitivo donde la tecnología es el puente hacia una mejor calidad de vida.
                                Visualizamos una isla donde cada estudiante aprende con herramientas de vanguardia y cada paciente recibe atención conectada sin barreras.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Founder Section */}
                <motion.div
                    className="max-w-4xl mx-auto glass-dark rounded-3xl p-8 md:p-12 border border-initium-cyan/10 relative overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-initium-cyan/5 to-transparent pointer-events-none" />

                    <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0 border-4 border-white/5 shadow-2xl">
                            {/* Placeholder for Founder Image - Using initials or icon if no image available */}
                            <User size={64} className="text-slate-600" />
                        </div>

                        <div className="text-center md:text-left">
                            <h3 className="text-2xl text-initium-cyan font-bold tracking-wide uppercase mb-2">Nuestro Fundador</h3>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Rafael I. García Rivera</h2>
                            <blockquote className="text-xl text-slate-300 italic mb-6 border-l-4 border-ai-spark pl-6 py-2">
                                "La tecnología por sí sola es una herramienta; la tecnología con propósito es transformación.
                                En Initium Tech, no solo escribimos código, construimos el futuro resiliente de Puerto Rico."
                            </blockquote>
                            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-slate-400 border border-white/5">Strategic Leadership</span>
                                <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-slate-400 border border-white/5">Hands-on Engineering</span>
                                <span className="px-3 py-1 bg-white/5 rounded-full text-sm text-slate-400 border border-white/5">Innovation with Purpose</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default About;
