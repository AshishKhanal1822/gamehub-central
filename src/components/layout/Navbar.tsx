"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";

import { motion } from "framer-motion";
import {
  Gamepad2,
  Home,
  Library,
  Play,
  User,
  Menu,
  X,
  Search,
  Sun,
  Moon
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useApp } from "@/context/AppContext";
import { games as allGames } from "@/data/games";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/games", label: "Library", icon: Library },
  { path: "/play", label: "Play Online", icon: Play },
];

export const Navbar = () => {
  const pathname = usePathname();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { favorites } = useApp();


  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (pathname === path) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const searchResults = searchQuery
    ? allGames.filter(game =>
      game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.genre.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5)
    : [];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Gamepad2 className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-gaming font-bold gaming-text-gradient">
              GameHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navItems.map((item) => {
              const isActive = pathname === item.path;

              return (
                <Link key={item.path} href={item.path} onClick={(e) => handleNavClick(e, item.path)}>
                  <motion.div
                    className={`relative px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium text-sm lg:text-base">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-primary/10 rounded-lg border border-primary/30"
                        initial={false}
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
            {/* Search Bar */}
            {pathname !== "/play" && (
              <div className="ml-4 relative group">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border transition-all duration-300 ${isSearchOpen ? 'w-64 border-primary/50 ring-1 ring-primary/20' : 'w-10 overflow-hidden'}`}>
                  <Search
                    className="w-4 h-4 text-muted-foreground cursor-pointer shrink-0"
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                  />
                  <input
                    type="text"
                    placeholder="Search games..."
                    className="bg-transparent border-none outline-none text-sm w-full font-body"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (!isSearchOpen) setIsSearchOpen(true);
                    }}
                    onFocus={() => setIsSearchOpen(true)}
                  />
                </div>

                {/* Search Results Dropdown */}
                {isSearchOpen && searchResults.length > 0 && (
                  <div className="absolute top-12 left-0 right-0 bg-card/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div className="p-2">
                      {searchResults.map((game) => (
                        <Link
                          key={game.id}
                          href={`/games/${game.id}`}
                          onClick={() => {
                            setSearchQuery("");
                            setIsSearchOpen(false);
                          }}
                        >
                          <div className="flex items-center gap-3 p-2 hover:bg-primary/10 rounded-lg transition-colors group">
                            <img src={game.coverImage} className="w-10 h-10 rounded object-cover border border-border" alt={game.title} />
                            <div>
                              <div className="text-sm font-bold group-hover:text-primary transition-colors">{game.title}</div>
                              <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{game.genre}</div>
                            </div>
                          </div>
                        </Link>
                      ))}
                      <div className="p-2 border-t border-border mt-1">
                        <Link
                          href={`/games?q=${searchQuery}`}
                          className="text-[10px] font-bold text-primary uppercase flex items-center justify-center hover:underline"
                          onClick={() => setIsSearchOpen(false)}
                        >
                          View all results
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="relative"
            >
              {mounted && theme === "light" ? (
                <Moon className="w-5 h-5 text-foreground" />
              ) : (
                <Sun className="w-5 h-5 text-foreground" />
              )}
            </Button>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {
        mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-card border-t border-border"
          >
            <div className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={(e) => handleNavClick(e, item.path)}
                  >
                    <div
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "hover:bg-secondary"
                        }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                  </Link>
                );
              })}


              <div className="border-t border-border pt-4 mt-4 flex justify-between items-center px-4">
                <span className="text-sm font-medium">Theme</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {mounted && theme === "light" ? (
                    <Moon className="w-5 h-5" />
                  ) : (
                    <Sun className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        )
      }
    </nav >
  );
};