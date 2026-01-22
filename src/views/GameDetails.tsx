"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Monitor,
  Gamepad,
  Calendar,
  Building2,
  Globe,
  Cpu,
  Info,
  Play,
  Video,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { games as allGames } from "@/data/games";
import { GameCard } from "@/components/games/GameCard";

const platformIcons: Record<string, any> = {
  PC: Monitor,
  Console: Gamepad,
};

const GameDetails = () => {
  const params = useParams();
  const id = params?.id as string;
  const game = allGames.find(g => g.id === (id || ""));

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
        <div className="relative h-[60vh] min-h-[500px]">
          <img
            src={game.heroImage}
            alt={game.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/20 to-transparent" />

          {/* Animated Glow */}
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full animate-pulse" />
        </div>

        <div className="container mx-auto px-4 -mt-64 relative z-10">
          <Link
            href="/games"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Library
          </Link>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Title Area */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex flex-wrap gap-2">
                  {game.isNew && <Badge variant="new" className="px-3 py-1">NEW RELEASE</Badge>}
                  {game.isFeatured && <Badge variant="premium" className="px-3 py-1">MUST PLAY</Badge>}
                  {game.isPlayable ? (
                    <Badge variant="gaming" className="px-3 py-1 animate-pulse">INSTANT PLAY</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-white/5 border-white/10 px-3 py-1 backdrop-blur-sm">LIBRARY ARCHIVE</Badge>
                  )}
                </div>

                <h1 className="text-5xl md:text-7xl font-gaming font-black leading-tight tracking-tighter">
                  {game.title}
                </h1>

                <div className="flex flex-wrap items-center gap-6 text-lg">
                  <div className="flex items-center gap-2 bg-gaming-orange/10 px-4 py-1.5 rounded-full border border-gaming-orange/20">
                    <Star className="w-5 h-5 text-gaming-orange fill-gaming-orange" />
                    <span className="font-bold text-gaming-orange">{game.rating}</span>
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <span className="font-gaming uppercase tracking-widest text-sm text-primary">{game.genre}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{game.region}</span>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="prose prose-invert max-w-none"
              >
                <h2 className="text-2xl font-gaming font-bold mb-6 flex items-center gap-2">
                  <Info className="w-6 h-6 text-primary" />
                  Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed text-xl font-light">
                  {game.description}
                </p>
              </motion.div>

              {/* Game Trailer */}
              {game.trailer && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl font-gaming font-bold mb-6 flex items-center gap-2">
                    <Video className="w-6 h-6 text-primary" />
                    Official Trailer
                  </h2>
                  <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/5 shadow-2xl bg-black group">
                    <iframe
                      src={game.trailer}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={`${game.title} Official Trailer`}
                    />
                    <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-3xl" />
                  </div>
                </motion.div>
              )}

              {/* Screenshots Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <h2 className="text-2xl font-gaming font-bold mb-6 flex items-center gap-2">
                  <Monitor className="w-6 h-6 text-primary" />
                  Visual Showcase
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Digital Assets Gallery - includes hero and screenshots */}
                  {[game.heroImage, ...(game.screenshots || [])].map((screenshot, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="rounded-2xl overflow-hidden border border-white/5 shadow-2xl group relative"
                    >
                      <img
                        src={screenshot}
                        alt={`${game.title} showcase ${index + 1}`}
                        className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* System Requirements */}
              {game.systemRequirements && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-2xl font-gaming font-bold mb-6 flex items-center gap-2">
                    <Cpu className="w-6 h-6 text-primary" />
                    Technical Specs
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-md">
                      <h3 className="text-primary font-gaming font-bold mb-4 uppercase tracking-wider text-sm">Minimum</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{game.systemRequirements.minimum}</p>
                    </Card>
                    <Card className="p-6 bg-primary/5 border-primary/20 backdrop-blur-md">
                      <h3 className="text-primary font-gaming font-bold mb-4 uppercase tracking-wider text-sm">Recommended</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{game.systemRequirements.recommended}</p>
                    </Card>
                  </div>
                </motion.div>
              )}

              {/* Related Games */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="pt-12 border-t border-white/5"
              >
                <h2 className="text-3xl font-gaming font-bold mb-8">Discover More in {game.genre}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {allGames
                    .filter(g => g.genre === game.genre && g.id !== game.id)
                    .slice(0, 2)
                    .map((relatedGame, idx) => (
                      <GameCard key={relatedGame.id} game={relatedGame} index={idx} />
                    ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24"
              >
                <Card variant="glass" className="p-8 bg-white/5 border-white/10 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Gamepad className="w-32 h-32 -mr-16 -mt-16 rotate-12" />
                  </div>

                  <div className="relative z-10 space-y-8">
                    <div>
                      <Badge variant="outline" className="mb-4 bg-primary/10 border-primary/20 text-primary">OFFICIAL ARCHIVE</Badge>
                      <h3 className="text-sm font-gaming font-bold text-muted-foreground uppercase tracking-widest mb-6 border-b border-white/5 pb-4">Game Information</h3>
                    </div>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/20 transition-colors">
                          <Building2 className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Developer</div>
                          <div className="font-semibold text-lg">{game.developer}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 group">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-primary/20 transition-colors">
                          <Calendar className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-1">Release Date</div>
                          <div className="font-semibold text-lg">{new Date(game.releaseDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                        </div>
                      </div>

                      <div className="pt-4 space-y-4">
                        <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest mb-4">Platforms</div>
                        <div className="flex flex-wrap gap-3">
                          {game.platform.map((platform) => {
                            const Icon = platformIcons[platform] || Monitor;
                            return (
                              <div
                                key={platform}
                                className="flex items-center gap-3 bg-white/5 px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-default"
                              >
                                <Icon className="w-5 h-5 text-primary" />
                                <span className="text-sm font-bold">{platform}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 space-y-4">
                      {game.isPlayable && (
                        <Button
                          variant="gaming"
                          size="xl"
                          className="w-full gap-3 py-8 text-lg font-gaming font-bold shadow-neon-blue group"
                          asChild
                        >
                          <Link href={`/play?id=${game.id}`}>
                            <Play className="w-6 h-6 fill-current transition-transform group-hover:scale-110" />
                            PLAY INSTANTLY
                          </Link>
                        </Button>
                      )}

                      <Button
                        variant={game.isPlayable ? "outline" : "gaming"}
                        size="xl"
                        className={`w-full gap-3 py-8 text-lg font-gaming font-bold ${!game.isPlayable ? "shadow-neon-blue" : "border-white/10 hover:bg-white/10"} group`}
                        asChild
                      >
                        <a href="#" target="_blank" rel="noopener noreferrer">
                          <Globe className="w-6 h-6 transition-transform group-hover:rotate-12" />
                          Official Website
                        </a>
                      </Button>
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
