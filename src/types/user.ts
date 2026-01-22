export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    maxProgress?: number;
    progress?: number;
    unlockedAt?: string;
}

export interface UserStats {
    gamesPlayed: number;
    favoritesCount: number;
    reviewsCount: number;
    achievementsCount: number;
}

export interface UserProfile {
    id: string;
    username: string;
    avatar: string;
    createdAt: string;
    stats: UserStats;
    achievements: Achievement[];
}

export interface GameReview {
    id: string;
    gameId: string;
    userId: string;
    username: string;
    rating: number;
    comment: string;
    createdAt: string;
    helpful: number;
}
