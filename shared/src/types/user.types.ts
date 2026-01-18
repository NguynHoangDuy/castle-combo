/**
 * User stored in database
 */
export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash?: string;  // Not sent to client
  gamesPlayed: number;
  gamesWon: number;
  totalScore: number;
  createdAt: number;
  updatedAt: number;
}

/**
 * User data sent to client (no password)
 */
export interface PublicUser {
  id: string;
  username: string;
  email: string;
  gamesPlayed: number;
  gamesWon: number;
  totalScore: number;
  createdAt: number;
}

/**
 * Auth response after login/register
 */
export interface AuthResponse {
  success: boolean;
  user?: PublicUser;
  token?: string;
  error?: string;
}

/**
 * Login credentials
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Registration data
 */
export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

/**
 * User stats for leaderboard
 */
export interface UserStats {
  id: string;
  username: string;
  gamesPlayed: number;
  gamesWon: number;
  winRate: number;
  totalScore: number;
  averageScore: number;
}

/**
 * Leaderboard entry
 */
export interface LeaderboardEntry {
  rank: number;
  user: UserStats;
}
