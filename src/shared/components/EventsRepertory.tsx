"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const REPERTORY_DATA = [
  {
    id: "jazz-night",
    title: "Noites Clássicas",
    subtitle: "Repertório 2024",
    image: "https://images.unsplash.com/photo-1549887552-cb1071d3e5ca?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "neon-rhythm",
    title: "Ritmo Neon",
    subtitle: "Festival Regional 2023",
    image: "https://images.unsplash.com/photo-1520242761803-a2679dcff6fb?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "shadows",
    title: "Sombras em Movimento",
    subtitle: "Apresentação de Inverno 2025",
    image: "https://images.unsplash.com/photo-1502519144081-acca18599776?q=80&w=600&auto=format&fit=crop",
  }
];

export default function EventsRepertory() {
  return (
    <section id="Eventos" className="w-full py-16 md:py-24 bg-background">
      <div className="container mx-auto px-5 md:px-12 lg:px-24">
        
        {/* Section Header */}
        <div className="mb-10 md:mb-20">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary uppercase tracking-tight">
            Eventos &<br/>Repertório
          </h2>
        </div>

        {/* Masonry / Staggered Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-16">
          {REPERTORY_DATA.map((event, idx) => (
             <motion.div
               key={event.id}
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8, delay: idx * 0.2 }}
               className={`relative group ${
                 idx === 0 ? "md:col-span-8 md:col-start-1" : 
                 idx === 1 ? "md:col-span-6 md:col-start-7" : 
                 "md:col-span-7 md:col-start-2"
               }`}
             >
               <div className="relative aspect-video w-full overflow-hidden border border-tertiary-dark/30">
                  <Image 
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-background/40 group-hover:bg-background/10 transition-colors duration-500" />
                  
                  {/* Info Overlay */}
                  <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10 overflow-hidden pr-4">
                     <p className="text-secondary font-mono text-xs md:text-sm tracking-widest uppercase mb-2 transform md:translate-y-full md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        {event.subtitle}
                     </p>
                     <h3 className="text-2xl sm:text-3xl md:text-5xl font-display font-bold text-foreground uppercase transform md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {event.title}
                     </h3>
                  </div>
               </div>
             </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
