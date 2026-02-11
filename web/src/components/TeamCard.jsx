import React from 'react';
import { Linkedin, Twitter, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const TeamCard = ({ name, role, image, bio }) => {
    return (
        <motion.div
            className="group relative glass-dark rounded-xl p-6 text-center border border-white/5"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div className="relative mx-auto w-32 h-32 mb-4 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-initium-cyan/50 transition-colors">
                {image ? (
                    <img src={image} alt={name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-slate-800 flex items-center justify-center text-slate-500">
                        No Image
                    </div>
                )}
            </div>

            <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
            <p className="text-initium-cyan font-medium text-sm mb-3">{role}</p>
            <p className="text-slate-400 text-sm mb-4 line-clamp-2">{bio}</p>

            <div className="flex justify-center space-x-3">
                <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-initium-cyan/20 text-slate-400 hover:text-white transition-colors">
                    <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-initium-cyan/20 text-slate-400 hover:text-white transition-colors">
                    <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-full bg-white/5 hover:bg-initium-cyan/20 text-slate-400 hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                </a>
            </div>
        </motion.div>
    );
};

export default TeamCard;
