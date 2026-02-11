import React from 'react';
import { Monitor, Smartphone, PenTool, Layout } from 'lucide-react';

const WebDesign: React.FC = () => {
    return (
        <section className="py-20 bg-slate-950/50 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Diseño Web y Aplicaciones</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Fusionamos estética moderna con arquitectura robusta. Creamos experiencias digitales que no solo se ven bien, sino que impulsan resultados.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-initium-cyan/30 transition-colors group">
                        <div className="w-12 h-12 bg-initium-cyan/10 rounded-lg flex items-center justify-center text-initium-cyan mb-4 group-hover:scale-110 transition-transform">
                            <Monitor size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Web Corporativa</h3>
                        <p className="text-slate-400 text-sm">Portales institucionales y corporativos optimizados para SEO y velocidad.</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-initium-cyan/30 transition-colors group">
                        <div className="w-12 h-12 bg-ai-spark/10 rounded-lg flex items-center justify-center text-ai-spark mb-4 group-hover:scale-110 transition-transform">
                            <Smartphone size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Aplicaciones Móviles</h3>
                        <p className="text-slate-400 text-sm">Desarrollo nativo y multiplataforma (iOS/Android) centrado en la experiencia de usuario.</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-initium-cyan/30 transition-colors group">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
                            <Layout size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Sistemas a Medida</h3>
                        <p className="text-slate-400 text-sm">Dashboards administrativos, CRMs y plataformas SaaS escalables.</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-initium-cyan/30 transition-colors group">
                        <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center text-pink-400 mb-4 group-hover:scale-110 transition-transform">
                            <PenTool size={24} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">UI/UX Design</h3>
                        <p className="text-slate-400 text-sm">Prototipado interactivo y diseño de interfaces intuitivas y modernas.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WebDesign;
