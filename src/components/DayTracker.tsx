'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const STORAGE_KEY = 'pedra-bruta-batismo';
const TOTAL_DAYS = 21;

interface DayData {
  completed: boolean;
  diary: string;
  completedAt?: string;
}

interface TrackerState {
  days: DayData[];
  currentDay: number;
}

const DEFAULT_STATE: TrackerState = {
  days: Array.from({ length: TOTAL_DAYS }, () => ({
    completed: false,
    diary: '',
  })),
  currentDay: 1,
};

const VIDEO_DATA = [
  { title: 'O Despertar da Consciência', videoId: 'LT11F4yqzNY' },
  { title: 'O Silêncio Interior', videoId: 'LT11F4yqzNY' },
  { title: 'A Pedra Bruta', videoId: 'LT11F4yqzNY' },
  { title: 'O Primeiro Golpe', videoId: 'LT11F4yqzNY' },
  { title: 'A Disciplina do Cinzel', videoId: 'LT11F4yqzNY' },
  { title: 'Paciência e Constância', videoId: 'LT11F4yqzNY' },
  { title: 'O Esquadro Interior', videoId: 'LT11F4yqzNY' },
  { title: 'Nível e Prumo', videoId: 'LT11F4yqzNY' },
  { title: 'A Régua de 24 Polegadas', videoId: 'LT11F4yqzNY' },
  { title: 'O Trabalho Noturno', videoId: 'LT11F4yqzNY' },
  { title: 'A Força da Vontade', videoId: 'LT11F4yqzNY' },
  { title: 'Beleza, Força e Sabedoria', videoId: 'LT11F4yqzNY' },
  { title: 'O Templo Interior', videoId: 'LT11F4yqzNY' },
  { title: 'As Colunas do Ser', videoId: 'LT11F4yqzNY' },
  { title: 'O Pavimento Mosaico', videoId: 'LT11F4yqzNY' },
  { title: 'A Estrela Flamejante', videoId: 'LT11F4yqzNY' },
  { title: 'O Olho que Tudo Vê', videoId: 'LT11F4yqzNY' },
  { title: 'A Acácia Imortal', videoId: 'LT11F4yqzNY' },
  { title: 'O Delta Luminoso', videoId: 'LT11F4yqzNY' },
  { title: 'A Cadeia de União', videoId: 'LT11F4yqzNY' },
  { title: 'A Pedra Polida', videoId: 'LT11F4yqzNY' },
];

function loadState(): TrackerState {
  if (typeof window === 'undefined') {
    return DEFAULT_STATE;
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as TrackerState;
      // Ensure it has the right structure
      if (parsed.days && parsed.days.length === TOTAL_DAYS) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }
  return DEFAULT_STATE;
}

