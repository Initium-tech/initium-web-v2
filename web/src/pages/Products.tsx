import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Database, FileText, ShoppingBag, Gamepad2, Map } from 'lucide-react';

const Products: React.FC = () => {
    return (
        <div className="pt-24 pb-20 container mx-auto px-4">

            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Nuestros Productos</h1>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                    Soluciones propias desarrolladas para resolver problemas reales en el mercado global.
                </p>
            </div>

            {/* Software Solutions */}
            <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-initium-cyan pl-4">Plataformas Enterprise</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                <div className="glass-dark p-8 rounded-2xl border border-white/10 hover:border-initium-cyan/30 transition-colors">
                    <div className="w-12 h-12 bg-initium-cyan/20 rounded-lg flex items-center justify-center text-initium-cyan mb-6">
                        <ShoppingBag size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Concho Ads</h3>
                    <p className="text-slate-400 mb-6">Plataforma de publicidad digital inteligente para redes de transporte y pantallas DOOH.</p>
                    <span className="text-xs font-mono py-1 px-2 rounded bg-white/5 text-slate-300">SaaS / Marketing Tech</span>
                </div>

                <div className="glass-dark p-8 rounded-2xl border border-white/10 hover:border-initium-cyan/30 transition-colors">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 mb-6">
                        <FileText size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">University Transcript System</h3>
                    <p className="text-slate-400 mb-6">Sistema seguro para la digitalización, verificación y envío de transcripciones académicas oficiales.</p>
                    <span className="text-xs font-mono py-1 px-2 rounded bg-white/5 text-slate-300">EdTech / Blockchain</span>
                </div>

                <div className="glass-dark p-8 rounded-2xl border border-white/10 hover:border-initium-cyan/30 transition-colors">
                    <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center text-green-400 mb-6">
                        <Database size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Requisition Management</h3>
                    <p className="text-slate-400 mb-6">Gestor de requisiciones y compras corporativas con flujos de aprobación automatizados.</p>
                    <span className="text-xs font-mono py-1 px-2 rounded bg-white/5 text-slate-300">Enterprise ERP</span>
                </div>
            </div>

            {/* Web Portfolio */}
            <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-purple-500 pl-4">Portafolio Web</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                <a href="https://proyectocoral2026.org" target="_blank" rel="noopener noreferrer" className="group relative rounded-2xl overflow-hidden aspect-video bg-slate-800 border border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    {/* Placeholder for iframe or image - using text for now */}
                    <div className="absolute bottom-0 left-0 p-8 z-20">
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-initium-cyan transition-colors flex items-center gap-2">
                            Proyecto Coral 2026 <ExternalLink size={18} />
                        </h3>
                        <p className="text-slate-300">Conservación marina y sostenibilidad.</p>
                    </div>
                </a>

                <a href="https://yaelabdielmusic.com" target="_blank" rel="noopener noreferrer" className="group relative rounded-2xl overflow-hidden aspect-video bg-slate-800 border border-white/10">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <div className="absolute bottom-0 left-0 p-8 z-20">
                        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-initium-cyan transition-colors flex items-center gap-2">
                            Yael Abdiel Music <ExternalLink size={18} />
                        </h3>
                        <p className="text-slate-300">Portal oficial de artista y streaming.</p>
                    </div>
                </a>
            </div>

            {/* In Development */}
            <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-ai-spark pl-4">En Desarrollo (Labs)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-dark p-6 rounded-2xl border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-yellow-500/20 text-yellow-500 text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                        Coming Soon
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white shrink-0">
                            <Gamepad2 size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">Borinquen Builder: La Islita Soñada</h3>
                            <p className="text-slate-400 text-sm mb-4">
                                Juego móvil de gestión y construcción que celebra la cultura puertorriqueña. Construye, gestiona y haz prosperar tu propia versión de la isla.
                            </p>
                            <div className="flex gap-2">
                                <span className="text-[10px] uppercase font-bold text-slate-500 border border-slate-700 px-2 py-0.5 rounded">Mobile Game</span>
                                <span className="text-[10px] uppercase font-bold text-slate-500 border border-slate-700 px-2 py-0.5 rounded">Unity/Godot</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-dark p-6 rounded-2xl border border-white/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-yellow-500/20 text-yellow-500 text-xs font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                        Beta
                    </div>
                    <div className="flex items-start gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-teal-500 rounded-xl flex items-center justify-center text-white shrink-0">
                            <Map size={32} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">ConchoExplora</h3>
                            <p className="text-slate-400 text-sm mb-4">
                                App turística que conecta viajeros con proveedores locales para crear aventuras personalizadas en Puerto Rico.
                            </p>
                            <div className="flex gap-2">
                                <span className="text-[10px] uppercase font-bold text-slate-500 border border-slate-700 px-2 py-0.5 rounded">Tourism Tech</span>
                                <span className="text-[10px] uppercase font-bold text-slate-500 border border-slate-700 px-2 py-0.5 rounded">Marketplace</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Products;
