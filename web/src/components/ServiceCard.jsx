import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceCard = ({ title, description, icon: Icon }) => {
    return (
        <motion.div
            className="group relative p-8 glass-dark rounded-2xl border border-white/5 overflow-hidden"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-initium-cyan/0 via-initium-cyan/10 to-ai-spark/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />

            <div className="relative z-10">
                <div className="mb-6 inline-flex p-3 rounded-lg bg-white/5 text-initium-cyan group-hover:text-white group-hover:bg-initium-cyan/20 transition-colors">
                    {Icon && <Icon className="w-6 h-6" />}
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-initium-cyan transition-colors">
                    {title}
                </h3>

                <p className="text-slate-400 mb-6 leading-relaxed">
                    {description}
                </p>

                <a href="#" className="inline-flex items-center text-sm font-medium text-slate-300 hover:text-white transition-colors">
                    Learn more <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </a>
            </div>
        </motion.div>
    );
};

export default ServiceCard;
