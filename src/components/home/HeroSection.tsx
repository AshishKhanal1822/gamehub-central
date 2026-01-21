"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Sparkles, Trophy, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Game } from "@/types/game";
import { useRef } from "react";

interface HeroSectionProps {
  featuredGame: Game;
}

export const HeroSection = ({ featuredGame }: HeroSectionProps) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center overflow-hidden bg-black">
      {/* Background Image with Parallax */}
      <motion.div style={{ y: y1, opacity }} className="absolute inset-0">
        <img
          src={featuredGame.heroImage || featuredGame.coverImage}
          alt={featuredGame.title}
          className="w-full h-full object-cover scale-110"
        />
        {/* Advanced Layered Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(var(--primary-rgb),0.1),transparent_50%)]" />
      </motion.div>

      {/* Dynamic Light Streaks */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.1, 0.3, 0.1],
            x: [-100, 100, -100],
            y: [-50, 50, -50]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent rotate-45 blur-2xl"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4"
          >
            <Badge variant="gaming" className="gap-2 px-4 py-1.5 bg-primary/20 backdrop-blur-md border-primary/30">
              <Trophy className="w-3.5 h-3.5" />
              EDITOR'S CHOICE
            </Badge>
            {featuredGame.isNew && (
              <Badge variant="new" className="px-4 py-1.5 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 mr-2" />
                NEW DISCOVERY
              </Badge>
            )}
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl md:text-8xl lg:text-9xl font-gaming font-black leading-[0.9] tracking-tighter"
            >
              <span className="block text-white opacity-90">EXPLORE</span>
              <span className="gaming-text-gradient bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(var(--primary-rgb),0.5)]">
                {featuredGame.title}
              </span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/60 max-w-2xl font-light leading-relaxed backdrop-blur-[2px]"
          >
            {featuredGame.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap gap-6 pt-6"
          >
            <Link href={`/games/${featuredGame.id}`}>
              <Button variant="gaming" size="xl" className="h-16 px-10 gap-3 text-lg shadow-[0_0_40px_rgba(var(--primary-rgb),0.3)] hover:shadow-[0_0_60px_rgba(var(--primary-rgb),0.5)] transition-all duration-500">
                <Info className="w-5 h-5" />
                DIVE INTO DETAILS
              </Button>
            </Link>
            <Link href="/games">
              <Button variant="outline" size="xl" className="h-16 px-10 gap-2 border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all duration-500 text-lg">
                EXPLORE LIBRARY
                <ChevronRight className="w-5 h-5 opacity-50 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>

          {/* Key Stats Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex gap-12 pt-12 border-t border-white/10"
          >
            {[
              { label: "RATING", val: featuredGame.rating, color: "text-gaming-orange" },
              { label: "GENRE", val: featuredGame.genre, color: "text-primary" },
              { label: "RELEASE", val: new Date(featuredGame.releaseDate).getFullYear(), color: "text-white" }
            ].map((stat, i) => (
              <div key={i} className="group">
                <div className="text-[10px] font-gaming font-bold tracking-[0.2em] text-white/40 mb-2 group-hover:text-white/60 transition-colors uppercase">{stat.label}</div>
                <div className={`text-2xl font-gaming font-black ${stat.color}`}>{stat.val}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30"
      >
        <span className="text-[10px] font-gaming font-bold tracking-widest uppercase">Scroll to Discover</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
};
