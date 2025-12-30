import { Game } from "@/types/game";

export const games: Game[] = [
  {
    id: "1",
    title: "Cyber Nexus 2088",
    description: "Dive into a sprawling cyberpunk metropolis where corporations rule and hackers fight for freedom. Experience a gripping narrative-driven RPG with stunning visuals and deep character customization.",
    genre: "RPG",
    platform: ["PC", "Console"],
    rating: 4.8,
    releaseDate: "2024-03-15",
    coverImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800",
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800"
    ],
    developer: "NeoTech Studios",
    publisher: "Digital Dreams",
    isPlayable: true,
    isFeatured: true,
    isNew: true,
    region: "Global",
    systemRequirements: {
      minimum: "Intel i5-8400, GTX 1060, 16GB RAM",
      recommended: "Intel i7-10700, RTX 3070, 32GB RAM"
    }
  },
  {
    id: "2",
    title: "Stellar Odyssey",
    description: "Explore the vast universe in this epic space exploration game. Build your fleet, colonize planets, and forge alliances across the galaxy.",
    genre: "Strategy",
    platform: ["PC"],
    rating: 4.6,
    releaseDate: "2024-01-20",
    coverImage: "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&h=450&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800"
    ],
    developer: "Cosmos Interactive",
    publisher: "Stellar Games",
    isPlayable: true,
    isFeatured: true,
    isNew: false,
    region: "Global",
    systemRequirements: {
      minimum: "Intel i5-6500, GTX 1050, 8GB RAM",
      recommended: "Intel i7-9700, RTX 2060, 16GB RAM"
    }
  },
  {
    id: "3",
    title: "Shadow Legends: Arena",
    description: "Fast-paced multiplayer combat in a dark fantasy setting. Choose your champion and battle in intense 5v5 matches.",
    genre: "Action",
    platform: ["PC", "Console", "Mobile"],
    rating: 4.4,
    releaseDate: "2023-11-10",
    coverImage: "https://images.unsplash.com/photo-1552820728-8b83bb6b2b0b?w=800&h=450&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800"
    ],
    developer: "Mythic Games",
    publisher: "Mythic Games",
    isPlayable: true,
    isFeatured: true,
    isNew: false,
    region: "Global"
  },
  {
    id: "4",
    title: "Velocity Rush",
    description: "Experience the ultimate racing thrill with cutting-edge graphics and realistic physics. Race through stunning locations worldwide.",
    genre: "Racing",
    platform: ["PC", "Console"],
    rating: 4.5,
    releaseDate: "2024-02-28",
    coverImage: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=800&h=450&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800"
    ],
    developer: "Speed Studios",
    publisher: "Racing Interactive",
    isPlayable: true,
    isFeatured: false,
    isNew: true,
    region: "Global",
    systemRequirements: {
      minimum: "Intel i5-7400, GTX 1050 Ti, 8GB RAM",
      recommended: "Intel i7-10700K, RTX 3060, 16GB RAM"
    }
  },
  {
    id: "5",
    title: "Puzzle Dimensions",
    description: "Mind-bending puzzles across multiple dimensions. Test your logic and spatial reasoning in this award-winning puzzle game.",
    genre: "Puzzle",
    platform: ["PC", "Mobile"],
    rating: 4.7,
    releaseDate: "2023-09-05",
    coverImage: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=800&h=450&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1611996575749-79a3a250f948?w=800"
    ],
    developer: "Mind Games Inc",
    publisher: "Indie Collective",
    isPlayable: true,
    isFeatured: false,
    isNew: false,
    region: "Global"
  },
  {
    id: "6",
    title: "Kingdom Conquest",
    description: "Build your medieval empire from the ground up. Wage war, forge alliances, and write your legacy in this grand strategy epic.",
    genre: "Strategy",
    platform: ["PC"],
    rating: 4.3,
    releaseDate: "2023-12-01",
    coverImage: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=800"
    ],
    developer: "Crown Studios",
    publisher: "Epic Games Publishing",
    isPlayable: true,
    isFeatured: false,
    isNew: false,
    region: "Europe",
    systemRequirements: {
      minimum: "Intel i5-4460, GTX 960, 8GB RAM",
      recommended: "Intel i7-8700, GTX 1070, 16GB RAM"
    }
  },
  {
    id: "7",
    title: "Neon Striker",
    description: "Retro-styled arcade shooter with modern mechanics. Battle through waves of enemies in this addictive action game.",
    genre: "Action",
    platform: ["PC", "Mobile"],
    rating: 4.2,
    releaseDate: "2024-01-05",
    coverImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=450&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=800"
    ],
    developer: "Pixel Perfect",
    publisher: "Retro Games",
    isPlayable: true,
    isFeatured: false,
    isNew: true,
    region: "Global"
  },
  {
    id: "8",
    title: "Mystic Quest Online",
    description: "Join millions of players in this massive multiplayer fantasy adventure. Explore dungeons, craft items, and become a legend.",
    genre: "MMO",
    platform: ["PC"],
    rating: 4.1,
    releaseDate: "2022-06-15",
    coverImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=450&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800"
    ],
    developer: "Fantasy World Studios",
    publisher: "Global Gaming",
    isPlayable: true,
    isFeatured: false,
    isNew: false,
    region: "Asia",
    systemRequirements: {
      minimum: "Intel i3-6100, GTX 750 Ti, 8GB RAM",
      recommended: "Intel i5-8400, GTX 1060, 16GB RAM"
    }
  },
  {
    id: "9",
    title: "Block Builder Pro",
    description: "Unleash your creativity in this sandbox building game. Create anything you can imagine with unlimited resources.",
    genre: "Sandbox",
    platform: ["PC", "Console", "Mobile"],
    rating: 4.6,
    releaseDate: "2023-03-20",
    coverImage: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=800&h=450&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1472457897821-70d3819a0e24?w=800"
    ],
    developer: "Creative Labs",
    publisher: "Family Games",
    isPlayable: true,
    isFeatured: false,
    isNew: false,
    region: "Global"
  },
  {
    id: "10",
    title: "Dragon's Legacy",
    description: "Embark on an epic journey to save the realm from ancient dragons. A classic JRPG with modern twists.",
    genre: "RPG",
    platform: ["PC", "Console"],
    rating: 4.9,
    releaseDate: "2024-04-01",
    coverImage: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=800&h=450&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=800"
    ],
    developer: "Eastern Dreams",
    publisher: "JRPG Masters",
    isPlayable: true,
    isFeatured: true,
    isNew: true,
    region: "Japan",
    systemRequirements: {
      minimum: "Intel i5-6600, GTX 1050 Ti, 12GB RAM",
      recommended: "Intel i7-10700, RTX 3060, 16GB RAM"
    }
  },
  {
    id: "11",
    title: "Soccer Champions 2024",
    description: "The most realistic soccer simulation ever created. Lead your team to glory in leagues worldwide.",
    genre: "Sports",
    platform: ["PC", "Console"],
    rating: 4.4,
    releaseDate: "2024-02-10",
    coverImage: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800"
    ],
    developer: "Sport Kings",
    publisher: "Athletic Games",
    isPlayable: true,
    isFeatured: false,
    isNew: true,
    region: "Europe",
    systemRequirements: {
      minimum: "Intel i5-7500, GTX 1050, 8GB RAM",
      recommended: "Intel i7-9700, RTX 2070, 16GB RAM"
    }
  },
  {
    id: "12",
    title: "Zombie Survival",
    description: "Survive the apocalypse in this intense survival horror game. Scavenge, build, and fight to stay alive.",
    genre: "Horror",
    platform: ["PC"],
    rating: 4.0,
    releaseDate: "2023-10-31",
    coverImage: "https://images.unsplash.com/photo-1509248961725-9d3c0c4e4c18?w=800&h=450&fit=crop",
    screenshots: [
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800"
    ],
    developer: "Horror Studios",
    publisher: "Nightmare Games",
    isPlayable: true,
    isFeatured: false,
    isNew: false,
    region: "Americas",
    systemRequirements: {
      minimum: "Intel i5-4590, GTX 960, 8GB RAM",
      recommended: "Intel i7-8700, GTX 1070, 16GB RAM"
    }
  }
];

export const genres = ["Action", "RPG", "Strategy", "Racing", "Puzzle", "MMO", "Sandbox", "Sports", "Horror"];
export const platforms = ["PC", "Console", "Mobile"];
export const regions = ["Global", "Americas", "Europe", "Asia", "Japan"];

export const getGameById = (id: string): Game | undefined => {
  return games.find(game => game.id === id);
};

export const getFeaturedGames = (): Game[] => {
  return games.filter(game => game.isFeatured);
};

export const getNewReleases = (): Game[] => {
  return games.filter(game => game.isNew);
};

export const getPlayableGames = (): Game[] => {
  return games.filter(game => game.isPlayable);
};

export const filterGames = (
  genreFilter?: string,
  platformFilter?: string,
  regionFilter?: string,
  searchQuery?: string
): Game[] => {
  return games.filter(game => {
    if (genreFilter && game.genre !== genreFilter) return false;
    if (platformFilter && !game.platform.includes(platformFilter)) return false;
    if (regionFilter && game.region !== regionFilter) return false;
    if (searchQuery && !game.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });
};