function saveState(state: TrackerState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export default function DayTracker() {
  const [state, setState] = useState<TrackerState>(DEFAULT_STATE);
  const [selectedDay, setSelectedDay] = useState<number>(DEFAULT_STATE.currentDay);
  const [hasLoadedState, setHasLoadedState] = useState(false);

  useEffect(() => {
    const loadedState = loadState();
    setState(loadedState);
    setSelectedDay(loadedState.currentDay);
    setHasLoadedState(true);
  }, []);

  useEffect(() => {
    if (!hasLoadedState) {
      return;
    }

    saveState(state);
  }, [state, hasLoadedState]);

  const completedCount = state.days.filter((d) => d.completed).length;
  const progressPercent = (completedCount / TOTAL_DAYS) * 100;
  const selectedDayData = state.days[selectedDay - 1];
  const video = VIDEO_DATA[selectedDay - 1];
  const canSelect = (day: number) => day <= state.currentDay;
  const canComplete = selectedDay === state.currentDay && !selectedDayData.completed;

  const handleCompleteDay = useCallback(() => {
    setState((prev) => {
      const dayToComplete = prev.currentDay;
      const nextDay = Math.min(dayToComplete + 1, TOTAL_DAYS);
      const newDays = [...prev.days];
      newDays[dayToComplete - 1] = {
        ...newDays[dayToComplete - 1],
        completed: true,
        completedAt: new Date().toISOString(),
      };
      return {
        days: newDays,
        currentDay: nextDay,
      };
    });
    setSelectedDay((prevSelectedDay) => Math.min(prevSelectedDay + 1, TOTAL_DAYS));
  }, []);

  const handleDiaryChange = useCallback(
    (value: string) => {
      setState((prev) => {
        const newDays = [...prev.days];
        newDays[selectedDay - 1] = {
          ...newDays[selectedDay - 1],
          diary: value,
        };
        return { ...prev, days: newDays };
      });
    },
    [selectedDay]
  );

  const handleSelectDay = useCallback(
    (day: number) => {
      if (day <= state.currentDay) {
        setSelectedDay(day);
      }
    },
    [state.currentDay]
  );

  const isAllComplete = completedCount === TOTAL_DAYS;

  return (
    <div className="w-full">
      {/* Progress Bar - Top */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="font-cinzel text-sm text-primary-muted tracking-wider">PROGRESSO</span>
          <span className="font-cinzel text-sm text-accent-gold font-medium">
            {completedCount} / {TOTAL_DAYS} dias
          </span>
        </div>
        <div className="relative h-1.5 bg-temple-dark rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full"
            style={{
              background: 'linear-gradient(90deg, #A8863E, #C5A059, #D4B06A)',
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        {isAllComplete && (
          <motion.p
            className="text-center font-cinzel text-accent-gold text-sm mt-3 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ✦ A PEDRA FOI POLIDA ✦
          </motion.p>
        )}
      </div>

      {/* Day Grid - 21 circles */}
      <div className="mb-10">
        <h3 className="font-cinzel text-sm text-primary-muted tracking-wider mb-5">
          OS 21 DIAS
        </h3>
        <div className="grid grid-cols-7 gap-3 sm:gap-4">
          {state.days.map((day, i) => {
            const dayNum = i + 1;
            const isSelected = dayNum === selectedDay;
            const isAccessible = canSelect(dayNum);
            const isCompleted = day.completed;
            const isCurrent = dayNum === state.currentDay && !isCompleted;

            return (
              <motion.button
                key={dayNum}
                onClick={() => handleSelectDay(dayNum)}
                disabled={!isAccessible}
                className={`
                  relative aspect-square rounded-full flex items-center justify-center
                  text-sm font-cinzel font-medium transition-all duration-300 cursor-pointer
                  ${
                    isCompleted
                      ? 'bg-accent-gold text-white shadow-md'
                      : isCurrent
                      ? 'bg-white text-accent-gold border-2 border-accent-gold animate-glow'
                      : isAccessible
                      ? 'bg-white text-primary border border-accent-gold-border hover:border-accent-gold'
                      : 'bg-temple-dark text-primary-muted/40 cursor-not-allowed border border-transparent'
                  }
                  ${isSelected && !isCompleted ? 'ring-2 ring-accent-gold ring-offset-2 ring-offset-temple' : ''}
                `}
                whileHover={isAccessible ? { scale: 1.1 } : {}}
                whileTap={isAccessible ? { scale: 0.95 } : {}}
                layout
              >
                {isCompleted ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    ✓
                  </motion.span>
                ) : (
                  dayNum
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedDay}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {/* Video Section */}
          <div className="mb-8">
            <h2 className="font-cinzel text-xl sm:text-2xl text-primary mb-1">
              Dia {selectedDay}
            </h2>
            <p className="font-cinzel text-accent-gold text-base sm:text-lg mb-5">
              {video.title}
            </p>

            {/* Video Embed */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-primary/5 border border-accent-gold-border">
              <iframe
                src={`https://www.youtube.com/embed/LT11F4yqzNY?rel=0&modestbranding=1`}
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                sandbox="allow-scripts allow-same-origin allow-presentation allow-popups"
                loading="lazy"
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>

          {/* Diary */}
          <div className="mb-8">
            <label className="font-cinzel text-sm text-primary-muted tracking-wider block mb-3">
              INSIGHT DE HOJE
            </label>
            <textarea
              value={selectedDayData.diary}
              onChange={(e) => handleDiaryChange(e.target.value)}
              placeholder="Escreva aqui. Está feito para firmar seu compromisso com o EU SOU."
              className="w-full h-32 p-4 rounded-xl bg-white border border-accent-gold-border 
                         text-primary font-inter text-sm leading-relaxed resize-none
                         placeholder:text-primary-muted/40
                         focus:outline-none focus:border-accent-gold focus:ring-1 focus:ring-accent-gold/20
                         transition-all duration-300"
            />
          </div>

          {/* Complete Day Button */}
          {canComplete && (
            <motion.button
              onClick={handleCompleteDay}
              className="w-full py-4 rounded-xl font-cinzel text-base tracking-wider
                         border-2 border-accent-gold text-accent-gold
                         hover:bg-accent-gold hover:text-white
                         transition-all duration-300 cursor-pointer"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              COMPLETAR DIA {selectedDay} ✦
            </motion.button>
          )}

          {selectedDayData.completed && (
            <div className="w-full py-4 rounded-xl text-center font-cinzel text-sm tracking-wider text-accent-gold/60 border border-accent-gold-border bg-accent-gold-faint">
              ✓ DIA COMPLETADO
              {selectedDayData.completedAt && (
                <span className="block text-xs mt-1 text-primary-muted">
                  {new Date(selectedDayData.completedAt).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                  })}
                </span>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
