# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Castle Combo is a 2-5 player online multiplayer tableau-building card game. Players construct a 3x3 grid of cards with unique abilities and scoring mechanics.

## Commands

### Development
```bash
npm run dev                 # Run client (5173) and server (3000) concurrently
npm run dev:client          # React dev server only
npm run dev:server          # Node.js dev server only
```

### Build & Test
```bash
npm run build               # Build all packages
npm run test                # Run tests across all packages
npm run lint                # Lint all packages
npm run clean               # Remove node_modules and dist folders
```

### Docker
```bash
docker-compose up --build   # Build and start all services
docker-compose up -d        # Start in background
docker-compose down -v      # Stop and reset database
docker-compose logs -f server  # View server logs
```

## Architecture

### Monorepo Structure (npm workspaces)
- **shared/** - TypeScript type definitions used by both client and server
- **server/** - Express + Socket.io backend (port 3000)
- **client/** - React 18 + Vite frontend (port 5173)

### Key Technologies
- Real-time: Socket.io for multiplayer synchronization
- State: Zustand (client), in-memory managers (server)
- Database: MongoDB (users only; game state is in-memory)
- Auth: JWT + bcryptjs

### Server Architecture (`server/src/`)
- `game/GameEngine.ts` - Core game logic, turn processing, action validation
- `game/cards.ts` - Card database, deck generation (separate village/castle decks)
- `game/abilities/` - Resource, discount, special abilities
- `game/scoring/` - Grid, type, set, conditional scoring systems
- `socket/handlers/` - lobbyHandlers, roomHandlers, gameHandlers
- `socket/managers/` - RoomManager, GameManager (in-memory state)

### Client Architecture (`client/src/`)
- `stores/` - Zustand stores with persistence (authStore, gameStore, lobbyStore)
- `services/socket.ts` - Socket.io client with reconnection logic
- `components/game/` - GameBoard, Card, CardMarket, PlayerTableau

### Shared Types (`shared/src/types/`)
All type definitions that must stay synchronized between client and server.

## Game Mechanics

### Market System
- Row 1: Village cards only
- Row 2: Castle cards only
- Messenger indicates active purchasing row

### Turn Structure
1. **Optional Actions** - Spend keys to move messenger or refresh row
2. **Buy Card** - Purchase from active market row
3. **Place Card** - Place in 3x3 tableau, triggers ability

### Card Data
Cards defined in `cards.json` at project root. Each card has:
- `shields` - Color array for scoring
- `ability` - Triggers on placement
- `scoring` - End-game point calculation

## Environment Variables

Required in `.env` or docker-compose:
```
MONGODB_URI, JWT_SECRET, CLIENT_URL
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

## Important Patterns

- Socket events defined in `shared/src/types/socket.types.ts` - keep client/server in sync
- Game state changes broadcast to all players in room via `io.to(roomId).emit()`
- Stores use zustand persist middleware for page reload recovery
- Docker builds from root context to access shared package
