"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Game } from "@/types/game";
import { UserProfile, Achievement, GameReview } from "@/types/user.ts";

interface AppContextType {
  // Existing
  favorites: string[];
  toggleFavorite: (gameId: string) => void;
  recentlyPlayed: string[];
  addToRecentlyPlayed: (gameId: string) => void;

  // User Profile
  userProfile: UserProfile | null;
  createProfile: (username: string, avatar: string) => void;
  updateProfile: (updates: Partial<UserProfile>) => void;

  // Achievements
  unlockAchievement: (achievementId: string) => void;

  // Reviews
  reviews: GameReview[];
  addReview: (gameId: string, rating: number, comment: string) => void;
  getGameReviews: (gameId: string) => GameReview[];
  markReviewHelpful: (reviewId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Predefined achievements
const ACHIEVEMENTS: Achievement[] = [
  { id: "first_game", title: "First Steps", description: "Play your first game", icon: "🎮", maxProgress: 1 },
  { id: "game_explorer", title: "Game Explorer", description: "Play 5 different games", icon: "🗺️", maxProgress: 5 },
  { id: "game_master", title: "Game Master", description: "Play 20 different games", icon: "👑", maxProgress: 20 },
  { id: "favorite_collector", title: "Favorite Collector", description: "Add 10 games to favorites", icon: "💜", maxProgress: 10 },
  { id: "reviewer", title: "Reviewer", description: "Write your first review", icon: "✍️", maxProgress: 1 },
  { id: "critic", title: "Critic", description: "Write 10 reviews", icon: "🎭", maxProgress: 10 },
  { id: "daily_player", title: "Daily Player", description: "Play games 7 days in a row", icon: "🔥", maxProgress: 7 },
];

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<string[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [reviews, setReviews] = useState<GameReview[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("gamehub_favorites");
    const savedRecent = localStorage.getItem("gamehub_recent");
    const savedProfile = localStorage.getItem("gamehub_profile");
    const savedReviews = localStorage.getItem("gamehub_reviews");

    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedRecent) setRecentlyPlayed(JSON.parse(savedRecent));
    if (savedProfile) setUserProfile(JSON.parse(savedProfile));
    if (savedReviews) setReviews(JSON.parse(savedReviews));

    setMounted(true);
  }, []);

  // Sync favorites to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("gamehub_favorites", JSON.stringify(favorites));

