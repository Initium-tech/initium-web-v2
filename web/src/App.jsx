import React, { useState } from 'react';
import { Sparkles, Code, Globe, Database, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCard from './components/ServiceCard';
import TeamCard from './components/TeamCard';
import ChatbotPreview from './components/ChatbotPreview';
import Act60Section from './components/Act60Section';
import ParticlesBackground from './components/ParticlesBackground';
import ScrollReveal from './components/ScrollReveal';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const services = [
    {
      title: "AI Solutions",
      description: "Custom AI agents and large language models tailored to your business needs.",
      icon: Sparkles
    },
    {
      title: "Web Development",
      description: "Modern, high-performance web applications built with React and Next.js.",
      icon: Code
    },
    {
      title: "Cloud Infrastructure",
      description: "Scalable and secure cloud architecture on AWS, Azure, and Google Cloud.",
      icon: Globe
    }
  ];

  const team = [
    {
      name: "Rafael Garcia",
      role: "CEO & Founder",
      bio: "Visionary leader with a passion for innovation and technology.",
      image: null // Placeholder
    },
    {
      name: "AI Architect",
      role: "Lead Developer",
      bio: "Expert in machine learning and neural networks.",
      image: null // Placeholder
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-initium-cyan/30 selection:text-initium-cyan relative">

      {/* Network/Constellation Background */}
      <ParticlesBackground />

      {/* Background Gradient Orbs - kept for extra atmosphere */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-initium-cyan/10 rounded-full blur-[100px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-ai-spark/10 rounded-full blur-[100px] opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/5">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-initium-cyan to-ai-spark flex items-center justify-center text-white font-bold">
              IT
            </div>
            <span className="text-xl font-bold text-white tracking-tight">Initium Tech</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-sm font-medium hover:text-initium-cyan transition-colors">Services</a>
            <a href="#act60" className="text-sm font-medium hover:text-initium-cyan transition-colors">Act 60</a>
            <a href="#team" className="text-sm font-medium hover:text-initium-cyan transition-colors">Team</a>
            <button className="px-4 py-2 rounded-lg border border-initium-cyan/30 text-initium-cyan hover:bg-initium-cyan/10 transition-colors">
              Contact Us
            </button>
          </div>

          <button className="md:hidden p-2 text-slate-400 hover:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      <main className="relative z-10 pt-24 pb-20 space-y-32">

        {/* Hero Section */}
        <ScrollReveal className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-initium-cyan/30 bg-initium-cyan/10 text-initium-cyan text-xs font-bold mb-6 tracking-wide uppercase">
            Future of Tech
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Innovating for <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-initium-cyan to-ai-spark">
              Tomorrow's World
            </span>
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            We build cutting-edge software solutions that empower businesses to thrive in the digital age.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <motion.button
              className="px-8 py-3 bg-gradient-to-r from-initium-cyan to-ai-spark text-white font-bold rounded-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Get Started
            </motion.button>
            <motion.button
              className="px-8 py-3 glass-card text-white font-bold rounded-xl hover:bg-white/20"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Learn More
            </motion.button>
          </div>
        </ScrollReveal>

        {/* Services Section */}
        <section id="services" className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Our Expertise</h2>
              <div className="h-1 w-20 bg-gradient-to-r from-initium-cyan to-ai-spark mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </div>
          </ScrollReveal>
        </section>

        {/* Act 60 Section - Bento Grid */}
        <div id="act60">
          <ScrollReveal>
            <Act60Section />
          </ScrollReveal>
        </div>

        {/* Chatbot & Preview Section */}
        <section className="container mx-auto px-4">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1">
                <h2 className="text-4xl font-bold text-white mb-6">
                  Intelligent <span className="text-initium-cyan">AI Assistants</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8">
                  Enhance your customer support and automate workflows with our state-of-the-art chatbots.
                </p>
                <ul className="space-y-4 mb-8">
                  {['24/7 Availability', 'Multi-language Support', 'Seamless Integration'].map((item, i) => (
                    <li key={i} className="flex items-center text-slate-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-initium-cyan mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full">
                <ChatbotPreview />
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Team Section */}
        <section id="team" className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Meet the Team</h2>
              <p className="text-slate-400">The minds behind the innovation.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
              {/* Using simplified layout for now, centering constraints */}
              {team.map((member, index) => (
                <div key={index} className="md:col-span-1">
                  <TeamCard {...member} />
                </div>
              ))}
              <TeamCard name="Join Us" role="Open Positions" bio="We are always looking for talent." image={null} />
            </div>
          </ScrollReveal>
        </section>
      </main>

      <footer className="border-t border-white/5 bg-black/20 py-12 relative z-10">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p>&copy; 2026 Initium Tech. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
