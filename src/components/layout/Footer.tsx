import { Gamepad2, Github, Twitter, Youtube, Mail } from "lucide-react";
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
              Your global gaming destination. Browse, buy, and play the best games from around the world.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-gaming font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/games" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  All Games
                </Link>
              </li>
              <li>
                <Link href="/play" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Play Online
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-gaming font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/games?genre=Action" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Action Games
                </Link>
              </li>
              <li>
                <Link href="/games?genre=RPG" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  RPG Games
                </Link>
              </li>
              <li>
                <Link href="/games?genre=Strategy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Strategy Games
                </Link>
              </li>
              <li>
                <Link href="/games?price=free" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Free Games
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-gaming font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm">
                  <Mail className="w-4 h-4" />
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>© 2024 GameHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
