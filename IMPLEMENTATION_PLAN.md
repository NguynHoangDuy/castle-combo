# Castle Combo - Complete Implementation Plan

## Project Overview
Build an online multiplayer web application for playing Castle Combo, a 3x3 tableau-building card game for 2-5 players.

---

## Phase 1: Project Setup & Infrastructure

### Step 1.1: Initialize Project Structure
- Create root `package.json` with workspaces configuration
- Create folders: `client/`, `server/`, `shared/`
- Install concurrently for running both servers

### Step 1.2: Set Up Shared Types Package
- Create `shared/package.json`
- Create `shared/types/index.ts` with all TypeScript interfaces:
  - Card types (CardType, AbilityType, Card)
  - Player types (Player, RoomPlayer)
  - Game state types (GameState, GamePhase, TurnPhase)
  - Room types (GameRoom, RoomStatus)
  - User types (User, AuthResponse)
  - Socket event types (ServerToClientEvents, ClientToServerEvents)
  - Action types (PlayerAction, ActionResult)

### Step 1.3: Set Up React Frontend (Client)
- Initialize Vite + React + TypeScript project
- Install dependencies:
  - react, react-dom, react-router-dom
  - socket.io-client
  - zustand (state management)
  - axios (API calls)
  - tailwindcss, autoprefixer, postcss
- Configure `vite.config.ts` with proxy settings
- Configure `tailwind.config.js` with custom colors
- Create directory structure:
  ```
  client/src/
  ├── components/
  │   ├── auth/
  │   ├── game/
  │   └── lobby/
  ├── hooks/
  ├── store/
  ├── services/
  ├── types/
  └── assets/
  ```

### Step 1.4: Set Up Node.js Backend (Server)
- Initialize Node.js + Express + TypeScript project
- Install dependencies:
  - express, cors, dotenv
  - socket.io
  - mongoose (MongoDB)
  - jsonwebtoken, bcryptjs
  - uuid
- Configure `tsconfig.json`
- Create directory structure:
  ```
  server/src/
  ├── controllers/
  ├── models/
  ├── middleware/
  ├── game/
  ├── socket/
  └── routes/
  ```
- Create `.env` file with:
  - PORT
  - MONGODB_URI
  - JWT_SECRET

---

## Phase 2: Authentication System

### Step 2.1: Create User Model
- File: `server/src/models/User.ts`
- Schema fields:
  - username (unique, 3-20 chars)
  - email (unique, lowercase)
  - password (hashed with bcrypt)
  - gamesPlayed (default: 0)
  - gamesWon (default: 0)
  - createdAt
- Methods:
  - Pre-save hook for password hashing
  - comparePassword method

### Step 2.2: Create Auth Middleware
- File: `server/src/middleware/auth.ts`
- Functions:
  - `authenticateToken` - Express middleware for protected routes
  - `authenticateSocket` - Socket.io middleware for WebSocket auth
  - `generateToken` - Create JWT token

### Step 2.3: Create Auth Routes
- File: `server/src/routes/auth.ts`
- Endpoints:
  - `POST /api/auth/register` - Create new user
  - `POST /api/auth/login` - Login and get token
  - `GET /api/auth/profile` - Get current user (protected)

### Step 2.4: Create Frontend Auth Store
- File: `client/src/store/authStore.ts`
- Using Zustand with persist middleware
- State: user, token
- Actions: setAuth, logout

### Step 2.5: Create API Service
- File: `client/src/services/api.ts`
- Axios instance with:
  - Base URL configuration
  - Request interceptor for JWT token
  - Response interceptor for 401 handling
- Auth API methods: register, login, getProfile

### Step 2.6: Create Auth Components
- `client/src/components/auth/Login.tsx`
  - Email and password form
  - Error handling
  - Redirect to lobby on success
- `client/src/components/auth/Register.tsx`
  - Username, email, password, confirm password form
  - Validation
  - Redirect to lobby on success

---

## Phase 3: Lobby & Matchmaking

### Step 3.1: Create Socket Service
- File: `client/src/services/socket.ts`
- Functions:
  - `getSocket` - Get or create socket instance
  - `connectSocket` - Connect with auth token
  - `disconnectSocket` - Clean disconnect
- Socket actions object with all emit functions

### Step 3.2: Create Game Store
- File: `client/src/store/gameStore.ts`
- Lobby state: rooms, currentRoom
- Game state: gameState, selectedCard, selectedPosition
- Actions for updating all state

### Step 3.3: Create Lobby Socket Handlers (Server)
- File: `server/src/socket/lobbyHandlers.ts`
- In-memory storage: rooms Map, playerRooms Map
- Event handlers:
  - `get-rooms` - Return available rooms
  - `create-room` - Create new room, join as host
  - `join-room` - Join existing room
  - `leave-room` - Leave current room
  - `toggle-ready` - Toggle ready status
  - `start-game` - Host starts game
- Helper functions:
  - `handlePlayerLeave` - Clean up on disconnect
  - `broadcastRoomList` - Update all clients

