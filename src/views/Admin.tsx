"use client";

import { useState } from "react";


import { motion } from "framer-motion";

import {
  Shield,
  Plus,
  Edit2,
  Trash2,
  Star,
  Play,
  DollarSign,
  Save,
  X,
  LogOut,
  Lock,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAdmin } from "@/context/AdminContext";
import { toast } from "@/hooks/use-toast";
import { Game } from "@/types/game";
import { genres, platforms, regions } from "@/data/games";

const emptyGame: Omit<Game, "id"> = {
  title: "",
  description: "",
  genre: "Action",
  platform: ["PC"],
  rating: 4.0,
  releaseDate: new Date().toISOString().split("T")[0],
  coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop",
  screenshots: [],
  developer: "",
  publisher: "",
  isPlayable: false,
  isFeatured: false,
  isNew: true,
  region: "Global",
};

const Admin = () => {
  const { isAdmin, adminLogin, adminLogout, allGames, addGame, updateGame, deleteGame } = useAdmin();
  const [password, setPassword] = useState("");
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [newGame, setNewGame] = useState<Omit<Game, "id">>(emptyGame);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminLogin(password)) {
      toast({ title: "Welcome, Admin!", description: "You now have access to the admin panel." });
    } else {
      toast({ title: "Access Denied", description: "Incorrect password.", variant: "destructive" });
    }
    setPassword("");
  };

  const handleAddGame = () => {
    if (!newGame.title || !newGame.description) {
      toast({ title: "Error", description: "Please fill in required fields.", variant: "destructive" });
      return;
    }
    addGame(newGame);
    toast({ title: "Game Added", description: `${newGame.title} has been added to the library.` });
    setNewGame(emptyGame);
    setShowAddDialog(false);
  };

  const handleUpdateGame = () => {
    if (!editingGame) return;
    updateGame(editingGame.id, editingGame);
    toast({ title: "Game Updated", description: `${editingGame.title} has been updated.` });
    setEditingGame(null);
    setShowEditDialog(false);
  };

  const handleDeleteGame = (game: Game) => {
    if (window.confirm(`Are you sure you want to delete "${game.title}"?`)) {
      deleteGame(game.id);
      toast({ title: "Game Deleted", description: `${game.title} has been removed.` });
    }
  };

  if (!isAdmin) {
    return (
      <>


        <Layout>
          <div className="min-h-[70vh] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Card variant="glass" className="p-8 w-full max-w-md">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <h1 className="text-2xl font-gaming font-bold">Admin Access</h1>
                  <p className="text-muted-foreground mt-2">Enter admin password to continue</p>
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Admin Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button variant="gaming" className="w-full">Access Panel</Button>
                </form>
                <p className="text-xs text-muted-foreground text-center mt-4">
                  Demo password: admin123
                </p>
              </Card>
            </motion.div>
          </div>
        </Layout>
      </>
    );
  }

  return (
    <>


      <Layout>
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-gaming font-bold">
                Admin <span className="gaming-text-gradient">Panel</span>
              </h1>
              <p className="text-muted-foreground">Manage your game library</p>
            </div>
            <div className="flex gap-3">
              <Button variant="gaming" onClick={() => setShowAddDialog(true)} className="gap-2">
                <Plus className="w-4 h-4" /> Add Game
              </Button>
              <Button variant="outline" onClick={adminLogout} className="gap-2">
                <LogOut className="w-4 h-4" /> Logout
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card variant="gaming" className="p-4 text-center">
              <div className="text-3xl font-gaming font-bold text-primary">{allGames.length}</div>
              <div className="text-sm text-muted-foreground">Total Games</div>
            </Card>
            <Card variant="gaming" className="p-4 text-center">
              <div className="text-3xl font-gaming font-bold text-gaming-green">

              </div>
              <div className="text-sm text-muted-foreground">Free Games</div>
            </Card>
            <Card variant="gaming" className="p-4 text-center">
              <div className="text-3xl font-gaming font-bold text-accent">
                {allGames.filter(g => g.isPlayable).length}
              </div>
              <div className="text-sm text-muted-foreground">Playable Online</div>
            </Card>
            <Card variant="gaming" className="p-4 text-center">
              <div className="text-3xl font-gaming font-bold text-gaming-orange">
                {allGames.filter(g => g.isFeatured).length}
              </div>
              <div className="text-sm text-muted-foreground">Featured</div>
            </Card>
          </div>

          {/* Games Table */}
          <Card variant="glass" className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary">
                  <tr>
                    <th className="text-left p-4 font-gaming">Game</th>
                    <th className="text-left p-4 font-gaming hidden md:table-cell">Genre</th>
                    <th className="text-left p-4 font-gaming hidden lg:table-cell">Price</th>
                    <th className="text-center p-4 font-gaming">Status</th>
                    <th className="text-right p-4 font-gaming">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allGames.map((game, index) => (
                    <motion.tr
                      key={game.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-t border-border hover:bg-secondary/50"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img src={game.coverImage} alt={game.title} className="w-12 h-8 object-cover rounded" />
                          <div>
                            <div className="font-semibold">{game.title}</div>
                            <div className="text-xs text-muted-foreground">{game.developer}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 hidden md:table-cell text-muted-foreground">{game.genre}</td>
                      <td className="p-4 hidden lg:table-cell">
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center gap-2">
                          {game.isFeatured && <Badge variant="premium">Featured</Badge>}
                          {game.isPlayable && <Badge variant="gaming">Playable</Badge>}
                          {game.isNew && <Badge variant="new">New</Badge>}
                        </div>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => { setEditingGame(game); setShowEditDialog(true); }}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteGame(game)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </Layout>

      {/* Add Game Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-gaming">Add New Game</DialogTitle>
          </DialogHeader>
          <GameForm
            game={newGame}
            onChange={setNewGame}
            onSave={handleAddGame}
            onCancel={() => setShowAddDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Game Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-gaming">Edit Game</DialogTitle>
          </DialogHeader>
          {editingGame && (
            <GameForm
              game={editingGame}
              onChange={(updates) => setEditingGame({ ...editingGame, ...updates })}
              onSave={handleUpdateGame}
              onCancel={() => setShowEditDialog(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

interface GameFormProps {
  game: Omit<Game, "id"> | Game;
  onChange: (updates: any) => void;
  onSave: () => void;
  onCancel: () => void;
}

const GameForm = ({ game, onChange, onSave, onCancel }: GameFormProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <Input
            value={game.title}
            onChange={(e) => onChange({ ...game, title: e.target.value })}
            placeholder="Game title"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Genre</label>
          <Select value={game.genre} onValueChange={(v) => onChange({ ...game, genre: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {genres.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description *</label>
        <Textarea
          value={game.description}
          onChange={(e) => onChange({ ...game, description: e.target.value })}
          placeholder="Game description"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Price ($)</label>
          <Input
            type="number"
            min="0"
            step="0.01"

            onChange={(e) => onChange({ ...game, price: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rating</label>
          <Input
            type="number"
            min="0"
            max="5"
            step="0.1"
            value={game.rating}
            onChange={(e) => onChange({ ...game, rating: parseFloat(e.target.value) || 0 })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Region</label>
          <Select value={game.region} onValueChange={(v) => onChange({ ...game, region: v })}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Developer</label>
          <Input
            value={game.developer}
            onChange={(e) => onChange({ ...game, developer: e.target.value })}
            placeholder="Developer name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Publisher</label>
          <Input
            value={game.publisher}
            onChange={(e) => onChange({ ...game, publisher: e.target.value })}
            placeholder="Publisher name"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Cover Image URL</label>
        <Input
          value={game.coverImage}
          onChange={(e) => onChange({ ...game, coverImage: e.target.value })}
          placeholder="https://..."
        />
      </div>

      <div className="flex flex-wrap gap-6 pt-4 border-t border-border">
        <label className="flex items-center gap-2 cursor-pointer">
          <Switch
            checked={game.isPlayable}
            onCheckedChange={(v) => onChange({ ...game, isPlayable: v })}
          />
          <span className="text-sm">Play Online</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <Switch
            checked={game.isFeatured}
            onCheckedChange={(v) => onChange({ ...game, isFeatured: v })}
          />
          <span className="text-sm">Featured</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <Switch
            checked={game.isNew}
            onCheckedChange={(v) => onChange({ ...game, isNew: v })}
          />
          <span className="text-sm">New Release</span>
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button variant="gaming" onClick={onSave} className="gap-2">
          <Save className="w-4 h-4" /> Save Game
        </Button>
      </div>
    </div>
  );
};

export default Admin;
