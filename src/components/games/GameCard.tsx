import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Star, Play, Monitor, Smartphone, Gamepad, Heart, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Game } from "@/types/game";
import { useApp } from "@/context/AppContext";

interface GameCardProps {
  game: Game;
  index?: number;
}

const platformIcons: Record<string, React.FC<{ className?: string }>> = {
  PC: Monitor,
  Console: Gamepad,
  Mobile: Smartphone,
};

export const GameCard = ({ game, index = 0 }: GameCardProps) => {
  const { toggleFavorite, favorites } = useApp();
  const isFavorite = favorites.includes(game.id);
  const router = useRouter();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(game.id);
  };

  const handleCardClick = () => {
    router.push(`/games/${game.id}`);
  };

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/games/${game.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.05,
        duration: 0.3,
      }}
      onClick={handleCardClick}
      className="h-full"
    >
      <Card
        variant="gaming"
        className="overflow-hidden group cursor-pointer h-full flex flex-col transition-all duration-300 border-white/5 hover:border-primary/50"
      >
        {/* Cover Image */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <img
            src={game.coverImage}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            {game.isNew && <Badge variant="new">NEW</Badge>}
            {game.isFeatured && <Badge variant="premium">MUST PLAY</Badge>}
          </div>

          {/* Favorite Toggle */}
          <button
            onClick={handleToggleFavorite}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 z-20 ${isFavorite
              ? "bg-primary/20 text-primary"
              : "bg-black/40 text-white/70 hover:bg-black/60 hover:text-white"
              } backdrop-blur-md`}
          >
            <Heart className={`w-5 h-5 ${isFavorite ? "fill-primary" : ""}`} />
          </button>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-primary/90 text-primary-foreground px-6 py-2 rounded-full font-gaming font-bold shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              KNOW MORE
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3 flex-1 flex flex-col">
          <div>
            <h3 className="font-gaming font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {game.title}
            </h3>
            <p className="text-muted-foreground text-xs uppercase tracking-widest">{game.genre}</p>
          </div>

          {/* Platforms */}
          <div className="flex gap-2">
            {game.platform.map(platform => {
              const Icon = platformIcons[platform] || Monitor;
              return (
                <div
                  key={platform}
                  className="w-6 h-6 rounded bg-white/5 flex items-center justify-center"
                  title={platform}
                >
                  <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
              );
            })}
          </div>

          {/* Rating & Action */}
          <div className="flex items-center justify-between pt-2 mt-auto">
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-gaming-orange fill-gaming-orange" />
              <span className="text-sm font-bold">{game.rating}</span>
            </div>
            <div className="text-[10px] font-gaming text-white/40 font-bold tracking-tighter">
              {game.developer}
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="secondary"
              size="sm"
              className="w-full gap-2 bg-white/5 hover:bg-white/10"
              onClick={handleAction}
            >
              <Info className="w-3.5 h-3.5" />
              Details
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
