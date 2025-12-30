"use client";

import { Layout } from "@/components/layout/Layout";
import { HeroSection } from "@/components/home/HeroSection";
import { GameSection } from "@/components/games/GameSection";
import { motion } from "framer-motion";
import { Gamepad2, Globe, Smartphone, Play, Users, Shield } from "lucide-react";
import { useAdmin } from "@/context/AdminContext";

const features = [
  {
    icon: Globe,
    title: "Global Library",
    description: "Access games from every corner of the world"
  },
  {
    icon: Smartphone,
    title: "Phone Controller",
    description: "Use your phone as a gamepad for any game"
  },
  {
    icon: Play,
    title: "Instant Play",
    description: "Play select games directly in your browser"
  },
  {
    icon: Users,
    title: "Community",
    description: "Join millions of gamers worldwide"
  }
];

const Index = () => {
  const { allGames } = useAdmin();

  // Filter games dynamically from AdminContext
  const featuredGames = allGames.filter(game => game.isFeatured);
  const newReleases = allGames.filter(game => game.isNew);
  const playableGames = allGames.filter(game => game.isPlayable);
  const popularGames = [...allGames].sort((a, b) => b.rating - a.rating);

  return (
    <>

      <Layout>

        {/* Hero Section */}
        {featuredGames[0] && <HeroSection featuredGame={featuredGames[0]} />}

        {/* Features Section */}
        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center p-6"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 mb-4">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-gaming font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Game Sections */}
        <div className="container mx-auto px-4">
          <GameSection
            title="🔥 Featured Games"
            games={featuredGames}
            viewAllLink="/games?featured=true"
          />

          <GameSection
            title="🆕 New Releases"
            games={newReleases}
            viewAllLink="/games?new=true"
          />

          <GameSection
            title="🎮 Play Online Free"
            games={playableGames}
            viewAllLink="/play"
          />

          <GameSection
            title="⭐ Popular Games"
            games={popularGames}
            viewAllLink="/games"
          />
        </div>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20" />
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />

              <div className="relative p-12 md:p-20 text-center">
                <Gamepad2 className="w-16 h-16 mx-auto mb-6 text-primary animate-float" />
                <h2 className="text-3xl md:text-5xl font-gaming font-bold mb-4">
                  Ready to <span className="gaming-text-gradient">Level Up</span>?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  Join millions of gamers on GameHub. Create your account today to save your progress, track your recently played games, and use your phone as a controller!
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a href="/auth?mode=signup">
                    <button className="gaming-btn-primary px-8 py-4 rounded-lg text-lg font-gaming">
                      Get Started Free
                    </button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Index;
