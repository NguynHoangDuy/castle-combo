/**
 * Castle Combo - Shared Types
 *
 * This package contains all TypeScript type definitions shared between
 * the client and server packages.
 */

// Card types
export type {
  ShieldColor,
  CardType,
  CastleCategory,
  VillageCategory,
  CardCategory,
  ShieldColorInfo,
  Card,
  CardAbility,
  CardScoring,
} from './types/card.types.js';

// Ability types
export type {
  AbilityType,
  AbilityParams,
  ActiveDiscount,
} from './types/ability.types.js';

// Scoring types
export type {
  ScoringType,
  ScoringParams,
} from './types/scoring.types.js';

// Game types
export type {
  GamePhase,
  TurnPhase,
  Position,
  Market,
  GameState,
  GameConfig,
} from './types/game.types.js';

export {
  DEFAULT_GAME_CONFIG,
  CORNER_POSITIONS,
  EDGE_POSITIONS,
  CENTER_POSITION,
  ALL_POSITIONS,
} from './types/game.types.js';

// Player types
export type {
  Tableau,
  PlayerState,
  RoomPlayer,
  PublicPlayerInfo,
  ScoreBreakdown,
  CardScore,
} from './types/player.types.js';

export { createEmptyTableau } from './types/player.types.js';

// Room types
export type {
  RoomStatus,
  GameRoom,
  CreateRoomOptions,
  RoomListItem,
  RoomJoinResult,
} from './types/room.types.js';

export { DEFAULT_ROOM_CONFIG } from './types/room.types.js';

// User types
export type {
  User,
  PublicUser,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  UserStats,
  LeaderboardEntry,
} from './types/user.types.js';

// Socket types
export type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from './types/socket.types.js';

// Action types
export type {
  ActionType,
  PlayerAction,
  MoveMessengerAction,
  RefreshRowAction,
  BuyCardAction,
  PlaceCardAction,
  EndOptionalAction,
  ActionResult,
  ActionDetails,
  ActionValidation,
} from './types/action.types.js';
