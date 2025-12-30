import Link from "next/link";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Game } from "@/types/game";
import { GameCard } from "./GameCard";

interface GameSectionProps {
  title: string;
  games: Game[];
  viewAllLink?: string;
  limit?: number;
}

export const GameSection = ({ title, games, viewAllLink, limit = 4 }: GameSectionProps) => {
  const displayGames = limit ? games.slice(0, limit) : games;

  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-gaming font-bold"
        >
          {title}
        </motion.h2>
        {viewAllLink && (
          <Link
            href={viewAllLink}
            className="flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
          >

            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayGames.map((game, index) => (
          <GameCard key={game.id} game={game} index={index} />
        ))}
      </div>
    </section>
  );
};
