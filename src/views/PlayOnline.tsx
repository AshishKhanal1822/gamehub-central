"use client";

import { useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Gamepad2, Monitor, Smartphone, Globe, Info, Maximize } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { games } from "@/data/games";

// Frameable AG embeds - These are the specific URLs that work in iframes
const gameEmbeds: Record<string, string> = {
    "p1": "https://www.addictinggames.com/embed/html5-games/24316", // Sniper Team
    "p2": "https://www.addictinggames.com/embed/html5-games/24285", // Bubble Spinner 2
    "p3": "https://www.addictinggames.com/embed/html5-games/24306", // Monkey GO Happy (Alternative)
    "p4": "https://www.addictinggames.com/embed/html5-games/24310", // Tactical Assassin (Alternative)
    "p5": "https://www.addictinggames.com/embed/html5-games/24209", // 2048
    "p6": "https://www.addictinggames.com/embed/html5-games/24361", // Daily Solitaire
};

const PlayOnline = () => {
    const playableGames = useMemo(() => games.filter(g => g.isPlayable), []);
    const [activeGameId, setActiveGameId] = useState(playableGames[0]?.id || "p1");

    const currentGame = useMemo(() =>
        playableGames.find(g => g.id === activeGameId) || playableGames[0],
        [activeGameId, playableGames]
    );

    const currentEmbedUrl = gameEmbeds[currentGame.id] || gameEmbeds["p1"];
    const containerRef = useRef<HTMLDivElement>(null);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen().catch(err => {
                console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
            });
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            }
        }
    };

    return (
        <Layout>
            <div className="container mx-auto px-4 py-8 min-h-screen">
                {/* Header Section - Modern and Sleek */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-primary/10 rounded-xl text-primary border border-primary/20">
                                <Gamepad2 className="w-5 h-5" />
                            </div>
                            <Badge variant="gaming" className="bg-primary/20 text-primary border-primary/30">
                                LIVE ARCADE
                            </Badge>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-gaming font-black text-foreground tracking-tighter">
                            INSTANT <span className="gaming-text-gradient">PLAY</span>
                        </h1>
                        <p className="text-muted-foreground max-w-xl font-medium mt-2">
                            Dive directly into the action. No downloads, no redirections. Premium gaming delivered straight to your browser.
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <div className="hidden lg:flex items-center gap-3 px-5 py-3 bg-secondary/50 rounded-2xl border border-border backdrop-blur-xl">
                            <Globe className="w-4 h-4 text-primary" />
                            <span className="text-[11px] font-black text-muted-foreground tracking-widest uppercase">Global Servers Active</span>
                        </div>
                    </div>
                </motion.div>

                {/* Main Integrated Hub Frame */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-full max-w-6xl mx-auto mb-16 group"
                >
                    {/* Visual Enhancement Glows */}
                    <div className="absolute -inset-4 bg-primary/5 blur-[100px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

                    <div
                        ref={containerRef}
                        className="relative rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#050505] shadow-[0_0_120px_rgba(0,0,0,0.9)]"
                    >
                        {/* Simulation Top Bar */}
                        <div className="h-12 bg-gradient-to-r from-white/5 via-white/[0.02] to-white/5 border-b border-white/10 flex items-center justify-between px-8">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                                </div>
                                <div className="h-4 w-px bg-white/10 mx-2" />
                                <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                                    ACTIVE_SESSION // {currentGame.title.replace(/\s+/g, '_').toUpperCase()}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[8px] font-bold text-green-500 uppercase tracking-widest">Low Latency</span>
                            </div>
                            <button
                                onClick={toggleFullScreen}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors ml-4"
                                title="Enter Fullscreen"
                            >
                                <Maximize className="w-4 h-4 text-white/60" />
                            </button>
                        </div>

                        {/* The Direct Portal Feed */}
                        <div className="relative aspect-video w-full bg-black">
                            <iframe
                                src={currentEmbedUrl}
                                className="w-full h-full border-none"
                                allowFullScreen
                                allow="autoplay; gamepad; fullscreen"
                                title={currentGame.title}
                            />

                            {/* Overlay Info (Fades out when mouse moves over iframe) */}
                            <div className="absolute bottom-6 right-6 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="bg-black/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl">
                                    <div className="flex items-center gap-3 mb-1">
                                        <Monitor className="w-4 h-4 text-primary" />
                                        <span className="text-xs font-black text-white">{currentGame.title}</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>



                {/* Technical Specs Footer */}
                <div className="mt-12 pt-12 border-t border-border max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <Monitor className="w-5 h-5 text-primary" />
                            <span className="text-[10px] font-black tracking-[0.2em] text-foreground">4K_OPTIMIZED</span>
                        </div>
                        <div className="w-px h-4 bg-border" />
                        <div className="flex items-center gap-2">
                            <Smartphone className="w-5 h-5 text-primary" />
                            <span className="text-[10px] font-black tracking-[0.2em] text-foreground">TOUCH_READY</span>
                        </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.3em] flex items-center gap-2">
                        <Info className="w-3 h-3" />
                        Integrated Game Experience // Powered by Addicting Games Portal Bridge
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default PlayOnline;
