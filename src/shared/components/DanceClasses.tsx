"use client";

import { motion } from "framer-motion";

const WHATSAPP_NUMBER = "5500000000000"; // TODO: Substituir pelo número real

const CLASSES_DATA = [
  {
    id: "iniciante",
    number: "01",
    title: "Iniciante",
    subtitle: "Primeiro Contato",
    schedule: "Sábado · 13h30 às 15h",
    description:
      "Nunca dançou? Perfeito. Essa turma é para você que nunca teve contato com a dança e quer começar do absoluto zero. Aqui não existe corpo errado, idade errada ou ritmo errado. Existe vontade.",
    highlights: ["Sem pré-requisitos", "A partir de 14 anos", "Ambiente acolhedor"],
    whatsappMessage: "Olá! Tenho interesse na turma Iniciante (Sábado 13h30). Gostaria de mais informações!",
    accentColor: "primary",
  },
  {
    id: "iniciados",
    number: "02",
    title: "Iniciados",
    subtitle: "Evolução Técnica",
    schedule: "Terça e Quinta · 20h às 21h",
    description:
      "Para quem já tem algum entendimento do corpo em movimento. Não precisa ter experiência formal em dança, mas já carrega alguma vivência. Aqui, aprofundamos técnicas de jazz musical com intensidade e acolhimento.",
    highlights: ["Alguma vivência corporal", "A partir de 14 anos", "Técnica + expressão"],
    whatsappMessage: "Olá! Tenho interesse na turma de Iniciados (Terça e Quinta 20h). Gostaria de mais informações!",
    accentColor: "secondary",
  },
  {
    id: "companhia",
    number: "03",
    title: "Grupo DPD",
    subtitle: "Palco & Competição",
    schedule: "Sábado · 15h às 17h",
    description:
      "O coração do Dançando Por Dentro. Coreografias desafiadoras, festivais e competições. Mesmo sendo a turma mais exigente, a filosofia de acolhimento permanece: aqui, todos os corpos competem.",
    highlights: ["Nível avançado", "Festivais & Competições", "Repertório autoral"],
    whatsappMessage: "Olá! Tenho interesse na Companhia DPD (Sábado 15h). Gostaria de saber sobre vagas!",
    accentColor: "primary",
  },
];

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function DanceClasses() {
  return (
    <section id="Turmas" className="w-full py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Massive background number */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 opacity-[0.02] pointer-events-none select-none">
        <span className="text-[50vw] font-display font-black leading-none text-foreground">
          DPD
        </span>
      </div>

      <div className="container mx-auto px-5 md:px-12 lg:px-24 z-10 relative">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-1 bg-secondary" />
            <p className="text-secondary font-mono tracking-widest uppercase text-xs sm:text-sm font-bold">
              Para Todos os Corpos
            </p>
          </div>
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-display font-black uppercase tracking-tight leading-[0.9] text-foreground">
            Nossas<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Turmas
            </span>
          </h2>
          <p className="text-tertiary-light text-lg md:text-xl max-w-2xl mt-6 leading-relaxed">
            Não existe corpo errado para dançar. Desde 2016, abrimos espaço para todas as 
            idades e biotipos que já ouviram que &ldquo;não poderiam&rdquo; fazer parte de um espetáculo. 
            Idade mínima: 14 anos (menores com autorização dos responsáveis).
          </p>
        </div>

        {/* Classes Grid - Staggered vertical blocks */}
        <div className="mt-16 flex flex-col gap-0">
          {CLASSES_DATA.map((cls, idx) => (
            <motion.div
              key={cls.id}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className={`
                relative flex flex-col lg:flex-row items-stretch
                border-t border-tertiary-dark/20
                ${idx === CLASSES_DATA.length - 1 ? "border-b" : ""}
                group
              `}
            >
              {/* Number Column */}
              <div className="w-full lg:w-32 flex-shrink-0 flex items-center justify-start lg:justify-center py-4 lg:py-16 px-0 lg:px-0">
                <span className={`text-5xl md:text-7xl lg:text-8xl font-display font-black leading-none ${
                  cls.accentColor === "primary" ? "text-primary/30 group-hover:text-primary" : "text-secondary/30 group-hover:text-secondary"
                } transition-colors duration-500`}>
                  {cls.number}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col lg:flex-row gap-6 lg:gap-16 py-2 lg:py-16 px-0 lg:px-8">
                {/* Title & Schedule */}
                <div className="w-full lg:w-1/3 flex flex-col gap-3">
                  <p className="text-xs font-mono text-tertiary uppercase tracking-widest">
                    {cls.subtitle}
                  </p>
                  <h3 className="text-3xl md:text-4xl font-display font-bold text-foreground uppercase tracking-tight">
                    {cls.title}
                  </h3>
                  <div className={`inline-flex items-center gap-2 mt-2 px-4 py-2 border ${
                    cls.accentColor === "primary" ? "border-primary/40 text-primary" : "border-secondary/40 text-secondary"
                  } font-mono text-sm tracking-wider w-fit`}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {cls.schedule}
                  </div>
                </div>

                {/* Description */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4">
                  <p className="text-tertiary-light text-base leading-relaxed">
                    {cls.description}
                  </p>
                  <ul className="flex flex-wrap gap-3 mt-2">
                    {cls.highlights.map((h) => (
                      <li key={h} className="text-xs font-mono text-foreground/70 uppercase tracking-wider bg-foreground/5 px-3 py-1.5 border border-foreground/10">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="w-full lg:w-1/3 flex items-center justify-start lg:justify-end pb-6 lg:pb-0">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(cls.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`
                      inline-flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 font-bold uppercase tracking-wider text-sm
                      transition-all duration-300 transform hover:scale-105 group/btn
                      ${cls.accentColor === "primary"
                        ? "bg-primary text-background hover:bg-primary-light"
                        : "bg-secondary text-background hover:bg-secondary-light"
                      }
                    `}
                  >
                    <WhatsAppIcon />
                    <span>Quero Dançar</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
