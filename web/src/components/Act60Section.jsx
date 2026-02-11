import React from 'react';
import { ArrowUpRight, Percent, Award, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const BentoGridItem = ({ title, value, icon: Icon, description, colSpan = 1, bgClass = 'glass-dark' }) => (
    <motion.div
        className={`p-6 rounded-2xl border border-white/10 flex flex-col justify-between group ${bgClass} ${colSpan === 2 ? 'md:col-span-2' : ''}`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-white/5 rounded-xl text-initium-cyan group-hover:scale-110 transition-transform">
                {Icon && <Icon className="w-6 h-6" />}
            </div>
            {colSpan === 2 && (
                <span className="text-xs font-mono py-1 px-2 rounded-full border border-initium-cyan/30 text-initium-cyan bg-initium-cyan/10">
                    KEY BENEFIT
                </span>
            )}
        </div>

        <div>
            <h3 className="text-3xl font-bold text-white mb-1 group-hover:text-initium-cyan transition-colors">{value}</h3>
            <p className="text-lg font-medium text-slate-200 mb-2">{title}</p>
            <p className="text-sm text-slate-400">{description}</p>
        </div>
    </motion.div>
);

const Act60Section = () => {
    return (
        <section className="py-20 relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Act 60 <span className="text-transparent bg-clip-text bg-gradient-to-r from-initium-cyan to-ai-spark">Tax Incentives</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                        Unlock unparalleled tax advantages in Puerto Rico. Our comprehensive suite of services ensures you maximize these benefits.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                    {/* Main Feature - 4% Tax Rate */}
                    <BentoGridItem
                        colSpan={2}
                        title="Corporate Tax Rate"
                        value="4%"
                        icon={Percent}
                        description="Significantly reduce your corporate tax burden with Act 60's export service incentives."
                        bgClass="bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-md border-initium-cyan/20"
                    />

                    {/* Capital Gains - 0% */}
                    <BentoGridItem
                        title="Capital Gains"
                        value="0%"
                        icon={ArrowUpRight}
                        description="100% tax exemption on capital gains."
                    />

                    {/* Dividends - 0% */}
                    <BentoGridItem
                        title="Dividends"
                        value="100%"
                        icon={Award}
                        description="Tax exemption on distributions of dividends."
                    />

                    {/* Other stats */}
                    <BentoGridItem
                        title="Global Reach"
                        value="10+"
                        icon={Globe}
                        description="Years of experience serving international clients."
                    />

                    <motion.div
                        className="md:col-span-3 p-8 glass-dark rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 group hover:border-ai-spark/30"
                        whileHover={{ scale: 1.01 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">Ready to optimize your taxes?</h3>
                            <p className="text-slate-400">Schedule a consultation with our Act 60 experts today.</p>
                        </div>
                        <motion.button
                            className="px-8 py-3 bg-gradient-to-r from-initium-cyan to-ai-spark text-white font-bold rounded-xl"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            Get Started
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Act60Section;
