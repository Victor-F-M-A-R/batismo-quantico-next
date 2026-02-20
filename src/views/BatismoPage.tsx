'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import DayTracker from '../components/DayTracker';

export default function BatismoPage() {
  return (
    <div className="min-h-screen bg-temple">
      {/* Header / Navigation */}
      <header className="border-b border-accent-gold-border">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="font-cinzel text-xs text-primary-muted tracking-[0.2em] 
                       hover:text-accent-gold transition-colors duration-300 cursor-pointer
                       flex items-center gap-3"
          >
            <span className="text-accent-gold/60">←</span>
            <span>INÍCIO</span>
          </Link>

          <h1 className="font-cinzel text-xs sm:text-sm text-primary tracking-[0.15em] sm:tracking-[0.25em]">
            O BATISMO
          </h1>

          <div className="font-cinzel text-xs text-accent-gold/40 tracking-widest hidden sm:block">
            21 DIAS
          </div>
        </div>
      </header>

      {/* Page Content */}
      <main className="max-w-3xl mx-auto px-6 py-10 sm:py-16">
        {/* Page Intro */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-px bg-accent-gold/25" />
            <span className="text-accent-gold/40 text-xs">∴</span>
            <div className="w-8 h-px bg-accent-gold/25" />
          </div>

          <h2 className="font-cinzel text-2xl sm:text-3xl text-primary tracking-wide mb-4">
            A Jornada dos <span className="text-accent-gold">21 Dias</span>
          </h2>
          <p className="font-inter text-primary-muted text-sm leading-relaxed max-w-lg mx-auto">
            Assista um vídeo por dia. Reflita. Registre seu insight. 
            A cada dia completado, um passo a mais na lapidação da sua pedra interior.
          </p>
        </motion.div>

        {/* Day Tracker Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <DayTracker />
        </motion.div>

        {/* Bottom Quote */}
        <motion.div
          className="mt-16 pt-10 border-t border-accent-gold-border text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <blockquote className="font-cinzel text-xs text-primary-muted/75 tracking-wider italic">
            "Visita Interiora Terrae Rectificando Invenies Occultum Lapidem"
          </blockquote>
          <p className="font-inter text-[10px] text-primary-muted/55 mt-2">
            Visita o interior da terra e, retificando, encontrarás a pedra oculta
          </p>
        </motion.div>
      </main>
    </div>
  );
}
