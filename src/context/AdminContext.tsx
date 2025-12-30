"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

import { Game } from "@/types/game";
import { games as initialGames } from "@/data/games";

interface AdminContextType {
  isAdmin: boolean;
  adminLogin: (password: string) => boolean;
  adminLogout: () => void;
  allGames: Game[];
  addGame: (game: Omit<Game, "id">) => void;
  updateGame: (id: string, updates: Partial<Game>) => void;
  deleteGame: (id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Simple admin password (in production, use proper auth)
const ADMIN_PASSWORD = "admin123";

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [allGames, setAllGames] = useState<Game[]>(initialGames);

  const adminLogin = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
  };

  const addGame = (game: Omit<Game, "id">) => {
    const newGame: Game = {
      ...game,
      id: Date.now().toString(),
    };
    setAllGames(prev => [...prev, newGame]);
  };

  const updateGame = (id: string, updates: Partial<Game>) => {
    setAllGames(prev =>
      prev.map(game => (game.id === id ? { ...game, ...updates } : game))
    );
  };

  const deleteGame = (id: string) => {
    setAllGames(prev => prev.filter(game => game.id !== id));
  };

  return (
    <AdminContext.Provider value={{
      isAdmin,
      adminLogin,
      adminLogout,
      allGames,
      addGame,
      updateGame,
      deleteGame,
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    return {
      isAdmin: false,
      adminLogin: () => false,
      adminLogout: () => { },
      allGames: [],
      addGame: () => { },
      updateGame: () => { },
      deleteGame: () => { },
    };
  }
  return context;
};

