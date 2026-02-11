import React from 'react';
import ServiceCard from './ServiceCard';
import { GraduationCap, HeartPulse, Tablet, Network, Cloud, ShieldCheck } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import { useLanguage } from '../context/LanguageContext';

const ServicesComponent: React.FC = () => {
    const { t } = useLanguage();

    const mainServices = [
        {
            title: "EdTech Consulting",
            description: "Modernización de escuelas basada en integraciones de Microsoft y AWS. Transformamos el aula con infraestructura crítica y plataformas educativas.",
            icon: GraduationCap
        },
        {
            title: "HealthTech (SaludConnect)",
            description: "Plataforma de telemedicina bilingüe y segura (HIPAA compliant). Conectando pacientes y proveedores para un cuidado accesible.",
            icon: HeartPulse
        },
        {
            title: "Interactive Tablets",
            description: "Red de publicidad interactiva para rideshare. Tablets inteligentes que generan ingresos adicionales para conductores y conectan marcas con pasajeros.",
            icon: Tablet
        }
    ];

    const techStack = [
        {
            title: "Cloud Engineering",
            description: "Arquitecturas resilientes en AWS y Azure para máxima escalabilidad.",
            icon: Cloud
        },
        {
            title: "Comunicaciones Unificadas",
            description: "Modernización de telefonía IP avanzada como Partners de 3CX.",
            icon: Network
        },
        {
            title: "Ciberseguridad",
            description: "Protección de datos y cumplimiento normativo para sectores críticos.",
            icon: ShieldCheck
        }
    ];

    return (
        <section className="py-24 bg-slate-950 relative" id="services">
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-initium-cyan/50 to-transparent opacity-50"></div>

            <div className="container mx-auto px-4">
                <ScrollReveal>
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Líneas de Negocio</h2>
                        <div className="h-1.5 w-24 bg-gradient-to-r from-initium-cyan to-ai-spark mx-auto rounded-full mb-6"></div>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            {t('services.subtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
                        {mainServices.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>

                    {/* Secondary "Tech Capabilities" Section inline */}
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold text-white mb-4">Capacidades Tecnológicas</h3>
                        <p className="text-slate-500">Somos Partners Certificados de Microsoft, AWS y 3CX.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-90">
                        {techStack.map((tech, index) => (
                            <div key={index} className="p-6 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors group hover:border-initium-cyan/30">
                                <div className="text-initium-cyan mb-3 group-hover:scale-110 transition-transform origin-left">
                                    <tech.icon size={28} />
                                </div>
                                <h4 className="text-lg font-bold text-white mb-2">{tech.title}</h4>
                                <p className="text-slate-400 text-sm">{tech.description}</p>
                            </div>
                        ))}
                    </div>

                </ScrollReveal>
            </div>
        </section>
    );
};

export default ServicesComponent;