### Step 3.4: Create Lobby Component
- File: `client/src/components/lobby/Lobby.tsx`
- Features:
  - Header with user info and logout
  - Room list display
  - Create room modal (name, max players)
  - Join room button
  - Real-time updates via socket

### Step 3.5: Create Game Room Component
- File: `client/src/components/lobby/GameRoom.tsx`
- Features:
  - Room name and player count
  - Player list with ready status
  - Ready/Not Ready toggle button
  - Start Game button (host only)
  - Leave Room button

---

## Phase 4: Game Engine (Core Logic)

### Step 4.1: Define Card Data
- File: `server/src/game/cards.ts`
- Card template interface
- 24+ card definitions across 6 types:
  - **Nobles** (purple): High points, expensive (King, Queen, Prince, Princess)
  - **Merchants** (yellow): Gold-focused (Banker, Trader, Jeweler, Innkeeper)
  - **Craftsmen** (orange): Utility (Blacksmith, Carpenter, Mason, Weaver)
  - **Soldiers** (red): Keys-focused (Knight, Guard, Captain, Archer)
  - **Peasants** (green): Cheap, basic (Farmer, Shepherd, Miller, Fisherman)
  - **Clergy** (blue): Special abilities (Bishop, Monk, Priest, Nun)
- Functions:
  - `generateDeck` - Create shuffled deck with card copies
  - `shuffleDeck` - Fisher-Yates shuffle
  - `drawCards` - Draw N cards from deck

### Step 4.2: Create Game Engine
- File: `server/src/game/GameEngine.ts`
- Constants: STARTING_GOLD (3), STARTING_KEYS (1), MARKET_SIZE (4)
- Functions:
  - `createGameState` - Initialize new game
  - `processAction` - Handle player actions
  - `handleMoveMessenger` - Move messenger to other row (1 key)
  - `handleRefreshRow` - Discard and refill row (1 key)
  - `handleBuyCard` - Purchase card from market
  - `handlePlaceCard` - Place card in tableau
  - `applyCardAbility` - Execute card effect
  - `getAdjacentCards` - Get cards in 4 directions
  - `getDiagonalCards` - Get cards in 4 diagonal directions
  - `endTurn` - Advance to next player
  - `calculateScores` - Final scoring

### Step 4.3: Implement Card Abilities
- `gain_gold` - Add gold to player
- `gain_keys` - Add keys to player
- `bonus_adjacent` - Points per adjacent card
- `bonus_row` - Points per card in same row
- `bonus_column` - Points per card in same column
- `bonus_type_count` - Points per card of specific type
- `bonus_diagonal` - Points per diagonal card

---

## Phase 5: Real-time Game Synchronization

### Step 5.1: Create Game Socket Handlers (Server)
- File: `server/src/socket/gameHandlers.ts`
- Event handler: `player-action`
  - Validate it's player's turn
  - Process action through game engine
  - Check for game over condition
  - Broadcast results to room

### Step 5.2: Socket Events Flow
```
Client                          Server
  |                               |
  |-- player-action ------------->|
  |                               |-- processAction()
  |                               |-- validate turn
  |                               |-- update game state
  |<-- action-result -------------|
  |<-- game-state ----------------|
  |                               |
  (if game over)                  |
  |<-- game-ended ----------------|
```

---

## Phase 6: Game UI Components

### Step 6.1: Create Card Component
- File: `client/src/components/game/Card.tsx`
- Props: card, onClick, disabled, selected, size
- Display: name, type badge, description, cost, points
- Styling: Type-based gradient colors, hover effects

### Step 6.2: Create Card Market Component
- File: `client/src/components/game/CardMarket.tsx`
- Props: market, messengerRow, isMyTurn, turnPhase, onBuyCard
- Display: 2 rows of cards with messenger indicator
- Interaction: Click to buy (only active row)

### Step 6.3: Create Player Tableau Component
- File: `client/src/components/game/PlayerTableau.tsx`
- Props: tableau, isMyTurn, turnPhase, selectedCard, onPlaceCard
- Display: 3x3 grid with cards or empty slots
- Interaction: Click empty slot to place card

### Step 6.4: Create Resource Display Component
- File: `client/src/components/game/ResourceDisplay.tsx`
- Props: gold, keys, score
- Display: Resource counts with icons
- Include quick reference for game rules

### Step 6.5: Create Player List Component
- File: `client/src/components/game/PlayerList.tsx`
- Props: players, currentPlayerIndex, currentUserId
- Display: All players with turn indicator
- Show: Cards placed, score, resources, connection status

### Step 6.6: Create Score Board Component
- File: `client/src/components/game/ScoreBoard.tsx`
- Props: players, onLeave
- Display: Final rankings with scores
- Winner announcement

### Step 6.7: Create Main Game Board Component
- File: `client/src/components/game/GameBoard.tsx`
- Layout:
  - Header with leave button
  - Left sidebar: Player list
  - Center: Turn indicator, Card market, Action buttons, Tableau
  - Right sidebar: Resources
