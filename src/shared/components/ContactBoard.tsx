"use client";

import { motion } from "framer-motion";

export default function ContactBoard() {
  return (
    <section id="Contato" className="w-full py-16 md:py-24 bg-tertiary-dark/10 border-y border-tertiary-dark/20 relative overflow-hidden mt-16 md:mt-32">
      
      {/* Brutalist Abstract Background Elements */}
      <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-[30rem] h-[30rem] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-5 md:px-12 lg:px-24 relative z-10 flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-24 items-center">
        
        <div className="flex-1">
          <h2 className="text-4xl md:text-7xl font-display font-bold uppercase tracking-tight leading-none mb-4 md:mb-6">
             Vamos<br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary">Dançar</span><br/>
             Juntos.
          </h2>
          <p className="text-tertiary-light text-lg md:text-xl max-w-md border-l-4 border-primary pl-4">
            Estamos sempre em busca de novos talentos, parcerias para eventos e oportunidades de levar nossa arte adiante. Fale com a gente!
          </p>
        </div>

        <motion.div 
           initial={{ opacity: 0, x: 50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           className="flex-1 w-full bg-background border border-tertiary-dark/40 p-8 md:p-12 relative"
        >
          {/* Brutalist accents on the form box */}
          <div className="absolute top-0 left-0 w-4 h-4 bg-primary -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-4 h-4 bg-secondary translate-x-1/2 translate-y-1/2" />

          <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-tertiary uppercase tracking-widest">Seu Nome</label>
              <input type="text" className="w-full bg-transparent border-b border-tertiary hover:border-primary focus:border-secondary transition-colors outline-none py-2 text-foreground font-sans text-lg" placeholder="Como gosta de ser chamado?" />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-tertiary uppercase tracking-widest">E-mail</label>
              <input type="email" className="w-full bg-transparent border-b border-tertiary hover:border-primary focus:border-secondary transition-colors outline-none py-2 text-foreground font-sans text-lg" placeholder="contato@exemplo.com" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-mono text-tertiary uppercase tracking-widest">O que deseja?</label>
              <textarea rows={3} className="w-full bg-transparent border-b border-tertiary hover:border-primary focus:border-secondary transition-colors outline-none py-2 text-foreground font-sans text-lg resize-none" placeholder="Quero participar do grupo, convite para evento, etc..."></textarea>
            </div>

            <button className="self-stretch sm:self-end mt-4 px-10 py-4 bg-foreground text-background font-display font-bold uppercase tracking-widest transition-colors duration-300 relative group overflow-hidden">
               <span className="relative z-10 group-hover:text-background transition-colors duration-300">Enviar Mensagem</span>
               <div className="absolute inset-0 bg-primary transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 z-0" />
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
}
