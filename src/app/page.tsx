import Image from "next/image";
import AboutGroup from "@/shared/components/AboutGroup";
import AboutTimeline from "@/shared/components/AboutTimeline";
import VideoShowcase from "@/shared/components/VideoShowcase";
import DanceClasses from "@/shared/components/DanceClasses";
import EventsRepertory from "@/shared/components/EventsRepertory";
import UpcomingEvents from "@/shared/components/UpcomingEvents";
import ContactBoard from "@/shared/components/ContactBoard";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start min-h-screen pt-24 w-full">
      {/* Hero Section - Typographic Brutalism */}
      <section className="relative w-full min-h-[85vh] md:min-h-[80vh] flex flex-col justify-center items-center overflow-hidden bg-background">
         
         {/* Brutalist Abstract Background Elements */}
         <div className="absolute top-1/4 left-1/4 w-[15rem] h-[15rem] md:w-[40rem] md:h-[40rem] bg-primary/20 rounded-full blur-[60px] md:blur-[120px] pointer-events-none z-0" />
         <div className="absolute bottom-1/4 right-1/4 w-[12rem] h-[12rem] md:w-[30rem] md:h-[30rem] bg-secondary/15 rounded-full blur-[50px] md:blur-[100px] pointer-events-none z-0" />
         
         {/* Layer 1: Huge Background Typography */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-[0.03] pointer-events-none z-0 w-full overflow-hidden">
             <h1 className="text-[30vw] font-display font-black leading-none whitespace-nowrap text-tertiary uppercase tracking-tighter">
                 DANCING
             </h1>
         </div>

         {/* Layer 2: Main Hero Content (Asymmetric) */}
         <div className="container mx-auto px-5 md:px-12 lg:px-24 z-10 w-full mt-6 lg:mt-0">
             <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 md:gap-16 lg:gap-8">
                 
                 {/* Text Content */}
                 <div className="flex flex-col gap-6 w-full lg:w-1/2 ml-0 lg:ml-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-0.5 bg-secondary" />
                        <p className="text-secondary font-mono tracking-widest uppercase text-sm md:text-base font-bold">
                            Jazz Musical
                        </p>
                    </div>
                    
                    <h2 className="text-5xl md:text-8xl lg:text-[7rem] font-display font-bold leading-[0.85] uppercase text-foreground">
                        Sinta <br /> O <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Ritmo</span>
                    </h2>
                    <p className="text-tertiary-light text-lg md:text-xl max-w-md mt-2">
                        O palco é nosso compasso. A luz é nosso guia. Transformamos a técnica do jazz musical em expressões de arte inesquecíveis.
                    </p>
                    
                    {/* CTA */}
                    <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <a href="#Sobre" className="px-8 py-4 bg-foreground text-background font-bold tracking-wider uppercase hover:bg-primary transition-colors duration-300 transform hover:scale-105">
                            Nossa História
                        </a>
                        <a href="#Eventos" className="text-foreground hover:text-secondary transition-colors uppercase tracking-wider font-bold text-sm relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-secondary after:scale-x-0 hover:after:scale-x-100 after:transition-transform">
                            Ver Espetáculos
                        </a>
                    </div>
                 </div>

                 {/* Minimal Abstract/Brutalist "Image" block */}
                 <div className="w-full lg:w-1/2 flex justify-center lg:justify-end pr-0 lg:pr-10">
                     <div className="relative w-full max-w-xs md:max-w-md aspect-[4/5] border border-tertiary-dark/30 p-2 md:p-3 transform lg:rotate-2 hover:rotate-0 transition-transform duration-700">
                         <div className="w-full h-full relative overflow-hidden bg-background">
                             <Image 
                                src="https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?q=80&w=800&auto=format&fit=crop" 
                                alt="Bailarina de Jazz" 
                                fill
                                className="object-cover mix-blend-luminosity opacity-80 hover:scale-105 transition-transform duration-1000"
                                unoptimized
                             />
                             <div className="absolute inset-0 bg-gradient-to-tr from-background/90 via-transparent to-transparent pointer-events-none" />
                         </div>
                         {/* Accents */}
                         <div className="absolute -top-3 -right-3 w-10 h-10 md:-top-4 md:-right-4 md:w-24 md:h-24 bg-secondary/80 mix-blend-hard-light pointer-events-none" />
                         <div className="absolute -bottom-4 -left-4 w-14 h-14 md:-bottom-6 md:-left-6 md:w-32 md:h-32 bg-primary/80 mix-blend-hard-light pointer-events-none" />
                     </div>
                 </div>

             </div>
         </div>
      </section>

      {/* Sections Flow */}
      <AboutGroup />
      <AboutTimeline />
      <VideoShowcase />
      <DanceClasses />
      <EventsRepertory />
      <UpcomingEvents />
      <ContactBoard />
      
    </main>
  );
}
