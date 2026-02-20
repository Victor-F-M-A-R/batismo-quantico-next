'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import WisdomRotator from '../components/home/WisdomRotator';
import DivineAuroraBg from '../components/hero/DivineAuroraBg';

const CONCEPTS = [
  {
    icon: 'â—¯',
    title: 'ConsciÃªncia',
    description:
      'O primeiro passo Ã© olhar para dentro. Reconhecer as arestas, as imperfeiÃ§Ãµes â€” e aceitar que a transformaÃ§Ã£o Ã© possÃ­vel.',
  },
  {
    icon: 'â—‡',
    title: 'PrÃ¡tica',
    description:
      'Cada dia Ã© um golpe de cinzel. A constÃ¢ncia molda o que a intenÃ§Ã£o desenha. O trabalho Ã© diÃ¡rio, silencioso e necessÃ¡rio.',
  },
  {
    icon: 'â–³',
    title: 'ElevaÃ§Ã£o',
    description:
      'A pedra polida nÃ£o Ã© o fim â€” Ã© o comeÃ§o. Elevada, ela se torna parte de algo maior: a construÃ§Ã£o do templo interior.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-temple flex flex-col">
      {/* Hero */}
      <section className="relative flex-1 flex items-center justify-center px-6 py-24 sm:py-32 overflow-hidden">
        <DivineAuroraBg />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          {/* Ornamental line */}
          <motion.div
            className="flex items-center justify-center gap-4 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <div className="w-12 h-px bg-accent-gold/30" />
            <span className="text-accent-gold/50 text-xs font-cinzel tracking-[0.4em]">
              âˆ´
            </span>
            <div className="w-12 h-px bg-accent-gold/30" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary font-medium leading-tight tracking-wide"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            DESBASTANDO
            <br />
            <span className="text-accent-gold">A PEDRA BRUTA</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-inter text-primary-muted text-lg sm:text-xl mt-8 leading-relaxed max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Uma jornada de 21 dias para a consciÃªncia EU SOU.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Link
              href="/batismo"
              className="group relative inline-flex items-center justify-center text-center leading-tight
                         px-9 py-3.5 font-cinzel text-xs sm:text-sm tracking-[0.16em]
                         rounded-full border border-accent-gold/45 bg-accent-gold text-white
                         shadow-[0_6px_20px_rgba(42,42,42,0.08),inset_0_1px_0_rgba(255,255,255,0.2)]
                         hover:shadow-[0_14px_32px_rgba(42,42,42,0.2),0_0_0_1px_rgba(197,160,89,0.45),0_0_28px_rgba(197,160,89,0.26),inset_0_1px_0_rgba(255,255,255,0.3)]
                         hover:-translate-y-1 hover:scale-[1.02] hover:brightness-105
                         transition-all duration-300 cursor-pointer backdrop-blur-sm"
            >
              <span className="relative z-10">INICIAR O BATISMO</span>
            </Link>
            <Link
              href="/alianca"
              className="group relative inline-flex items-center justify-center text-center leading-tight
                         px-9 py-3.5 font-cinzel text-xs sm:text-sm tracking-[0.14em]
                         rounded-full border border-primary/15 bg-white/75 text-primary/70
                         shadow-[0_4px_16px_rgba(42,42,42,0.06),inset_0_1px_0_rgba(255,255,255,0.9)]
                         hover:border-accent-gold/40 hover:text-primary hover:bg-white/92
                         hover:shadow-[0_12px_28px_rgba(42,42,42,0.16),0_0_0_1px_rgba(197,160,89,0.24),0_0_24px_rgba(197,160,89,0.16),inset_0_1px_0_rgba(255,255,255,0.96)]
                         hover:-translate-y-1 hover:scale-[1.02]
                         transition-all duration-300 cursor-pointer backdrop-blur-sm"
            >
              <span className="relative z-10">FAÃ‡A AQUI SUA ALIANÃ‡A COM DEUS</span>
            </Link>
          </motion.div>

          {/* Bottom ornament */}
          <motion.div
            className="flex items-center justify-center gap-3 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
          >
            <div className="w-16 h-px bg-accent-gold/15" />
            <span className="text-accent-gold/55 font-cinzel text-[10px] tracking-[0.5em]">
              Vâˆ´Iâˆ´Tâˆ´Râˆ´Iâˆ´Oâˆ´Lâˆ´
            </span>
            <div className="w-16 h-px bg-accent-gold/15" />
          </motion.div>
        </div>
      </section>

      {/* Wisdom Insights */}
      <WisdomRotator />

      {/* Concept Cards */}
      <section className="px-6 pb-24 sm:pb-32">
        <div className="max-w-5xl mx-auto">
          {/* Section divider */}
          <motion.div
            className="flex items-center justify-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-24 h-px bg-accent-gold/20" />
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {CONCEPTS.map((concept, i) => (
              <motion.div
                key={concept.title}
                className="text-center group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                {/* Icon */}
                <div className="mb-6">
                  <span className="font-cinzel text-3xl text-accent-gold/60 group-hover:text-accent-gold transition-colors duration-500">
                    {concept.icon}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-cinzel text-lg text-primary tracking-wider mb-4">
                  {concept.title}
                </h3>

                {/* Subtle line */}
                <div className="w-8 h-px bg-accent-gold/30 mx-auto mb-5" />

                {/* Description */}
                <p className="font-inter text-primary-muted text-sm leading-relaxed max-w-xs mx-auto">
                  {concept.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-accent-gold-border px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-cinzel text-xs text-primary-muted/50 tracking-widest">
            â–³ TEMPLO DIGITAL
          </p>
          <p className="font-inter text-xs text-primary-muted/40">
            "Conhece-te a ti mesmo e conhecerÃ¡s o universo e os deuses"
          </p>
        </div>
      </footer>
    </div>
  );
}
