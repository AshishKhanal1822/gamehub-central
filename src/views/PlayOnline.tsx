"use client";

import { useState, useEffect, useRef, useMemo } from "react";


import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import { motion } from "framer-motion";

import { ArrowLeft, Maximize, Minimize, Volume2, VolumeX, RotateCcw, Play, Smartphone } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GameCard } from "@/components/games/GameCard";
import { useApp } from "@/context/AppContext";
import { useAdmin } from "@/context/AdminContext";
import { useController } from "@/context/ControllerContext";
import { QRControllerPanel } from "@/components/controller/QRControllerPanel";


// Sample playable game URLs (these would be real game embeds in production)
const gameEmbeds: Record<string, string> = {
  "1": "https://www.addictinggames.com/embed/html5-games/24316",
  "2": "https://www.addictinggames.com/embed/html5-games/24285",
  "3": "https://www.addictinggames.com/embed/html5-games/24306",
  "4": "https://www.addictinggames.com/embed/html5-games/24310",
  "5": "https://www.addictinggames.com/embed/html5-games/24295",
  "6": "https://www.addictinggames.com/embed/html5-games/24298",
  "7": "https://www.addictinggames.com/embed/html5-games/24317",
  "8": "https://www.addictinggames.com/embed/html5-games/24290",
  "9": "https://www.addictinggames.com/embed/html5-games/24308",
  "10": "https://www.addictinggames.com/embed/html5-games/24314",
  "11": "https://www.addictinggames.com/embed/html5-games/24300",
  "12": "https://www.addictinggames.com/embed/html5-games/24312",
};

