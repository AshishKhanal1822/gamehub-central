import { Gamepad2, Github, Twitter, Youtube, Mail, Trophy, Newspaper, Star } from "lucide-react";
import Link from "next/link";


export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Gamepad2 className="w-8 h-8 text-primary" />
              <span className="text-xl font-gaming font-bold gaming-text-gradient">
                GameHub
              </span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Your global gaming destination. Browse and play the best free games from around the world.
            </p>
            <div className="flex gap-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-gaming font-semibold mb-4">Explore</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/games" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <Gamepad2 className="w-4 h-4" />
                  All Games
                </Link>
              </li>
              <li>
                <Link href="/play" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <Star className="w-4 h-4" />
                  Play Online
                </Link>
              </li>


              <li>
                <Link href="/news" className="text-muted-foreground hover:text-primary transition-colors text-sm flex items-center gap-2">
                  <Newspaper className="w-4 h-4" />
                  Gaming News
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-gaming font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/games?genre=action" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Action Games
                </Link>
              </li>
              <li>
                <Link href="/games?genre=rpg" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  RPG Games
                </Link>
              </li>
              <li>
                <Link href="/games?genre=strategy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Strategy Games
                </Link>
              </li>
              <li>
                <Link href="/games?genre=casual" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Casual Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-gaming font-semibold mb-4">Community</h4>
            <ul className="space-y-2">
              {/* <li>
                <Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Admin Panel
                </Link>
              </li> */}
              <li>
                <a href="mailto:support@gamehub.com" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                  <Mail className="w-4 h-4" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>© 2026 GameHub. All rights reserved. Made with ❤️ for gamers worldwide.</p>
        </div>
      </div>
    </footer>
  );
};
