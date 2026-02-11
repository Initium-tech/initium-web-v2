import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import AnimatedBackground from "@/components/AnimatedBackground";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

import { LanguageProvider } from "@/context/LanguageContext";

export const metadata: Metadata = {
    title: "Initium Tech - Innovación Tecnológica para el Caribe",
    description: "Soluciones de transformación digital, desarrollo de software y movilidad (Concho, Concho Ads).",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es">
            <LanguageProvider>
                <body className="font-sans bg-[#1A2B3C] text-slate-300 min-h-screen relative">
                    <AnimatedBackground />
                    <Navbar />
                    <main className="flex-grow pt-16 min-h-screen relative z-10">
                        {children}
                    </main>
                    <ChatWidget />
                    <Footer />
                </body>
            </LanguageProvider>
        </html>
    );
}
