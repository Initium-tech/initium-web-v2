import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactForm: React.FC = () => {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');

        // Simulating email sending logic
        // In a real application, this would call an API endpoint
        setTimeout(() => {
            // For now, we simulate success. 
            // Ideally this connects to a backend service like SendGrid or a serverless function
            console.log("Form submitted:", formData);
            // Use window.location.href to open mail client as a fallback or simpler v1 implementation
            window.location.href = `mailto:info@initiumtec.com?subject=Contact from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.email}`;
            setFormState('success');
            setFormData({ name: '', email: '', message: '' });
        }, 1500);
    };

    return (
        <section className="py-20 bg-deep-logic border-t border-white/5" id="contact">
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-white mb-4">Contáctanos</h2>
                    <p className="text-slate-400">¿Listo para transformar tu infraestructura? Escríbenos.</p>
                </div>

                <div className="glass-dark p-8 rounded-2xl border border-white/10">
                    {formState === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                                <CheckCircle size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">¡Mensaje Enviado!</h3>
                            <p className="text-slate-400">Gracias por contactarnos. Te responderemos a la brevedad a info@initiumtec.com.</p>
                            <button
                                onClick={() => setFormState('idle')}
                                className="mt-6 text-initium-cyan hover:underline"
                            >
                                Enviar otro mensaje
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-2">Nombre</label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-initium-cyan transition-colors"
                                        placeholder="Tu nombre"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-2">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-initium-cyan transition-colors"
                                        placeholder="tu@email.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-2">Mensaje</label>
                                <textarea
                                    id="message"
                                    required
                                    rows={4}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-initium-cyan transition-colors"
                                    placeholder="¿Cómo podemos ayudarte?"
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={formState === 'submitting'}
                                className="w-full bg-gradient-to-r from-initium-cyan to-ai-spark text-deep-logic font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-initium-cyan/20 transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {formState === 'submitting' ? (
                                    <span>Enviando...</span>
                                ) : (
                                    <>
                                        <span>Enviar Mensaje</span>
                                        <Send size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
