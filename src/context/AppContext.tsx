"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

import { Game, User } from "@/types/game";

interface AppContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, username: string) => Promise<boolean>;
  logout: () => void;
  addToRecentlyPlayed: (gameId: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in production, this would call an API
    if (email && password) {
      setUser({
        id: "1",
        email,
        username: email.split("@")[0],
        recentlyPlayed: []
      });
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, username: string): Promise<boolean> => {
    // Mock signup - in production, this would call an API
    if (email && password && username) {
      setUser({
        id: "1",
        email,
        username,
        recentlyPlayed: []
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const addToRecentlyPlayed = (gameId: string) => {
    if (user) {
      setUser(prev => prev ? {
        ...prev,
        recentlyPlayed: [gameId, ...prev.recentlyPlayed.filter(id => id !== gameId)].slice(0, 10)
      } : null);
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      login,
      signup,
      logout,
      addToRecentlyPlayed
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    return {
      user: null,
      login: async () => false,
      signup: async () => false,
      logout: () => { },
      addToRecentlyPlayed: () => { }
    };
  }
  return context;
};