      // Update profile stats
      if (userProfile) {
        const updated = {
          ...userProfile,
          stats: { ...userProfile.stats, favoritesCount: favorites.length }
        };
        setUserProfile(updated);
        localStorage.setItem("gamehub_profile", JSON.stringify(updated));
      }
    }
  }, [favorites, mounted]);

  // Sync recentlyPlayed to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("gamehub_recent", JSON.stringify(recentlyPlayed));
    }
  }, [recentlyPlayed, mounted]);

  // Sync profile to localStorage
  useEffect(() => {
    if (mounted && userProfile) {
      localStorage.setItem("gamehub_profile", JSON.stringify(userProfile));
    }
  }, [userProfile, mounted]);

  // Sync reviews to localStorage
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("gamehub_reviews", JSON.stringify(reviews));
    }
  }, [reviews, mounted]);

  const toggleFavorite = (gameId: string) => {
    setFavorites(prev =>
      prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId]
    );

    // Check for favorite achievements
    checkAchievements();
  };

  const addToRecentlyPlayed = (gameId: string) => {
    setRecentlyPlayed(prev => [
      gameId,
      ...prev.filter(id => id !== gameId)
    ].slice(0, 10));

    // Update profile stats
    if (userProfile) {
      const uniqueGames = new Set([gameId, ...recentlyPlayed]);
      const updated = {
        ...userProfile,
        stats: { ...userProfile.stats, gamesPlayed: uniqueGames.size }
      };
      setUserProfile(updated);
    }

    // Check for play achievements
    checkAchievements();
  };

  const createProfile = (username: string, avatar: string) => {
    const newProfile: UserProfile = {
      id: Date.now().toString(),
      username,
      avatar,
      createdAt: new Date().toISOString(),
      stats: {
        gamesPlayed: recentlyPlayed.length,
        favoritesCount: favorites.length,
        reviewsCount: 0,
        achievementsCount: 0
      },
      achievements: ACHIEVEMENTS.map(a => ({ ...a, progress: 0 }))
    };
    setUserProfile(newProfile);
  };

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (userProfile) {
      setUserProfile({ ...userProfile, ...updates });
    }
  };

  const unlockAchievement = (achievementId: string) => {
    if (!userProfile) return;

    const achievements = userProfile.achievements.map(a =>
      a.id === achievementId && !a.unlockedAt
        ? { ...a, unlockedAt: new Date().toISOString(), progress: a.maxProgress }
        : a
    );

    const achievementsCount = achievements.filter(a => a.unlockedAt).length;

    setUserProfile({
      ...userProfile,
      achievements,
      stats: { ...userProfile.stats, achievementsCount }
    });
  };

  const checkAchievements = () => {
    if (!userProfile) return;

    const uniqueGamesPlayed = new Set(recentlyPlayed).size;
    const favCount = favorites.length;
    const reviewCount = reviews.filter(r => r.userId === userProfile.id).length;

    // Update achievement progress
    const achievements = userProfile.achievements.map(a => {
      let progress = a.progress || 0;

      switch (a.id) {
        case "first_game":
          progress = uniqueGamesPlayed >= 1 ? 1 : 0;
          break;
        case "game_explorer":
          progress = Math.min(uniqueGamesPlayed, 5);
          break;
        case "game_master":
          progress = Math.min(uniqueGamesPlayed, 20);
          break;
        case "favorite_collector":
          progress = Math.min(favCount, 10);
          break;
        case "reviewer":
          progress = reviewCount >= 1 ? 1 : 0;
          break;
        case "critic":
          progress = Math.min(reviewCount, 10);
          break;
      }

      // Auto-unlock if progress is complete
      if (progress >= (a.maxProgress || 1) && !a.unlockedAt) {
        return { ...a, progress, unlockedAt: new Date().toISOString() };
      }

      return { ...a, progress };
    });

    const achievementsCount = achievements.filter(a => a.unlockedAt).length;

    setUserProfile({
      ...userProfile,
      achievements,
      stats: { ...userProfile.stats, achievementsCount }
    });
  };

  const addReview = (gameId: string, rating: number, comment: string) => {
    if (!userProfile) return;

    const newReview: GameReview = {
      id: Date.now().toString(),
      gameId,
      userId: userProfile.id,
      username: userProfile.username,
      rating,
      comment,
      createdAt: new Date().toISOString(),
      helpful: 0
    };

    setReviews(prev => [newReview, ...prev]);

    // Update profile stats
    const updated = {
      ...userProfile,
      stats: { ...userProfile.stats, reviewsCount: reviews.length + 1 }
    };
    setUserProfile(updated);

    // Check for review achievements
    checkAchievements();
  };

  const getGameReviews = (gameId: string) => {
    return reviews.filter(r => r.gameId === gameId).sort((a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  };

  const markReviewHelpful = (reviewId: string) => {
    setReviews(prev => prev.map(r =>
      r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
    ));
  };

  return (
    <AppContext.Provider value={{
      favorites,
      toggleFavorite,
      recentlyPlayed,
      addToRecentlyPlayed,
      userProfile,
      createProfile,
      updateProfile,
      unlockAchievement,
      reviews,
      addReview,
      getGameReviews,
      markReviewHelpful
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    return {
      favorites: [],
      toggleFavorite: () => { },
      recentlyPlayed: [],
      addToRecentlyPlayed: () => { },
      userProfile: null,
      createProfile: () => { },
      updateProfile: () => { },
      unlockAchievement: () => { },
      reviews: [],
      addReview: () => { },
      getGameReviews: () => [],
      markReviewHelpful: () => { }
    };
  }
  return context;
};
