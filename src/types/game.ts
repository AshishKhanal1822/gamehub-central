export interface Game {
  id: string;
  title: string;
  description: string;
  genre: string;
  platform: string[];
  rating: number;
  releaseDate: string;
  coverImage: string;
  heroImage?: string;
  screenshots: string[];
  trailer?: string;
  developer: string;
  publisher: string;
  isPlayable: boolean;
  isFeatured: boolean;
  isNew: boolean;
  region: string;
  systemRequirements?: {
    minimum: string;
    recommended: string;
  };
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  recentlyPlayed: string[];
}
