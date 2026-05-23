"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export interface TimelineItem {
  year: number;
  title: string;
  description: string;
  photo: string;
}

const DEFAULTS: TimelineItem[] = [
  {
    year: 2016,
    title: "O Blog",
    description: "A fundação do nosso grupo se iniciou como apenas um blog. Criado pela professora Juliana Fernandes, o blog tinha como objetivo compartilhar informações sobre dança e cultura.",
    photo: "https://images.unsplash.com/photo-1547153760-18fc86324498?q=80&w=600&auto=format&fit=crop",
  },
  {
    year: 2022,
    title: "O Grupo",
    description: "A partir do blog, nasceu o grupo. Com aulas e ensaios, começamos a dar vida às nossas ideias e coreografias.",
    photo: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=600&auto=format&fit=crop",
  },
  {
    year: 2023,
    title: "Primeiro Espetáculo",
    description: "Ganhamos os palcos. A luzes se acenderam para o nosso primeiro espetáculo oficial e autoral, mesclando técnica e teatralidade.",
    photo: "https://images.unsplash.com/photo-1518063319789-7217e6706b04?q=80&w=600&auto=format&fit=crop",
  },
  {
    year: 2024,
    title: "Expansão e Reconhecimento",
    description: "Novos bailarinos, novas histórias. Apresentamo-nos em festivais regionais, solidificando nossa identidade artística.",
    photo: "https://images.unsplash.com/photo-1533147670608-2a2f9776d3ac?q=80&w=600&auto=format&fit=crop",
  },
  {
    year: 2026,
    title: "Novos Horizontes",
    description: "Criação de novos espetáculos autorais, turmas de diferentes idades e níveis, e workshops.",
    photo: "https://images.unsplash.com/photo-1533147670608-2a2f9776d3ac?q=80&w=600&auto=format&fit=crop",
  },
];

export default function AboutTimeline() {
  const [timelineData, setTimelineData] = useState<TimelineItem[]>(DEFAULTS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetch("/api/admin/contents")
      .then((r) => r.json())
      .then((contents: Array<{ key: string; value: string }>) => {
        if (!Array.isArray(contents)) return;
        const item = contents.find((c) => c.key === "timeline_items");
        if (!item) return;
        const parsed = JSON.parse(item.value) as TimelineItem[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setTimelineData(parsed);
        }
      })
      .catch(() => {}); // Silently fall back to defaults
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % timelineData.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, timelineData.length]);

  const handleManualClick = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
  };

  return (
      <section id="Sobre" className="relative w-full py-16 md:py-24 min-h-[auto] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Year Texture */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none z-0">
          <motion.h2 
            key={timelineData[activeIndex]?.year}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="text-[25vw] font-display font-bold leading-none text-tertiary-light select-none whitespace-nowrap"
          >
            {timelineData[activeIndex]?.year}
          </motion.h2>
        </div>

        <div className="container mx-auto px-5 md:px-12 lg:px-24 z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-24">
            
            {/* Image Side (Left) */}
            <div className="w-full md:w-1/2 aspect-[4/3] md:aspect-square relative border border-tertiary-dark/20 p-2 md:p-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: -30, rotate: -3 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0, x: 30, rotate: 3 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="w-full h-full relative"
                >
                  <Image 
                    src={timelineData[activeIndex]?.photo} 
                    alt={timelineData[activeIndex]?.title}
                    fill
                    className="object-cover grayscale hover:grayscale-0 transition-colors duration-700 pointer-events-auto"
                    unoptimized
                  />
                  {/* Brutalist offset borders */}
                  <div className="absolute -inset-4 border border-secondary/30 pointer-events-none hidden md:block" />
                  <div className="absolute -inset-2 border border-primary/20 pointer-events-none hidden md:block" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Text Side (Right) */}
            <div className="w-full md:w-1/2 flex flex-col items-start gap-8 z-10">
              
              {/* Timeline controls */}
              <div className="flex gap-3 md:gap-6 items-end border-b border-tertiary-dark/20 w-full md:w-fit pb-2 overflow-x-auto scrollbar-none">
                  {timelineData.map((item, idx) => (
                      <button 
                        key={item.year}
                        onClick={() => handleManualClick(idx)}
                        className={`text-lg md:text-3xl font-display transition-all duration-300 relative flex-shrink-0
                            ${activeIndex === idx ? 'text-primary' : 'text-tertiary-dark hover:text-tertiary-light'}
                        `}
                      >
                         {item.year}
                         {activeIndex === idx && (
                             <motion.div 
                                layoutId="underline"
                                className="absolute -bottom-[9px] left-0 right-0 h-0.5 bg-primary"
                             />
                         )}
                      </button>
                  ))}
              </div>

               <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="flex flex-col gap-6"
                >
                  <h3 className="text-3xl md:text-5xl lg:text-7xl font-display font-bold leading-none text-foreground tracking-tighter">
                    {timelineData[activeIndex]?.title}
                  </h3>
                  <p className="text-lg md:text-xl text-tertiary-light max-w-md leading-relaxed border-l-2 border-secondary pl-4">
                    {timelineData[activeIndex]?.description}
                  </p>
                </motion.div>
              </AnimatePresence>

            </div>

        </div>
      </section>
  );
}
