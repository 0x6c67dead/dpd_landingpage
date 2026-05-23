"use client";

import { motion } from "framer-motion";

const MONTH_MAP: { [key: string]: number } = {
  "JAN": 0, "FEV": 1, "MAR": 2, "ABR": 3, "MAI": 4, "JUN": 5,
  "JUL": 6, "AGO": 7, "SET": 8, "OUT": 9, "NOV": 10, "DEZ": 11
};

const UPCOMING_EVENTS = [
  {
    id: "Festival Recife em cena",
    date: { day: "12", month: "AGO", year: "2026" },
    title: "Festival Recife em cena",
    location: "Teatro de Luiz Mendonça — Recife, PE",
    type: "Competição",
    ticketUrl: null,
  },
  {
    id: "workshop-jazz-musical-set",
    date: { day: "20", month: "SET", year: "2026" },
    title: "Workshop de Jazz Musical",
    theme: "Hamilton",
    teacher: "Juliana Fernandes",
    location: "Espaço Plié - Clube Português — Recife, PE",
    type: "Workshop",
    ticketUrl: "#",
  },
];

function TicketPerforationDots() {
  return (
    <div className="hidden md:flex flex-col items-center justify-center gap-1.5 px-2">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="w-2 h-2 rounded-full bg-background" />
      ))}
    </div>
  );
}

export interface EventItem {
  id?: string;
  date_day?: string;
  date_month?: string;
  date_year?: string;
  date?: {
    day: string;
    month: string;
    year: string;
  };
  title: string;
  location: string;
  type: string;
  theme?: string | null;
  teacher?: string | null;
  ticket_url?: string | null;
  ticketUrl?: string | null;
}

interface UpcomingEventsProps {
  events?: EventItem[];
}

export default function UpcomingEvents({ events }: UpcomingEventsProps) {
  // Normalize items to consistent structure
  const rawEvents = events && events.length > 0 ? events : UPCOMING_EVENTS;

  const normalizedEvents = rawEvents.map(e => {
    const day = e.date?.day || "";
    const month = e.date?.month || "";
    const year = e.date?.year || "";
    const ticketUrl = e.ticketUrl || null;

    return {
      ...e,
      date: { day, month, year },
      ticketUrl,
    };
  });

  // Sort events chronologically: Year -> Month -> Day
  const sortedEvents = [...normalizedEvents].sort((a, b) => {
    const yearDiff = parseInt(a.date.year) - parseInt(b.date.year);
    if (yearDiff !== 0) return yearDiff;
    
    const monthDiff = (MONTH_MAP[a.date.month] || 0) - (MONTH_MAP[b.date.month] || 0);
    if (monthDiff !== 0) return monthDiff;
    
    return parseInt(a.date.day) - parseInt(b.date.day);
  });

  const hasEvents = sortedEvents.length > 0;

  return (
    <div className="w-full py-12 md:py-16 bg-background relative">
      <div className="container mx-auto px-5 md:px-12 lg:px-24">
        {/* Sub-header */}
        <div className="mb-12 flex items-end gap-6 border-b border-tertiary-dark/20 pb-6">
          <h3 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight text-foreground leading-none">
            Próximas<br />Datas
          </h3>
          <div className="w-3 h-3 bg-primary mb-1 animate-pulse" />
        </div>

        {hasEvents ? (
          <div className="flex flex-col gap-6">
            {sortedEvents.map((event, idx) => {
              const isWorkshop = event.type === "Workshop";
              
              return (
                <motion.div
                  key={event.id || event.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="group"
                >
                  {/* Ticket Card */}
                  <div className="relative flex flex-col md:flex-row items-stretch bg-foreground/[0.03] border border-tertiary-dark/20 hover:border-primary/40 transition-colors duration-500 overflow-hidden">
                    
                    {/* Date Stub (Left side of ticket) */}
                    <div className="w-full md:w-40 flex-shrink-0 bg-foreground/[0.05] flex flex-row md:flex-col items-center justify-center gap-1 p-4 md:p-8 relative border-b md:border-b-0 md:border-r border-dashed border-tertiary-dark/30">
                      <span className={`text-5xl md:text-6xl font-display font-black leading-none ${isWorkshop ? 'text-primary' : 'text-secondary'}`}>
                        {event.date.day}
                      </span>
                      <div className="flex flex-row md:flex-col items-center gap-1 ml-3 md:ml-0">
                        <span className="text-lg md:text-xl font-mono font-bold text-foreground uppercase tracking-widest">
                          {event.date.month}
                        </span>
                        <span className="text-xs font-mono text-tertiary">
                          {event.date.year}
                        </span>
                      </div>
                    </div>

                    {/* Perforation dots (visual separator) */}
                    <TicketPerforationDots />

                    {/* Main Ticket Content */}
                    <div className="flex-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8 p-4 md:p-8">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-mono uppercase tracking-[0.2em] text-background px-2 py-0.5 font-bold ${isWorkshop ? 'bg-primary' : 'bg-secondary/80'}`}>
                            {event.type}
                          </span>
                        </div>
                        <h4 className="text-xl md:text-2xl font-display font-bold text-foreground uppercase tracking-tight">
                          {event.title}
                        </h4>
                        
                        {/* Workshop Details: Theme & Teacher */}
                        {isWorkshop && (event.theme || event.teacher) && (
                          <div className="flex flex-col gap-1 my-1">
                            {event.theme && (
                              <p className="text-xs font-mono text-primary uppercase tracking-wider">
                                <span className="text-tertiary-dark mr-2">TEMA:</span> {event.theme}
                              </p>
                            )}
                            {event.teacher && (
                              <p className="text-xs font-mono text-foreground/80 uppercase tracking-wider">
                                <span className="text-tertiary-dark mr-2">PROF:</span> {event.teacher}
                              </p>
                            )}
                          </div>
                        )}

                        <p className="text-tertiary-light text-sm font-mono flex items-center gap-2 mt-1">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3.5 h-3.5 flex-shrink-0">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          {event.location}
                        </p>
                      </div>

                      {/* Ticket CTA */}
                      {event.ticketUrl ? (
                        <a
                          href={event.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex-shrink-0 w-full sm:w-auto text-center px-6 py-3 border-2 font-mono font-bold text-xs uppercase tracking-[0.15em] transition-all duration-300 transform hover:scale-105 ${
                            isWorkshop 
                              ? 'border-primary text-primary hover:bg-primary hover:text-background' 
                              : 'border-foreground text-foreground hover:bg-foreground hover:text-background'
                          }`}
                        >
                          {isWorkshop ? 'Inscrição' : 'Ingressos'} →
                        </a>
                      ) : (
                        <span className="flex-shrink-0 w-full sm:w-auto text-center px-6 py-3 border border-tertiary-dark/30 text-tertiary font-mono text-xs uppercase tracking-[0.15em] cursor-default">
                          Em Breve
                        </span>
                      )}
                    </div>

                    {/* Decorative serial number */}
                    <div className="hidden lg:flex items-center pr-6">
                      <span className="text-[10px] font-mono text-tertiary-dark/40 tracking-widest rotate-90 whitespace-nowrap">
                        {isWorkshop ? 'WKSHP' : 'EVENT'}-{event.date.year}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center py-20 border border-dashed border-tertiary-dark/20"
          >
            <p className="text-2xl md:text-3xl font-display italic text-tertiary-light">
              Ensaiando o próximo ato...
            </p>
            <p className="text-tertiary text-sm font-mono mt-4 uppercase tracking-widest">
              Acompanhe nas redes para novidades
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
