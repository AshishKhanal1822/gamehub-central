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
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        setUser({
          ...data.data,
          // Ensure recentlyPlayed is initialized if missing
          recentlyPlayed: data.data.recentlyPlayed || []
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login failed:", error);
      return false;
    }
  };

  const signup = async (email: string, password: string, username: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, username }),
      });
      const data = await res.json();

      if (data.success) {
        setUser({
          ...data.data,
          recentlyPlayed: []
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error("Signup failed:", error);
      return false;
    }
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

