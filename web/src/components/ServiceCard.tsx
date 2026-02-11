import React from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
    title: string;
    description: string;
    icon: React.ElementType;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon: Icon }) => {
    return (
        <motion.div
            className="group relative p-8 glass-dark rounded-2xl border border-white/5 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-initium-cyan/0 via-initium-cyan/10 to-ai-spark/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="mb-6 inline-flex p-3 rounded-xl bg-white/5 text-initium-cyan group-hover:text-white group-hover:bg-gradient-to-r group-hover:from-initium-cyan group-hover:to-ai-spark transition-all duration-300">
                    <Icon className="w-8 h-8" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-initium-cyan group-hover:to-ai-spark transition-all duration-300">
                    {title}
                </h3>

                <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {description}
                </p>
            </div>
        </motion.div>
    );
};

export default ServiceCard;
