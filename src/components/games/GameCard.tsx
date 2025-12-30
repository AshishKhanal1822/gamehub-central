import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, Play, Monitor, Smartphone, Gamepad } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Game } from "@/types/game";
import { useApp } from "@/context/AppContext";

interface GameCardProps {
  game: Game;
  index?: number;
  isConsoleSelected?: boolean;
}

const platformIcons: Record<string, React.FC<{ className?: string }>> = {
  PC: Monitor,
  Console: Gamepad,
  Mobile: Smartphone,
};

export const GameCard = ({ game, index = 0, isConsoleSelected = false }: GameCardProps) => {
  const { addToRecentlyPlayed } = useApp();
  const router = useRouter();

  const handlePlayNow = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToRecentlyPlayed(game.id);
    router.push(`/play/${game.id}`);
  };

  const handleCardClick = () => {
    router.push(`/games/${game.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: isConsoleSelected ? 1.05 : 1,
      }}
      transition={{
        delay: index * 0.05,
        duration: 0.3,
        scale: { type: "spring", stiffness: 300, damping: 20 }
      }}
      onClick={handleCardClick}
      className="h-full"
    >
      <Card
        variant="gaming"
        className={`overflow-hidden group cursor-pointer h-full flex flex-col transition-all duration-300 ${isConsoleSelected
            ? "ring-4 ring-primary ring-offset-4 ring-offset-background shadow-neon scale-[1.02] border-primary"
            : ""
          }`}
      >
        {/* Cover Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={game.coverImage}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {isConsoleSelected && (
              <Badge variant="gaming" className="pulse-glow flex gap-1 items-center">
                <Gamepad className="w-3 h-3" />
                SELECTED
              </Badge>
            )}
            {game.isNew && <Badge variant="new">NEW</Badge>}
            <Badge variant="free">FREE</Badge>
            {game.isFeatured && <Badge variant="premium">FEATURED</Badge>}
          </div>

          {/* Play button overlay for playable games */}
          {game.isPlayable && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-primary/90 rounded-full p-4 shadow-lg animate-pulse-glow">
                <Play className="w-8 h-8 text-primary-foreground" fill="currentColor" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 flex-1 flex flex-col">
          {/* Title & Genre */}
          <div>
            <h3 className="font-gaming font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {game.title}
            </h3>
            <p className="text-muted-foreground text-sm">{game.genre}</p>
          </div>

          {/* Platforms */}
          <div className="flex gap-2">
            {game.platform.map(platform => {
              const Icon = platformIcons[platform] || Monitor;
              return (
                <div
                  key={platform}
                  className="w-6 h-6 rounded bg-secondary flex items-center justify-center"
                  title={platform}
                >
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
              );
            })}
          </div>

          {/* Rating & Action */}
          <div className="flex items-center justify-between pt-2 mt-auto">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-gaming-orange fill-gaming-orange" />
              <span className="text-sm font-medium">{game.rating}</span>
            </div>

            <Badge variant="outline" className="font-gaming font-bold">FREE TO PLAY</Badge>
          </div>

          <div className="pt-2">
            {game.isPlayable ? (
              <Button
                variant="gaming"
                size="sm"
                className="w-full gap-2 shadow-neon-sm"
                onClick={handlePlayNow}
              >
                <Play className="w-4 h-4" />
                Play Now
              </Button>
            ) : (
              <Button variant="outline" size="sm" className="w-full">
                View Details
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
