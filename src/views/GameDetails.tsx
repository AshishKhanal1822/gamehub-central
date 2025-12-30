"use client";

import { useParams, useRouter } from "next/navigation";

import Link from "next/link";

import { motion } from "framer-motion";

import {
  ArrowLeft,
  Star,
  Play,
  Monitor,
  Smartphone,
  Gamepad,
  Calendar,
  Building2,
  Globe,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useApp } from "@/context/AppContext";
import { toast } from "@/hooks/use-toast";
import { useAdmin } from "@/context/AdminContext";
import { QRControllerPanel } from "@/components/controller/QRControllerPanel";

const platformIcons: Record<string, React.FC<{ className?: string }>> = {
  PC: Monitor,
  Console: Gamepad,
  Mobile: Smartphone,
};

const GameDetails = () => {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const { user } = useApp();
  const { allGames } = useAdmin();
  const game = allGames.find(g => g.id === (id || ""));

  const handlePlayNow = () => {
    if (game?.isPlayable) {
      router.push(`/play/${game.id}`);
    }
  };

  if (!game) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-gaming font-bold mb-4">Game Not Found</h1>
          <p className="text-muted-foreground mb-6">The game you're looking for doesn't exist.</p>
          <Link href="/games">
            <Button variant="gaming">Browse Games</Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        {/* Hero Banner */}
        <div className="relative h-[50vh] min-h-[400px]">
          <img
            src={game.coverImage}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 -mt-48 relative z-10">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {game.isNew && <Badge variant="new">NEW RELEASE</Badge>}
                  {game.isFeatured && <Badge variant="premium">FEATURED</Badge>}
                  <Badge variant="free">FREE TO PLAY</Badge>
                  {game.isPlayable && <Badge variant="gaming">PLAY ONLINE</Badge>}
                </div>

                <h1 className="text-4xl md:text-5xl font-gaming font-bold mb-4">
                  {game.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-gaming-orange fill-gaming-orange" />
                    <span className="font-semibold text-foreground">{game.rating}</span>
                    <span>/ 5.0</span>
                  </div>
                  <span>•</span>
                  <span>{game.genre}</span>
                  <span>•</span>
                  <span>{game.region}</span>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-xl font-gaming font-semibold mb-4 text-primary">About this Game</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {game.description}
                </p>
              </motion.div>

              {/* Screenshots */}
              {game.screenshots.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-xl font-gaming font-semibold mb-4">Screenshots</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {game.screenshots.map((screenshot, index) => (
                      <div
                        key={index}
                        className="rounded-lg overflow-hidden border border-border group"
                      >
                        <img
                          src={screenshot}
                          alt={`${game.title} screenshot ${index + 1}`}
                          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Action Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card variant="glass" className="p-6 sticky top-24 bg-primary/5 border-primary/20">
                  <div className="text-center mb-6">
                    <Badge variant="free" className="text-lg px-4 py-1 mb-2">FREE</Badge>
                    <p className="text-sm text-muted-foreground">No downloads required</p>
                  </div>

                  <div className="space-y-4">
                    <Button
                      variant="gaming"
                      size="xl"
                      className="w-full gap-3 text-lg py-8 shadow-neon"
                      onClick={handlePlayNow}
                    >
                      <Play className="w-6 h-6 fill-current" />
                      Play Now
                    </Button>

                    <div className="pt-4 border-t border-border/50">
                      <p className="text-sm font-semibold mb-4 flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-primary" />
                        Use Phone as Controller
                      </p>
                      <QRControllerPanel gameId={game.id} />
                    </div>
                  </div>

                  {/* Game Info */}
                  <div className="mt-8 space-y-4 pt-6 border-t border-border/50">
                    <div className="flex items-center gap-3">
                      <Building2 className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Developer</div>
                        <div className="font-medium">{game.developer}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <div>
                        <div className="text-sm text-muted-foreground">Release Date</div>
                        <div className="font-medium">
                          {new Date(game.releaseDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-3">Available Platforms</div>
                      <div className="flex flex-wrap gap-2">
                        {game.platform.map((platform) => {
                          const Icon = platformIcons[platform] || Monitor;
                          return (
                            <div
                              key={platform}
                              className="flex items-center gap-2 bg-secondary/50 px-3 py-1.5 rounded-lg border border-border/50"
                            >
                              <Icon className="w-4 h-4" />
                              <span className="text-xs">{platform}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default GameDetails;
