"use client";

import { useState, useMemo } from "react";

import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { motion } from "framer-motion";

import { Search, Filter, X, SlidersHorizontal } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { GameCard } from "@/components/games/GameCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { genres, platforms, regions } from "@/data/games";
import { useAdmin } from "@/context/AdminContext";

const GamesLibrary = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { allGames } = useAdmin();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [genreFilter, setGenreFilter] = useState(searchParams.get("genre") || "all");
  const [platformFilter, setPlatformFilter] = useState(searchParams.get("platform") || "all");
  const [regionFilter, setRegionFilter] = useState(searchParams.get("region") || "all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredGames = useMemo(() => {
    return allGames.filter(game => {
      if (genreFilter !== "all" && game.genre !== genreFilter) return false;
      if (platformFilter !== "all" && !game.platform.includes(platformFilter)) return false;
      if (regionFilter !== "all" && game.region !== regionFilter) return false;
      if (searchQuery && !game.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });
  }, [allGames, genreFilter, platformFilter, regionFilter, searchQuery]);

  const activeFiltersCount = [
    genreFilter !== "all" ? genreFilter : "",
    platformFilter !== "all" ? platformFilter : "",
    regionFilter !== "all" ? regionFilter : ""
  ].filter(Boolean).length;

  const clearFilters = () => {
    setGenreFilter("all");
    setPlatformFilter("all");
    setRegionFilter("all");
    setSearchQuery("");
    router.replace(pathname);
  };

  return (
    <>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-gaming font-bold mb-2">
              Games <span className="gaming-text-gradient">Library</span>
            </h1>
            <p className="text-muted-foreground">
              Discover {allGames.length} amazing games from around the world
            </p>
          </motion.div>

          {/* Search & Filters Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filter Toggle (Mobile) */}
            <Button
              variant="outline"
              className="md:hidden gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <Badge variant="gaming" className="ml-1">{activeFiltersCount}</Badge>
              )}
            </Button>

            {/* Desktop Filters */}
            <div className="hidden md:flex gap-3">
              <Select value={genreFilter} onValueChange={setGenreFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Platforms</SelectItem>
                  {platforms.map(platform => (
                    <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  {regions.map(region => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="icon" onClick={clearFilters}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-card rounded-lg border border-border p-4 mb-6 space-y-4"
            >
              <div className="grid grid-cols-2 gap-3">
                <Select value={genreFilter} onValueChange={setGenreFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    {genres.map(genre => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={platformFilter} onValueChange={setPlatformFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Platform" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Platforms</SelectItem>
                    {platforms.map(platform => (
                      <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={regionFilter} onValueChange={setRegionFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Regions</SelectItem>
                    {regions.map(region => (
                      <SelectItem key={region} value={region}>{region}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {activeFiltersCount > 0 && (
                <Button variant="outline" size="sm" onClick={clearFilters} className="w-full">
                  Clear All Filters
                </Button>
              )}
            </motion.div>
          )}

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-muted-foreground">
              Showing <span className="text-foreground font-medium">{filteredGames.length}</span> games
            </p>
          </div>

          {/* Games Grid */}
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredGames.map((game, index) => (
                <GameCard key={game.id} game={game} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-xl font-gaming font-semibold mb-2">No games found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters or search query</p>
              <Button variant="gaming" onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default GamesLibrary;
