import React from 'react';

const Partners: React.FC = () => {
    return (
        <div className="py-10 border-y border-white/5 bg-slate-950/50">
            <div className="container mx-auto px-4">
                <p className="text-center text-slate-500 text-sm uppercase tracking-widest mb-8">Partners Certificados & Stack Tecnológico</p>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                    {/* Microsoft Partner */}
                    <div className="flex items-center gap-3 group">
                        <span className="text-2xl font-bold text-white group-hover:text-[#00A4EF] transition-colors">Microsoft</span>
                        <span className="text-sm border border-slate-600 rounded px-2 py-0.5 text-slate-400 group-hover:border-[#00A4EF] group-hover:text-[#00A4EF]">Partner</span>
                    </div>

                    {/* AWS Partner */}
                    <div className="flex items-center gap-3 group">
                        <span className="text-2xl font-bold text-white group-hover:text-[#FF9900] transition-colors">aws</span>
                        <span className="text-sm border border-slate-600 rounded px-2 py-0.5 text-slate-400 group-hover:border-[#FF9900] group-hover:text-[#FF9900]">Partner</span>
                    </div>

                    {/* 3CX Partner */}
                    <div className="flex items-center gap-3 group">
                        <span className="text-2xl font-bold text-white group-hover:text-[#0099DD] transition-colors">3CX</span>
                        <span className="text-sm border border-slate-600 rounded px-2 py-0.5 text-slate-400 group-hover:border-[#0099DD] group-hover:text-[#0099DD]">Titanium Partner</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Partners;
