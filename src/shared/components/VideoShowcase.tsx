"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface VideoData {
  video_url: string;
  video_poster_url: string;
  video_title: string;
  video_subtitle: string;
  video_description: string;
}

const DEFAULTS: VideoData = {
  video_url: "https://videos.pexels.com/video-files/4922984/4922984-uhd_2560_1440_24fps.mp4",
  video_poster_url: "https://images.unsplash.com/photo-1508807526345-15e9b5f4eaff?q=80&w=1200&auto=format&fit=crop",
  video_title: "O Palco É Nosso.",
  video_subtitle: "Dançando Por Dentro",
  video_description: "Cada corpo que sobe ao palco carrega uma história que o mundo disse que não merecia ser contada. Nós contamos mesmo assim.",
};

export default function VideoShowcase() {
  const [data, setData] = useState<VideoData>(DEFAULTS);

  useEffect(() => {
    fetch("/api/admin/contents")
      .then((r) => r.json())
      .then((contents: Array<{ key: string; value: string }>) => {
        if (!Array.isArray(contents)) return;
        const map: Record<string, string> = {};
        contents.forEach((c) => { map[c.key] = c.value; });

        setData({
          video_url: map["video_url"] || DEFAULTS.video_url,
          video_poster_url: map["video_poster_url"] || DEFAULTS.video_poster_url,
          video_title: map["video_title"] || DEFAULTS.video_title,
          video_subtitle: map["video_subtitle"] || DEFAULTS.video_subtitle,
          video_description: map["video_description"] || DEFAULTS.video_description,
        });
      })
      .catch(() => {}); // Silently fall back to defaults on error
  }, []);

  return (
    <section className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        key={data.video_url}
        className="absolute inset-0 w-full h-full object-cover grayscale opacity-40"
        poster={data.video_poster_url}
      >
        <source src={data.video_url} type="video/mp4" />
      </video>

      {/* Grain Overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30 z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80 z-10 pointer-events-none" />

      {/* Content */}
      <div className="relative z-20 container mx-auto px-5 md:px-12 lg:px-24 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center gap-6"
        >
          <p className="text-secondary font-mono tracking-[0.3em] uppercase text-xs sm:text-sm font-bold">
            {data.video_subtitle}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-display font-black uppercase leading-[0.9] tracking-tighter text-foreground max-w-4xl">
            {data.video_title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              A Luta É De Todos.
            </span>
          </h2>
          <p className="text-tertiary-light text-base md:text-lg max-w-xl mt-2 leading-relaxed">
            {data.video_description}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
            <a
              href="#Turmas"
              className="px-8 py-4 bg-foreground text-background font-bold tracking-wider uppercase hover:bg-primary transition-colors duration-300 transform hover:scale-105 text-sm"
            >
              Ver Turmas
            </a>
            <a
              href="#Eventos"
              className="text-foreground hover:text-secondary transition-colors uppercase tracking-wider font-bold text-sm relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-0.5 after:bg-secondary after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
            >
              Agenda
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
