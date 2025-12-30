"use client";


import { useRouter } from "next/navigation";

import { useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { useApp } from "@/context/AppContext";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GameCard } from "@/components/games/GameCard";
import { Game } from "@/types/game";
import { useAdmin } from "@/context/AdminContext";

import { User, Mail, Calendar, Trophy, Clock, Library, Settings, LogOut, Lock } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";


const Profile = () => {
  const { user } = useApp();
  const { allGames } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/auth");
    }
  }, [user, router]);

  if (!user) return null;


  const recentGames = user.recentlyPlayed.map((id: string) => allGames.find(g => g.id === id)).filter(Boolean);

  return (
    <>
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <Card variant="glass" className="p-8 mb-8">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-gaming font-bold">{user.username}</h1>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </Card>

          <div className="max-w-4xl mx-auto">
            <h2 className="text-xl font-gaming font-semibold mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Recently Played
            </h2>

            {recentGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recentGames.map((game: Game) => game && (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card/50 rounded-xl border border-dashed border-border">
                <p className="text-muted-foreground">No recently played games yet. Start exploring!</p>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