- Socket event listeners for game updates
- Action handlers for all player actions

---

## Phase 7: App Routing & Entry Points

### Step 7.1: Create Main App Component
- File: `client/src/App.tsx`
- Routes:
  - `/login` - Login page
  - `/register` - Register page
  - `/lobby` - Game lobby (protected)
  - `/room/:roomId` - Waiting room (protected)
  - `/game/:roomId` - Game board (protected)
  - `/` - Redirect to lobby
- ProtectedRoute wrapper component

### Step 7.2: Create Server Entry Point
- File: `server/src/index.ts`
- Setup:
  - Express app with CORS and JSON middleware
  - HTTP server
  - Socket.io server with CORS config
  - MongoDB connection
  - Auth routes
  - Socket authentication middleware
  - Socket connection handler

---

## Phase 8: Polish & Testing

### Step 8.1: Visual Improvements
- Card animations on hover/select
- Turn transition animations
- Loading states
- Error toast notifications
- Responsive design for mobile

### Step 8.2: Game Enhancements
- Turn timer (optional)
- Chat system
- Sound effects
- Card artwork integration
- Spectator mode

### Step 8.3: Testing
- Unit tests for game engine logic
- Unit tests for card abilities
- Integration tests for socket events
- E2E tests for game flow

### Step 8.4: Production Preparation
- Environment variable configuration
- Build optimization
- Error logging
- Rate limiting
- Security headers

---

## File Checklist

### Root
- [ ] `package.json`
- [ ] `.gitignore`

### Shared
- [ ] `shared/package.json`
- [ ] `shared/types/index.ts`

### Client
- [ ] `client/package.json`
- [ ] `client/vite.config.ts`
- [ ] `client/tsconfig.json`
- [ ] `client/tsconfig.node.json`
- [ ] `client/tailwind.config.js`
- [ ] `client/postcss.config.js`
- [ ] `client/index.html`
- [ ] `client/src/main.tsx`
- [ ] `client/src/App.tsx`
- [ ] `client/src/index.css`
- [ ] `client/src/store/authStore.ts`
- [ ] `client/src/store/gameStore.ts`
- [ ] `client/src/services/api.ts`
- [ ] `client/src/services/socket.ts`
- [ ] `client/src/components/auth/Login.tsx`
- [ ] `client/src/components/auth/Register.tsx`
- [ ] `client/src/components/lobby/Lobby.tsx`
- [ ] `client/src/components/lobby/GameRoom.tsx`
- [ ] `client/src/components/game/GameBoard.tsx`
- [ ] `client/src/components/game/Card.tsx`
- [ ] `client/src/components/game/CardMarket.tsx`
- [ ] `client/src/components/game/PlayerTableau.tsx`
- [ ] `client/src/components/game/ResourceDisplay.tsx`
- [ ] `client/src/components/game/PlayerList.tsx`
- [ ] `client/src/components/game/ScoreBoard.tsx`

### Server
- [ ] `server/package.json`
- [ ] `server/tsconfig.json`
- [ ] `server/.env`
- [ ] `server/.env.example`
- [ ] `server/src/index.ts`
- [ ] `server/src/models/User.ts`
- [ ] `server/src/middleware/auth.ts`
- [ ] `server/src/routes/auth.ts`
- [ ] `server/src/socket/lobbyHandlers.ts`
- [ ] `server/src/socket/gameHandlers.ts`
- [ ] `server/src/game/cards.ts`
- [ ] `server/src/game/GameEngine.ts`

---

## Technology Stack Summary

| Layer | Technology |
|-------|------------|
| Frontend Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | TailwindCSS |
| State Management | Zustand |
| HTTP Client | Axios |
| Backend Framework | Express.js |
| Real-time | Socket.io |
| Database | MongoDB + Mongoose |
| Authentication | JWT + bcrypt |

---

## Game Rules Reference

1. **Setup**: Each player starts with 3 gold, 1 key
2. **Market**: 2 rows of 4 cards, messenger indicates active row
3. **Turn Actions**:
   - (Optional) Spend 1 key to move messenger to other row
   - (Optional) Spend 1 key to refresh current row
   - Buy 1 card from messenger's row
   - Place card in your 3x3 tableau
4. **Card Abilities**: Trigger when placed
5. **End Game**: When all players complete their 3x3 grid
6. **Scoring**: Base points + ability bonuses
7. **Winner**: Highest score wins

---

## Commands to Run

```bash
# Install all dependencies
npm install

# Run development (both client and server)
npm run dev

# Run only client
npm run dev:client

# Run only server
npm run dev:server

# Build for production
npm run build

# Start production server
npm start
```

---

## Estimated Implementation Order

1. Phase 1 (Setup) - Foundation
2. Phase 2 (Auth) - User system
3. Phase 4 (Game Engine) - Core logic
4. Phase 3 (Lobby) - Room management
5. Phase 5 (Sync) - Real-time communication
6. Phase 6 (UI) - Game interface
7. Phase 7 (Routing) - App structure
8. Phase 8 (Polish) - Final touches
