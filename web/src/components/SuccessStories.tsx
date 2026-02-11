import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, TrendingUp, Server, BrainCircuit } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const SuccessStories: React.FC = () => {
    return (
        <section className="py-24 bg-deep-logic/50 border-t border-white/5">
            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <div className="text-center mb-16">
                        <span className="text-ai-spark font-bold tracking-widest uppercase text-sm mb-2 block">Casos de Éxito</span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Transformación Real</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            Resultados tangibles entregados a instituciones líderes en Puerto Rico.
                        </p>
                    </div>

                    <div className="glass-dark rounded-3xl overflow-hidden border border-white/10 p-8 md:p-12 relative group hover:border-initium-cyan/30 transition-colors">
                        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                            <Server size={300} textAnchor="middle" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                            <div>
                                <div className="inline-flex items-center space-x-2 bg-blue-900/30 text-blue-400 px-3 py-1 rounded-full text-xs font-bold uppercase mb-6 border border-blue-500/20">
                                    <BrainCircuit size={14} />
                                    <span>Modernización de Legacy Systems</span>
                                </div>

                                <h3 className="text-3xl font-bold text-white mb-4">Atlantic University College</h3>
                                <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                                    Modernización completa de la infraestructura AS400 (IBM iSeries). Implementamos una capa de optimización con Inteligencia Artificial para automatizar procesos administrativos y mejorar la experiencia estudiantil.
                                </p>

                                <ul className="space-y-4">
                                    <li className="flex items-start space-x-3">
                                        <CheckCircle2 className="text-initium-cyan shrink-0 mt-1" size={20} />
                                        <span className="text-slate-400">Integración de API moderna sobre sistemas legacy.</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <CheckCircle2 className="text-initium-cyan shrink-0 mt-1" size={20} />
                                        <span className="text-slate-400">Automatización de matrícula y transcripciones.</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <CheckCircle2 className="text-initium-cyan shrink-0 mt-1" size={20} />
                                        <span className="text-slate-400">Reducción del 40% en tiempos de procesamiento de datos.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="relative">
                                {/* Visual representation or placeholder for Case Study Graphic */}
                                <div className="aspect-square md:aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center relative overflow-hidden group-hover:shadow-2xl group-hover:shadow-initium-cyan/10 transition-all duration-500">
                                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]"></div>
                                    <div className="text-center p-8">
                                        <TrendingUp size={64} className="text-initium-cyan mx-auto mb-6" />
                                        <div className="text-5xl font-bold text-white mb-2">40%</div>
                                        <div className="text-slate-400 uppercase tracking-widest text-sm">Eficiencia Operativa</div>
                                    </div>

                                    {/* Animated elements */}
                                    <motion.div
                                        className="absolute -bottom-10 -right-10 w-40 h-40 bg-initium-cyan/20 rounded-full blur-3xl"
                                        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                                        transition={{ duration: 4, repeat: Infinity }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
};

export default SuccessStories;