const PlayOnline = () => {
  const params = useParams();
  const id = params?.id as string;

  const { allGames } = useAdmin();
  const { addToRecentlyPlayed } = useApp();
  const { createSession, session, controllers, endSession } = useController();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [lastInput, setLastInput] = useState<string>("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const playableGames = useMemo(() => allGames.filter(game => game.isPlayable), [allGames]);
  const currentGame = id ? allGames.find(game => game.id === id) : null;

  // Auto-init session for library navigation
  useEffect(() => {
    if (!session) {
      createSession(id || "dashboard", 4);
    }
  }, [id, session, createSession]);

  const activeKeys = useRef<Set<string>>(new Set());
  const lastNavTime = useRef(0);

  useEffect(() => {
    const getKeyCode = (code: string): number => {
      const codes: Record<string, number> = {
        'ArrowUp': 38, 'ArrowDown': 40, 'ArrowLeft': 37, 'ArrowRight': 39,
        'Space': 32, 'Enter': 13, 'Escape': 27, 'Tab': 9,
        'ShiftLeft': 16, 'ControlLeft': 17
      };
      return codes[code] || 0;
    };

    const simulateKey = (code: string, type: 'keydown' | 'keyup') => {
      const keyCode = getKeyCode(code);
      const event = new KeyboardEvent(type, {
        code,
        key: code.startsWith('Arrow') ? code.replace('Arrow', '') : code,
        keyCode: keyCode,
        which: keyCode,
        bubbles: true,
        cancelable: true,
      });
      window.dispatchEvent(event);
      document.dispatchEvent(event);

      // Try to focus and dispatch to iframe if possible
      if (iframeRef.current) {
        try {
          // This only works for same-origin, but we'll try as a fallback
          iframeRef.current.contentWindow?.dispatchEvent(event);
        } catch (e) { }
      }
    };

    const handleInput = (e: any) => {
      const { controllerId, input } = e.detail;

      // Dashboard Navigation Mode (When no game is selected)
      if (!id) {
        const now = Date.now();
        const navThrottle = 250;

        if (input.type === 'button') {
          if (input.button === 'A' || input.button === 'start') {
            const selectedGame = playableGames[selectedIndex];
            if (selectedGame) {
              router.push(`/play/${selectedGame.id}`);
            }
            return;
          }

          if (now - lastNavTime.current > navThrottle) {
            if (input.button === 'left') { setSelectedIndex(prev => Math.max(0, prev - 1)); lastNavTime.current = now; }
            if (input.button === 'right') { setSelectedIndex(prev => Math.min(playableGames.length - 1, prev + 1)); lastNavTime.current = now; }
            if (input.button === 'up') { setSelectedIndex(prev => Math.max(0, prev - 4)); lastNavTime.current = now; }
            if (input.button === 'down') { setSelectedIndex(prev => Math.min(playableGames.length - 1, prev + 4)); lastNavTime.current = now; }
          }
        }

        if (input.type === 'joystick' && now - lastNavTime.current > navThrottle) {
          const threshold = 0.6;
          let moved = false;
          if (input.x < -threshold) { setSelectedIndex(prev => Math.max(0, prev - 1)); moved = true; }
          else if (input.x > threshold) { setSelectedIndex(prev => Math.min(playableGames.length - 1, prev + 1)); moved = true; }
          else if (input.y < -threshold) { setSelectedIndex(prev => Math.max(0, prev - 4)); moved = true; }
          else if (input.y > threshold) { setSelectedIndex(prev => Math.min(playableGames.length - 1, prev + 4)); moved = true; }

          if (moved) lastNavTime.current = now;
        }
        return;
      }

      if (input.type === 'button') {
        const keyMap: Record<string, string> = {
          'A': 'Space',
          'B': 'Escape',
          'X': 'ShiftLeft',
          'Y': 'ControlLeft',
          'start': 'Enter',
          'select': 'Tab',
          'up': 'ArrowUp',
          'down': 'ArrowDown',
          'left': 'ArrowLeft',
          'right': 'ArrowRight'
        };

        const keyCode = keyMap[input.button];
        if (keyCode) {
          setLastInput(`${input.button} Pressed`);
          simulateKey(keyCode, 'keydown');
          setTimeout(() => simulateKey(keyCode, 'keyup'), 100);
        }
      }

      if (input.type === 'joystick') {
        const threshold = 0.5;
        const currentKeys = new Set<string>();

        if (input.y < -threshold) { currentKeys.add('ArrowUp'); setLastInput("Joy Up"); }
        if (input.y > threshold) { currentKeys.add('ArrowDown'); setLastInput("Joy Down"); }
        if (input.x < -threshold) { currentKeys.add('ArrowLeft'); setLastInput("Joy Left"); }
        if (input.x > threshold) { currentKeys.add('ArrowRight'); setLastInput("Joy Right"); }
        if (currentKeys.size === 0) setLastInput("");

        // Check for released keys
        activeKeys.current.forEach(key => {
          if (!currentKeys.has(key)) {
            simulateKey(key, 'keyup');
            activeKeys.current.delete(key);
          }
        });

        // Check for newly pressed keys
        currentKeys.forEach(key => {
          if (!activeKeys.current.has(key)) {
            simulateKey(key, 'keydown');
            activeKeys.current.add(key);
          }
        });
      }

      if (iframeRef.current) {
        iframeRef.current.contentWindow?.postMessage({
          type: "controllerInput",
          controllerId,
          input
        }, "*");
      }
    };

    window.addEventListener('controllerInput', handleInput);
    return () => window.removeEventListener('controllerInput', handleInput);
  }, [id, playableGames, selectedIndex, router, createSession, session]);

  const handleStartGame = () => {
    if (currentGame) {
      addToRecentlyPlayed(currentGame.id);
      setGameStarted(true);
      window.focus();
    }
  };

  const toggleFullscreen = () => {
    const gameContainer = document.getElementById("game-container");
    if (gameContainer) {
      if (!document.fullscreenElement) {
        gameContainer.requestFullscreen();
        setIsFullscreen(true);
      } else {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  // If viewing a specific game
  if (id && currentGame) {
    return (
      <>



        <Layout>
          <div className="container mx-auto px-4 py-8">
            <Link
              href="/play"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Online Games
            </Link>

            <div className="grid lg:grid-cols-4 gap-8">
              {/* Game Player */}
              <div className="lg:col-span-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h1 className="text-2xl font-gaming font-bold">{currentGame.title}</h1>
                      <p className="text-muted-foreground">{currentGame.genre}</p>
                    </div>
                    <div className="flex gap-2">
                      {lastInput && (
                        <Badge variant="gaming" className="animate-pulse shadow-neon text-[10px] bg-primary/20 border-primary">
                          {lastInput}
                        </Badge>
                      )}
                      {controllers.length > 0 && (
                        <Badge variant="gaming" className="animate-pulse-glow">
                          {controllers.length} {controllers.length === 1 ? 'CONTROLLER' : 'CONTROLLERS'} CONNECTED
                        </Badge>
                      )}
                      <Badge variant="free">FREE TO PLAY</Badge>
                    </div>
                  </div>

                  {/* Game Container */}
                  <div
                    id="game-container"
                    className="relative bg-black rounded-lg overflow-hidden border border-border"
                  >
                    {!gameStarted ? (
                      <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-card to-background">
                        <div className="text-center">
                          <img
                            src={currentGame.coverImage}
                            alt={currentGame.title}
                            className="w-full h-full absolute inset-0 object-cover opacity-20"
                          />
                          <div className="relative z-10">
                            <Button
                              variant="gaming"
                              size="xl"
                              onClick={handleStartGame}
                              className="gap-2"
                            >
                              <Play className="w-6 h-6" />
                              Start Game
                            </Button>
                            <p className="text-muted-foreground mt-4 text-sm">
                              Click to start playing
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-video">
                        {gameEmbeds[id] ? (
                          <iframe
                            ref={iframeRef}
                            src={gameEmbeds[id]}
                            className="w-full h-full"
                            allowFullScreen
                            title={currentGame.title}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                            <div className="text-center p-8">
                              <div className="text-6xl mb-4">🎮</div>
                              <h3 className="text-xl font-gaming font-semibold mb-2">
                                Demo Mode
                              </h3>
                              <p className="text-muted-foreground max-w-md">
                                This is a demo placeholder. In production, the actual game would be embedded here using HTML5 or WebGL.
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Game Controls */}
                    {gameStarted && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setIsMuted(!isMuted)}
                            >
                              {isMuted ? (
                                <VolumeX className="w-5 h-5" />
                              ) : (
                                <Volume2 className="w-5 h-5" />
                              )}
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => setGameStarted(false)}
                            >
                              <RotateCcw className="w-5 h-5" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleFullscreen}
                          >
                            {isFullscreen ? (
                              <Minimize className="w-5 h-5" />
                            ) : (
                              <Maximize className="w-5 h-5" />
                            )}
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Input Feedback Overlay */}
                    {lastInput && (
                      <div className="absolute top-4 left-4 z-50 pointer-events-none">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary/50 flex items-center gap-2 shadow-neon-sm"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          <span className="text-[10px] font-gaming font-bold text-primary tracking-widest uppercase">
                            {lastInput}
                          </span>
                        </motion.div>
                      </div>
                    )}
                  </div>

                  {/* Game Description */}
                  <Card variant="gaming" className="mt-6 p-6">
                    <h2 className="text-lg font-gaming font-semibold mb-3">About This Game</h2>
                    <p className="text-muted-foreground">{currentGame.description}</p>
                  </Card>
                </motion.div>
              </div>

              {/* Sidebar - Controller & More Games */}
              <div className="space-y-8">
                {/* Controller Panel */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card variant="glass" className="p-6 bg-primary/5 border-primary/20">
                    <h3 className="font-gaming font-semibold mb-4 flex items-center gap-2">
                      <Smartphone className="w-5 h-5 text-primary" />
                      Controller Connection
                    </h3>
                    <QRControllerPanel gameId={id} />

                    {/* Mapping Guide */}
                    <div className="mt-6 pt-6 border-t border-primary/10">
                      <h4 className="text-[11px] font-gaming font-bold text-muted-foreground uppercase mb-3">
                        Controller Mapping
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { p: 'Joystick', k: 'Arrows' },
                          { p: 'Button A', k: 'Space' },
                          { p: 'Button B', k: 'Esc' },
                          { p: 'Start', k: 'Enter' }
                        ].map(item => (
                          <div key={item.p} className="flex justify-between items-center text-[10px] bg-white/5 py-1 px-2 rounded">
                            <span className="text-muted-foreground">{item.p}</span>
                            <span className="text-primary font-mono">{item.k}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-[10px] text-muted-foreground mt-4 text-center">
                      Scan to turn your phone into a gamepad
                    </p>
                  </Card>
                </motion.div>

                {/* More Games */}
                <div className="space-y-4">
                  <h3 className="font-gaming font-semibold text-muted-foreground px-1">More Games</h3>
                  {playableGames
                    .filter((g) => g.id !== id)
                    .slice(0, 3)
                    .map((game, index) => (
                      <Link key={game.id} href={`/play/${game.id}`}>
                        <Card variant="gaming" className="p-3 flex gap-3 cursor-pointer hover:border-primary/50 transition-colors">
                          <img
                            src={game.coverImage}
                            alt={game.title}
                            className="w-20 h-14 object-cover rounded"
                          />
                          <div>
                            <h4 className="font-semibold text-sm line-clamp-1">{game.title}</h4>
                            <p className="text-xs text-muted-foreground">{game.genre}</p>
                          </div>
                        </Card>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </>
    );
  }

  // Games list view
  return (
    <>



      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <Badge variant="gaming" className="mb-4">FREE TO PLAY</Badge>
            <h1 className="text-3xl md:text-5xl font-gaming font-bold mb-4">
              Play <span className="gaming-text-gradient">Online</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Jump into action instantly! Play our collection of browser-based games without any downloads.
            </p>
          </motion.div>

          {/* Main Content Area */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Games Grid */}
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {playableGames.map((game, index) => (
                  <GameCard
                    key={game.id}
                    game={game}
                    index={index}
                    isConsoleSelected={selectedIndex === index}
                  />
                ))}
              </div>

              {playableGames.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🎮</div>
                  <h3 className="text-xl font-gaming font-semibold mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground">
                    We're adding more playable games soon!
                  </p>
                </div>
              )}
            </div>

            {/* Console Sidebar */}
            <div className="space-y-6">
              <Card variant="glass" className="p-6 bg-primary/5 border-primary/20 sticky top-24">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-primary/20 rounded-lg">
                    <Smartphone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-gaming font-bold text-sm">Console Mode</h3>
                    <p className="text-[10px] text-muted-foreground">Pair to navigate collection</p>
                  </div>
                </div>

                <QRControllerPanel gameId="dashboard" />

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Navigate with Joystick / D-Pad</span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>Press (A) to Launch Game</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default PlayOnline;
