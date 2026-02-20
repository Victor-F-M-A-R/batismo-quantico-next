'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const insights = [
  {
    title: 'A Consciência do Eu Sou',
    text: 'Você não atrai o que quer, você atrai o que É. Quando você muda sua consciência de ser, o universo reorganiza a realidade ao seu redor.',
    ref: 'Princípio do Eu Sou',
  },
  {
    title: 'A Visão de Helicóptero',
    text: 'Saia do labirinto emocional. Eleve-se e observe seus problemas de cima, com desapego total, como quem assiste a um tabuleiro onde você é quem move as peças.',
    ref: 'Técnica de Observação',
  },
  {
    title: 'Vença a Resistência',
    text: 'O universo não consegue entregar nada se houver um muro de dúvida ou angústia. O segredo de receber é manter-se no estado de Bem-Estar inabalável.',
    ref: 'Lei do Recebimento',
  },
  {
    title: 'A Frequência do Cavalo Manco',
    text: 'Começar e não terminar gera uma frequência de fracasso. A lapidação da pedra exige constância. Quebre o ciclo de desistência agora.',
    ref: 'Alerta de Frequência',
  },
];

const INTERVAL_MS = 8000;

export default function WisdomRotator() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > current ? 1 : -1);
      setCurrent(index);
    },
    [current]
  );

  const goNext = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % insights.length);
  }, []);

  const goPrev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + insights.length) % insights.length);
  }, []);

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(goNext, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [goNext]);

  const insight = insights[current];

  const variants = {
    enter: (d: number) => ({
      opacity: 0,
      y: d > 0 ? 30 : -30,
    }),
    center: {
      opacity: 1,
      y: 0,
    },
    exit: (d: number) => ({
      opacity: 0,
      y: d > 0 ? -30 : 30,
    }),
  };

  return (
    <section className="px-6 py-20 sm:py-28">
      <div className="max-w-3xl mx-auto">
        {/* Section label */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-14"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-10 h-px bg-accent-gold/25" />
          <span className="font-cinzel text-[10px] tracking-[0.5em] text-accent-gold/50 uppercase">
            Sabedoria
          </span>
          <div className="w-10 h-px bg-accent-gold/25" />
        </motion.div>

        {/* Quote container */}
        <div className="relative min-h-[280px] sm:min-h-[240px] flex items-center justify-center">
          {/* Giant decorative quotes — background */}
          <span
            className="absolute top-0 left-0 sm:-left-4 font-cinzel text-[120px] sm:text-[160px] leading-none text-accent-gold/[0.07] select-none pointer-events-none -translate-y-4"
            aria-hidden="true"
          >
            "
          </span>
          <span
            className="absolute bottom-0 right-0 sm:-right-4 font-cinzel text-[120px] sm:text-[160px] leading-none text-accent-gold/[0.07] select-none pointer-events-none translate-y-4 rotate-180"
            aria-hidden="true"
          >
            "
          </span>

          {/* Navigation arrows — left */}
          <button
            onClick={goPrev}
            className="absolute left-0 sm:-left-14 top-1/2 -translate-y-1/2 z-10
                       w-10 h-10 flex items-center justify-center
                       text-accent-gold/30 hover:text-accent-gold transition-colors duration-300 cursor-pointer"
            aria-label="Insight anterior"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M13 4L7 10L13 16" />
            </svg>
          </button>

          {/* Navigation arrows — right */}
          <button
            onClick={goNext}
            className="absolute right-0 sm:-right-14 top-1/2 -translate-y-1/2 z-10
                       w-10 h-10 flex items-center justify-center
                       text-accent-gold/30 hover:text-accent-gold transition-colors duration-300 cursor-pointer"
            aria-label="Próximo insight"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 4L13 10L7 16" />
            </svg>
          </button>

          {/* Animated content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-center px-8 sm:px-12"
            >
              {/* Insight title */}
              <h3 className="font-cinzel text-lg sm:text-xl text-accent-gold tracking-wider mb-6">
                {insight.title}
              </h3>

              {/* Insight text */}
              <p className="font-inter italic text-primary text-base sm:text-lg leading-[1.8] max-w-2xl mx-auto">
                {insight.text}
              </p>

              {/* Reference tag */}
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="w-6 h-px bg-accent-gold/25" />
                <span className="font-cinzel text-[11px] tracking-[0.3em] text-primary-muted/60 uppercase">
                  {insight.ref}
                </span>
                <div className="w-6 h-px bg-accent-gold/25" />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dot indicators */}
        <div className="flex items-center justify-center gap-3 mt-10">
          {insights.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className="group relative p-1 cursor-pointer"
              aria-label={`Ir para insight ${i + 1}`}
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                animate={{
                  backgroundColor:
                    i === current
                      ? 'rgba(197, 160, 89, 0.9)'
                      : 'rgba(197, 160, 89, 0.2)',
                  scale: i === current ? 1.3 : 1,
                }}
                transition={{ duration: 0.4 }}
              />
            </button>
          ))}
        </div>

        {/* Auto-rotate progress bar */}
        <div className="mt-6 flex justify-center">
          <div className="w-24 h-[2px] bg-accent-gold/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent-gold/40 rounded-full"
              key={current}
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: INTERVAL_MS / 1000, ease: 'linear' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
