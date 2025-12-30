import Link from "next/link";

import { motion } from "framer-motion";
import { Play, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Game } from "@/types/game";

interface HeroSectionProps {
  featuredGame: Game;
}

export const HeroSection = ({ featuredGame }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={featuredGame.coverImage}
          alt={featuredGame.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50" />
      </div>

      {/* Animated particles/glow effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            opacity: [0.2, 0.5, 0.2],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-accent/20 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-3"
          >
            <Badge variant="gaming" className="gap-1">
              <Sparkles className="w-3 h-3" />
              Featured Game
            </Badge>
            {featuredGame.isNew && <Badge variant="new">NEW RELEASE</Badge>}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-gaming font-black leading-tight"
          >
            <span className="gaming-text-gradient">{featuredGame.title}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl"
          >
            {featuredGame.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link href={`/play/${featuredGame.id}`}>
              <Button variant="gaming" size="xl" className="gap-2 shadow-neon">
                <Play className="w-5 h-5 fill-current" />
                Play Now Free
              </Button>
            </Link>
            <Link href="/games">
              <Button variant="outline" size="xl" className="gap-2">
                Browse Library
                <ChevronRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex gap-8 pt-8"
          >
            <div>
              <div className="text-2xl font-gaming font-bold text-primary">{featuredGame.rating}</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
            <div>
              <div className="text-2xl font-gaming font-bold">{featuredGame.genre}</div>
              <div className="text-sm text-muted-foreground">Genre</div>
            </div>
            <div>
              <div className="text-2xl font-gaming font-bold">{featuredGame.platform.join(", ")}</div>
              <div className="text-sm text-muted-foreground">Platform</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-primary/50 flex items-start justify-center p-2"
        >
          <div className="w-1.5 h-2.5 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};
