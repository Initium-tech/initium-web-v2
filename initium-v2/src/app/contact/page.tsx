"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle, AlertCircle, Mail, MapPin, Phone } from 'lucide-react';

const formSchema = z.object({
    name: z.string().min(2, "El nombre es requerido"),
    email: z.string().email("Email inválido"),
    company: z.string().optional(),
    interest: z.enum(["Servicios", "Concho", "Concho Ads", "Otro"]),
    message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            interest: "Servicios"
        }
    });

    const onSubmit = async (data: FormData) => {
        setIsSubmitting(true);
        setSubmitStatus('idle');
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error('Error al enviar');

            setSubmitStatus('success');
            reset();
        } catch (error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-20 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">

                {/* Contact Info */}
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Hablemos de Integración Tecnológica</h1>
                    <p className="text-xl text-slate-300 leading-relaxed mb-12">
                        ¿Listo para transformar su negocio? Nuestro equipo de expertos está aquí para diseñar la solución perfecta.
                    </p>

                    <div className="space-y-8">
                        <div className="flex items-start gap-4">
                            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                                <Mail className="text-[#2BB7E9]" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Email</h3>
                                <p className="text-slate-400">info@initiumtec.com</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                                <MapPin className="text-[#2BB7E9]" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Ubicación</h3>
                                <p className="text-slate-400">San Juan, Puerto Rico</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                                <Phone className="text-[#2BB7E9]" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-lg">Soporte</h3>
                                <p className="text-slate-400">Disponible 24/7 para clientes Enterprise</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-white/5 p-8 md:p-10 rounded-3xl border border-white/10 backdrop-blur-md">
                    <h2 className="text-2xl font-bold text-white mb-6">Envíanos un Mensaje</h2>

                    {submitStatus === 'success' ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-green-500/10 border border-green-500/20 p-6 rounded-xl text-center"
                        >
                            <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
                            <h3 className="text-xl font-bold text-white mb-2">¡Mensaje Enviado!</h3>
                            <p className="text-green-200">Gracias por contactarnos. Responderemos breves momentos.</p>
                            <button
                                onClick={() => setSubmitStatus('idle')}
                                className="mt-6 text-sm text-green-400 hover:text-green-300 underline"
                            >
                                Enviar otro mensaje
                            </button>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Nombre Completo</label>
                                <input
                                    {...register('name')}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#2BB7E9] transition-colors"
                                    placeholder="Ej. Juan del Pueblo"
                                />
                                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                                    <input
                                        {...register('email')}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#2BB7E9] transition-colors"
                                        placeholder="juan@empresa.com"
                                    />
                                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-300 mb-2">Empresa (Opcional)</label>
                                    <input
                                        {...register('company')}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#2BB7E9] transition-colors"
                                        placeholder="Tu Empresa Inc."
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Estoy interesado en</label>
                                <select
                                    {...register('interest')}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#2BB7E9] transition-colors appearance-none"
                                >
                                    <option value="Servicios">Desarrollo de Software / Cloud</option>
                                    <option value="Concho">Concho (Movilidad)</option>
                                    <option value="Concho Ads">Concho Ads (Publicidad)</option>
                                    <option value="Otro">Otro Asunto</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">Mensaje</label>
                                <textarea
                                    {...register('message')}
                                    rows={4}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#2BB7E9] transition-colors resize-none"
                                    placeholder="Cuéntanos sobre tu proyecto..."
                                />
                                {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message.message}</p>}
                            </div>

                            {submitStatus === 'error' && (
                                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">
                                    <AlertCircle size={16} />
                                    <span>Hubo un error al enviar el mensaje. Intenta nuevamente.</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#2BB7E9] hover:bg-[#1A97C9] text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-[#2BB7E9]/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="animate-spin" /> Enviando...
                                    </>
                                ) : (
                                    "Enviar Mensaje"
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
