"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutGroup() {
  return (
    <section className="relative w-full py-16 md:py-24 min-h-[auto] md:min-h-[80vh] flex items-center justify-center overflow-hidden bg-background border-t border-b border-tertiary-dark/10">
      
      {/* Massive Background Quote Mark */}
      <div className="absolute -top-10 left-4 text-[40vw] font-display font-black leading-none text-tertiary-dark/5 select-none pointer-events-none">
        &ldquo;
      </div>

      <div className="container mx-auto px-5 md:px-12 lg:px-24 z-10 flex flex-col lg:flex-row items-center gap-10 md:gap-16 lg:gap-8">
        
        {/* Left Side: Massive Quote */}
        <div className="w-full lg:w-3/5 flex flex-col gap-6">
          <div className="flex items-center gap-4 mb-4">
               <div className="w-8 h-1 bg-primary" />
               <p className="text-secondary font-mono tracking-widest uppercase text-xs sm:text-sm font-bold">
                   A Essência do Grupo
               </p>
          </div>
          
          <motion.blockquote 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] text-foreground"
          >
            "Dançar é um meio de{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary italic">
               respiro e liberdade
            </span>{' '}
            para o corpo."
          </motion.blockquote>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 border-l-4 border-foreground pl-6"
          >
            <p className="font-mono text-xl sm:text-2xl font-bold uppercase tracking-wider text-foreground">
               Juliana Fernandes
            </p>
            <p className="text-tertiary-light text-sm uppercase tracking-widest mt-1">
               Diretora & Coreógrafa
            </p>
          </motion.div>
        </div>

        {/* Right Side: Brutalist Text Area / Photo Area */}
        <div className="w-full lg:w-2/5 relative flex flex-col lg:block justify-center">
            
            {/* Context Text Box */}
            <motion.div 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, delay: 0.2 }}
               className="bg-foreground relative lg:absolute lg:-bottom-16 lg:-left-10 z-20 p-6 md:p-8 max-w-sm border-r-4 border-b-4 border-primary shadow-2xl order-2 lg:order-none -mt-6 lg:mt-0 mx-auto lg:mx-0"
            >
               <p className="text-background font-medium text-sm sm:text-base leading-relaxed">
                  Não somos apenas um grupo de dança. Somos um coletivo focado em explorar os limites do jazz musical, trazendo teatralidade, técnica e entrega emocional para cada segundo de palco.
               </p>
            </motion.div>

            {/* Brutalist Image Wrapper */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-xs md:max-w-md aspect-[3/4] overflow-hidden mx-auto lg:ml-auto border border-tertiary-dark/20 p-2 order-1 lg:order-none"
            >
               <div className="w-full h-full relative group">
                  <Image 
                     src="/essencia-do-grupo.jpeg" 
                     alt="Juliana Fernandes - Diretora do Grupo" 
                     fill
                     className="object-cover mix-blend-luminosity opacity-80 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
               </div>
            </motion.div>
        </div>

      </div>
    </section>
  );
}
