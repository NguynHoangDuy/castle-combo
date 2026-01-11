# Castle Combo - Complete Game Development Plan

---

# PART 1: GAME INFORMATION

---

## 1.1 Game Overview

| Attribute | Details |
|-----------|---------|
| **Name** | Castle Combo |
| **Type** | Tableau-building card game |
| **Players** | 2-5 players |
| **Play Time** | 15-30 minutes |
| **Age** | 10+ |
| **Designer** | Grégory Grard & Mathieu Roussel |
| **Publisher** | Catch Up Games / Pandasaurus Games |

## 1.2 Game Theme

Players are medieval lords building their castle by recruiting villagers and castle dwellers. Each character brings unique abilities that create powerful combinations (combos) when placed strategically in the castle grid.

## 1.3 Game Components

### Physical Game Contains:
| Component | Quantity | Description |
|-----------|----------|-------------|
| Character Cards | 78 | Unique villagers with abilities |
| Gold Tokens | ~50 | Currency for buying cards |
| Key Tokens | ~30 | Special currency for actions |
| Messenger Meeple | 1 | Indicates active market row |
| Player Boards | 5 | 3x3 grid for tableau (optional) |

### Digital Version Needs:
- Card database with all 78 characters
- Virtual gold/key tracking
- Visual 3x3 tableau grid
- Card market display (2 rows)
- Messenger indicator
- Score calculator

## 1.4 Game Setup

```
┌─────────────────────────────────────────────┐
│                 CARD MARKET                  │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐               │
│  │Card│ │Card│ │Card│ │Card│  ← Row 1      │
│  └────┘ └────┘ └────┘ └────┘               │
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐               │
│  │Card│ │Card│ │Card│ │Card│  ← Row 2      │
│  └────┘ └────┘ └────┘ └────┘               │
│            ▲                                 │
│         Messenger                            │
└─────────────────────────────────────────────┘

Each Player Starts With:
├── 3 Gold
├── 1 Key
└── Empty 3x3 Tableau Grid
```

## 1.5 Card Anatomy

```
┌────────────────────┐
│ [Card Name]        │  ← Name
├────────────────────┤
│                    │
│   [Character       │  ← Artwork
│    Artwork]        │
│                    │
├────────────────────┤
│ Type: Noble        │  ← Card Type (6 types)
├────────────────────┤
│ Ability:           │
│ +2 pts per         │  ← Special Ability
│ adjacent card      │
├────────────────────┤
│ Cost: 3G 0K        │  ← Gold & Key Cost
├────────────────────┤
│ Points: ★★★        │  ← Base Victory Points
└────────────────────┘
```

## 1.6 Card Types (6 Categories)

| Type | Color | Theme | Typical Abilities |
|------|-------|-------|-------------------|
| **Noble** | Purple | Royalty | High points, type bonuses |
| **Merchant** | Yellow | Trade | Gold generation, row bonuses |
| **Craftsman** | Orange | Workers | Keys, column bonuses |
| **Soldier** | Red | Military | Diagonal bonuses, keys |
| **Peasant** | Green | Common folk | Cheap, small bonuses |
| **Clergy** | Blue | Religious | Special abilities |

## 1.7 Turn Structure

```
YOUR TURN
    │
    ▼
┌─────────────────────────────────────┐
│ PHASE 1: OPTIONAL ACTIONS           │
│                                     │
│ You may spend Keys to:              │
│ • Move Messenger (1 Key)            │
│   → Switches active row             │
│ • Refresh Row (1 Key)               │
│   → Discard row, draw new cards     │
│                                     │
│ (Can do multiple times if you       │
│  have enough keys)                  │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│ PHASE 2: BUY CARD (MANDATORY)       │
│                                     │
│ • Must buy 1 card from active row   │
│ • Pay the gold/key cost             │
│ • Card is removed from market       │
│ • Market refills from deck          │
└─────────────────────────────────────┘
    │
    ▼
┌─────────────────────────────────────┐
│ PHASE 3: PLACE CARD (MANDATORY)     │
│                                     │
│ • Place card in empty tableau slot  │
│ • Trigger card's ability            │
│ • Ability resolves immediately      │
└─────────────────────────────────────┘
    │
    ▼
  END TURN → Next Player
```

## 1.8 Tableau Grid & Positioning

```
Player's Castle (3x3 Grid):

     Col 0   Col 1   Col 2
    ┌───────┬───────┬───────┐
Row │       │       │       │
 0  │ (0,0) │ (0,1) │ (0,2) │
    ├───────┼───────┼───────┤
Row │       │       │       │
 1  │ (1,0) │ (1,1) │ (1,2) │  ← CENTER position
    ├───────┼───────┼───────┤
Row │       │       │       │
 2  │ (2,0) │ (2,1) │ (2,2) │
    └───────┴───────┴───────┘

Position Relationships:
• Adjacent: Up, Down, Left, Right (4 directions)
• Diagonal: 4 corner directions
• Row: Same horizontal line
• Column: Same vertical line
```

## 1.9 Ability Types

### Immediate Abilities (When Placed):
| Ability | Effect | Example |
|---------|--------|---------|
| Gain Gold | Add gold to your supply | "+3 Gold" |
| Gain Keys | Add keys to your supply | "+2 Keys" |
| Refresh Market | Discard and redraw market row | "Refresh active row" |

### Scoring Abilities (End Game):
| Ability | Effect | Example |
|---------|--------|---------|
| Adjacent Bonus | Points per adjacent card | "+2 pts per adjacent" |
| Row Bonus | Points per card in same row | "+1 pt per card in row" |
| Column Bonus | Points per card in same column | "+1 pt per card in column" |
| Type Bonus | Points per card of specific type | "+3 pts per Noble" |
| Diagonal Bonus | Points per diagonal card | "+2 pts per diagonal" |
| Set Bonus | Points for having card combinations | "+5 pts if you have 3+ Soldiers" |

## 1.10 Game End & Scoring

```
GAME END TRIGGER:
└── All players have filled their 3x3 grid (9 cards each)

SCORING CALCULATION:
┌────────────────────────────────────┐
│ For each card in your tableau:     │
│                                    │
│   Base Points                      │
│   + Ability Bonus (if applicable)  │
│   ─────────────────                │
│   = Card Total                     │
│                                    │
│ Sum all cards = FINAL SCORE        │
└────────────────────────────────────┘

WINNER:
└── Player with highest score wins!
└── Tie-breaker: Most remaining gold + keys
```

## 1.11 Strategy Tips

1. **Plan Your Grid**: Think about where cards will go before buying
2. **Combo Building**: Look for cards that synergize (e.g., multiple Nobles + King)
3. **Resource Management**: Balance spending gold vs. saving for expensive cards
4. **Key Usage**: Keys are powerful - use them wisely to access better cards
5. **Watch Opponents**: Deny cards they need if possible
6. **Position Matters**: Center position (1,1) has most adjacencies

---

# PART 2: TECHNICAL STACK & JUSTIFICATION

---

## 2.1 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                         ARCHITECTURE                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│   ┌──────────────┐         ┌──────────────┐                     │
│   │   Browser    │         │   Browser    │                     │
│   │  (Player 1)  │         │  (Player 2)  │   ...more players   │
│   └──────┬───────┘         └──────┬───────┘                     │
│          │                        │                              │
│          │ HTTP/WebSocket         │ HTTP/WebSocket              │
│          │                        │                              │
│          ▼                        ▼                              │
│   ┌─────────────────────────────────────────┐                   │
│   │            Node.js Server               │                   │
│   │  ┌─────────────┐  ┌─────────────────┐  │                   │
│   │  │  Express    │  │    Socket.io    │  │                   │
│   │  │  (REST API) │  │  (Real-time)    │  │                   │
│   │  └─────────────┘  └─────────────────┘  │                   │
│   │  ┌─────────────────────────────────┐   │                   │
│   │  │        Game Engine              │   │                   │
│   │  │  (Rules, State, Validation)     │   │                   │
│   │  └─────────────────────────────────┘   │                   │
│   └──────────────────┬──────────────────────┘                   │
│                      │                                           │
│                      ▼                                           │
│   ┌─────────────────────────────────────────┐                   │
│   │              MongoDB                     │                   │
│   │  (Users, Game History, Stats)           │                   │
│   └─────────────────────────────────────────┘                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## 2.2 Frontend Technologies

### React 18
| Aspect | Details |
|--------|---------|
| **What** | JavaScript library for building user interfaces |
| **Why Use** | - Component-based architecture perfect for card games<br>- Virtual DOM for efficient UI updates<br>- Huge ecosystem and community<br>- Easy state management for game UI<br>- Reusable components (Card, Button, etc.) |
| **Alternative** | Vue.js, Svelte, Angular |
| **Why Not Alternative** | React has larger community, more tutorials, better for complex UIs |

### TypeScript
| Aspect | Details |
|--------|---------|
| **What** | Typed superset of JavaScript |
| **Why Use** | - Catch errors at compile time<br>- Better IDE support (autocomplete)<br>- Self-documenting code<br>- Essential for complex game state<br>- Shared types between client/server |
| **Alternative** | Plain JavaScript |
| **Why Not Alternative** | Game logic is complex, types prevent bugs |

### Vite
| Aspect | Details |
|--------|---------|
| **What** | Modern build tool and dev server |
| **Why Use** | - Extremely fast hot reload<br>- Native ES modules<br>- Simple configuration<br>- Better than Create React App<br>- Built-in TypeScript support |
| **Alternative** | Webpack, Create React App |
| **Why Not Alternative** | Vite is faster and simpler to configure |

### TailwindCSS
| Aspect | Details |
|--------|---------|
| **What** | Utility-first CSS framework |
| **Why Use** | - Rapid UI development<br>- No context switching to CSS files<br>- Consistent design system<br>- Small production bundle (tree-shaking)<br>- Easy responsive design |
| **Alternative** | CSS Modules, Styled-components, SCSS |
| **Why Not Alternative** | Tailwind is faster for prototyping game UIs |

### Zustand
| Aspect | Details |
|--------|---------|
| **What** | Lightweight state management library |
| **Why Use** | - Simple API, minimal boilerplate<br>- No providers needed<br>- Built-in persistence<br>- Perfect for game state<br>- TypeScript friendly |
| **Alternative** | Redux, MobX, Jotai, Context API |
| **Why Not Alternative** | Redux is overkill, Context causes re-renders |

### Socket.io-client
| Aspect | Details |
|--------|---------|
| **What** | Real-time bidirectional communication |
| **Why Use** | - Automatic reconnection<br>- Fallback to polling<br>- Room support built-in<br>- Event-based communication<br>- Matches server Socket.io |
| **Alternative** | Native WebSocket, Pusher |
| **Why Not Alternative** | Socket.io handles edge cases automatically |

### Axios
| Aspect | Details |
|--------|---------|
| **What** | HTTP client library |
| **Why Use** | - Promise-based<br>- Request/response interceptors<br>- Automatic JSON transformation<br>- Better error handling<br>- Works in browser and Node |
| **Alternative** | Fetch API, ky |
| **Why Not Alternative** | Axios has better interceptor support for auth |

## 2.3 Backend Technologies

### Node.js
| Aspect | Details |
|--------|---------|
| **What** | JavaScript runtime for server |
| **Why Use** | - Same language as frontend (JavaScript)<br>- Non-blocking I/O (good for real-time)<br>- NPM ecosystem<br>- Easy WebSocket handling<br>- Share code between client/server |
| **Alternative** | Python, Go, Java |
| **Why Not Alternative** | Node.js best for real-time web games |

### Express.js
| Aspect | Details |
|--------|---------|
| **What** | Minimal web framework for Node.js |
| **Why Use** | - Simple and flexible<br>- Huge middleware ecosystem<br>- Easy routing<br>- Industry standard<br>- Well documented |
| **Alternative** | Fastify, Koa, NestJS |
| **Why Not Alternative** | Express is simpler, more resources available |

### Socket.io
| Aspect | Details |
|--------|---------|
| **What** | Real-time communication library |
| **Why Use** | - Rooms for game sessions<br>- Broadcast to all players<br>- Automatic reconnection handling<br>- Works with Express<br>- Binary data support |
| **Alternative** | ws, µWebSockets |
| **Why Not Alternative** | Socket.io has rooms and fallbacks built-in |

### MongoDB + Mongoose
| Aspect | Details |
|--------|---------|
| **What** | NoSQL database + ODM |
| **Why Use** | - Flexible schema (good for game data)<br>- JSON-like documents<br>- Easy to scale<br>- Good for user profiles<br>- Mongoose provides validation |
| **Alternative** | PostgreSQL, Redis, Firebase |
| **Why Not Alternative** | MongoDB is simpler for game state storage |

### JWT (jsonwebtoken)
| Aspect | Details |
|--------|---------|
| **What** | JSON Web Tokens for authentication |
| **Why Use** | - Stateless authentication<br>- Works with WebSockets<br>- Can include user data<br>- No session storage needed<br>- Industry standard |
| **Alternative** | Sessions, OAuth |
| **Why Not Alternative** | JWT works better with Socket.io |

### bcrypt
| Aspect | Details |
|--------|---------|
| **What** | Password hashing library |
| **Why Use** | - Secure password storage<br>- Salt included<br>- Configurable rounds<br>- Industry standard<br>- Async support |
| **Alternative** | Argon2, scrypt |
| **Why Not Alternative** | bcrypt is proven and widely used |

## 2.4 Why This Stack? Summary

```
┌─────────────────────────────────────────────────────────────┐
│                    STACK DECISION MATRIX                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  REQUIREMENT              →  TECHNOLOGY CHOICE               │
│  ─────────────────────────────────────────────              │
│  Real-time multiplayer    →  Socket.io (rooms, events)      │
│  Complex game UI          →  React (components, state)      │
│  Type safety              →  TypeScript (shared types)      │
│  Fast development         →  Vite + Tailwind                │
│  User authentication      →  JWT + bcrypt                   │
│  Data persistence         →  MongoDB (flexible schema)      │
│  Simple state management  →  Zustand (minimal boilerplate)  │
│  Code sharing             →  Node.js (same language)        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## 2.5 Data Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                        DATA FLOW                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  1. AUTHENTICATION FLOW                                          │
│  ──────────────────────                                         │
│  Client                    Server                   Database    │
│    │                         │                         │        │
│    │── POST /login ─────────>│                         │        │
│    │                         │── Find user ───────────>│        │
│    │                         │<── User data ───────────│        │
│    │                         │── Compare password      │        │
│    │                         │── Generate JWT          │        │
│    │<── { token, user } ─────│                         │        │
│    │                         │                         │        │
│    │── Store token locally   │                         │        │
│                                                                  │
│  2. SOCKET CONNECTION FLOW                                       │
│  ─────────────────────────                                      │
│  Client                    Server                               │
│    │                         │                                  │
│    │── Connect + JWT ───────>│                                  │
│    │                         │── Verify JWT                     │
│    │                         │── Attach user to socket          │
│    │<── Connection OK ───────│                                  │
│                                                                  │
│  3. GAME ACTION FLOW                                             │
│  ───────────────────                                            │
│  Client                    Server                  All Clients  │
│    │                         │                         │        │
│    │── player-action ───────>│                         │        │
│    │                         │── Validate turn         │        │
│    │                         │── Process action        │        │
│    │                         │── Update game state     │        │
│    │                         │── game-state ──────────>│        │
│    │<── action-result ───────│                         │        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

# PART 3: STEP-BY-STEP BUILD GUIDE

---

## Step 1: Initialize Project

### 1.1 Create Project Folder
```bash
mkdir castle-combo
cd castle-combo
```

### 1.2 Create Root package.json
```json
{
  "name": "castle-combo",
  "private": true,
  "workspaces": ["client", "server", "shared"],
  "scripts": {
    "dev": "concurrently \"npm run dev:server\" \"npm run dev:client\"",
    "dev:client": "npm run dev --workspace=client",
    "dev:server": "npm run dev --workspace=server"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "typescript": "^5.3.3"
  }
}
```

### 1.3 Create Folder Structure
```
castle-combo/
├── client/
├── server/
├── shared/
└── package.json
```

---

## Step 2: Create Shared Types

### 2.1 shared/package.json
```json
{
  "name": "@castle-combo/shared",
  "version": "1.0.0",
  "main": "types/index.ts"
}
```

### 2.2 shared/types/index.ts
Define all TypeScript interfaces:
- Card, CardType, AbilityType
- Player, RoomPlayer
- GameState, GamePhase, TurnPhase
- GameRoom, RoomStatus
- User, AuthResponse
- Socket event types
- Action types

---

## Step 3: Setup Client (React)

### 3.1 Create Client Package
```bash
cd client
npm init -y
```

### 3.2 Install Dependencies
```bash
# Core
npm install react react-dom react-router-dom

# State & API
npm install zustand axios socket.io-client

# Dev dependencies
npm install -D vite @vitejs/plugin-react typescript
npm install -D tailwindcss postcss autoprefixer
npm install -D @types/react @types/react-dom
```

### 3.3 Configure Files
- `vite.config.ts` - Proxy settings for API
- `tsconfig.json` - TypeScript configuration
- `tailwind.config.js` - Custom colors
- `postcss.config.js` - PostCSS plugins

### 3.4 Create Source Structure
```
client/src/
├── components/
│   ├── auth/
│   ├── game/
│   └── lobby/
├── store/
├── services/
├── hooks/
├── main.tsx
├── App.tsx
└── index.css
```

---

## Step 4: Setup Server (Node.js)

### 4.1 Create Server Package
```bash
cd server
npm init -y
```

### 4.2 Install Dependencies
```bash
# Core
npm install express cors dotenv

# Real-time
npm install socket.io

# Database
npm install mongoose

# Auth
npm install jsonwebtoken bcryptjs

# Utilities
npm install uuid

# Dev dependencies
npm install -D typescript tsx @types/node
npm install -D @types/express @types/cors
npm install -D @types/jsonwebtoken @types/bcryptjs @types/uuid
```

### 4.3 Configure Files
- `tsconfig.json` - TypeScript configuration
- `.env` - Environment variables

### 4.4 Create Source Structure
```
server/src/
├── models/
├── middleware/
├── routes/
├── socket/
├── game/
└── index.ts
```

---

## Step 5: Build Authentication System

### 5.1 Create User Model (Server)
**File: `server/src/models/User.ts`**
- Define schema with username, email, password
- Add password hashing pre-save hook
- Add comparePassword method

### 5.2 Create Auth Middleware (Server)
**File: `server/src/middleware/auth.ts`**
- `authenticateToken` for Express routes
- `authenticateSocket` for Socket.io
- `generateToken` function

### 5.3 Create Auth Routes (Server)
**File: `server/src/routes/auth.ts`**
- POST `/register` - Create user
- POST `/login` - Login user
- GET `/profile` - Get current user

### 5.4 Create Auth Store (Client)
**File: `client/src/store/authStore.ts`**
- Store user and token
- Persist to localStorage
- logout function

### 5.5 Create API Service (Client)
**File: `client/src/services/api.ts`**
- Axios instance with interceptors
- Auth API methods

### 5.6 Create Auth Components (Client)
- `Login.tsx` - Login form
- `Register.tsx` - Registration form

---

## Step 6: Build Game Engine

### 6.1 Define Cards (Server)
**File: `server/src/game/cards.ts`**

Create card templates for all 6 types:
```typescript
const cardTemplates = [
  // Nobles
  { name: "King", type: "noble", cost: {gold: 5, keys: 0}, ... },
  { name: "Queen", type: "noble", cost: {gold: 4, keys: 0}, ... },

  // Merchants
  { name: "Banker", type: "merchant", cost: {gold: 2, keys: 0}, ... },

  // ... more cards
];
```

Functions:
- `generateDeck()` - Create shuffled deck
- `shuffleDeck()` - Shuffle array
- `drawCards()` - Draw N cards

### 6.2 Create Game Engine (Server)
**File: `server/src/game/GameEngine.ts`**

Functions:
```typescript
// Initialize new game
createGameState(roomId, players) → GameState

// Process player actions
processAction(gameState, action, odId) → ActionResult

// Action handlers
handleMoveMessenger(gameState, player) → ActionResult
handleRefreshRow(gameState, player) → ActionResult
handleBuyCard(gameState, player, cardId) → ActionResult
handlePlaceCard(gameState, player, cardId, position) → ActionResult

// Ability system
applyCardAbility(gameState, player, card, row, col) → void

// Helpers
getAdjacentCards(tableau, row, col) → Card[]
getDiagonalCards(tableau, row, col) → Card[]

// Turn management
endTurn(gameState) → void

// Scoring
calculateScores(gameState) → void
```

---

## Step 7: Build Lobby System

### 7.1 Create Socket Service (Client)
**File: `client/src/services/socket.ts`**
- Socket connection management
- Action emitters

### 7.2 Create Game Store (Client)
**File: `client/src/store/gameStore.ts`**
- Rooms list
- Current room
- Game state
- Selected card

### 7.3 Create Lobby Handlers (Server)
**File: `server/src/socket/lobbyHandlers.ts`**

Events:
```typescript
socket.on('get-rooms', () => { ... })
socket.on('create-room', (name, maxPlayers) => { ... })
socket.on('join-room', (roomId) => { ... })
socket.on('leave-room', () => { ... })
socket.on('toggle-ready', () => { ... })
socket.on('start-game', () => { ... })
```

### 7.4 Create Lobby Components (Client)
- `Lobby.tsx` - Room list, create room
- `GameRoom.tsx` - Waiting room, ready status

---

## Step 8: Build Game Synchronization

### 8.1 Create Game Handlers (Server)
**File: `server/src/socket/gameHandlers.ts`**

Events:
```typescript
socket.on('player-action', (action) => {
  // Validate turn
  // Process action
  // Broadcast result
  // Check game over
})
```

### 8.2 Event Broadcasting
```typescript
// To single player
socket.emit('action-result', result)

// To all players in room
io.to(roomId).emit('game-state', gameState)

// When game ends
io.to(roomId).emit('game-ended', result)
```

---

## Step 9: Build Game UI Components

### 9.1 Card Component
**File: `client/src/components/game/Card.tsx`**
- Display card info (name, type, cost, points)
- Type-based colors
- Hover and select states
- Size variants (small, medium, large)

### 9.2 Card Market Component
**File: `client/src/components/game/CardMarket.tsx`**
- 2 rows of cards
- Messenger indicator
- Click to buy functionality

### 9.3 Player Tableau Component
**File: `client/src/components/game/PlayerTableau.tsx`**
- 3x3 grid display
- Empty slot indicators
- Click to place functionality

### 9.4 Resource Display Component
**File: `client/src/components/game/ResourceDisplay.tsx`**
- Gold count
- Keys count
- Current score

### 9.5 Player List Component
**File: `client/src/components/game/PlayerList.tsx`**
- All players in game
- Current turn indicator
- Resources and score for each

### 9.6 Score Board Component
**File: `client/src/components/game/ScoreBoard.tsx`**
- Final rankings
- Score breakdown
- Return to lobby button

### 9.7 Game Board Component
**File: `client/src/components/game/GameBoard.tsx`**
- Main game layout
- Combines all components
- Action buttons
- Socket event listeners

---

## Step 10: Create App Entry Points

### 10.1 Client Entry (Client)
**File: `client/src/main.tsx`**
```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
```

### 10.2 App Router (Client)
**File: `client/src/App.tsx`**
```tsx
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/lobby" element={<ProtectedRoute><Lobby /></ProtectedRoute>} />
  <Route path="/room/:roomId" element={<ProtectedRoute><GameRoom /></ProtectedRoute>} />
  <Route path="/game/:roomId" element={<ProtectedRoute><GameBoard /></ProtectedRoute>} />
</Routes>
```

### 10.3 Server Entry (Server)
**File: `server/src/index.ts`**
```typescript
// Setup Express
const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)

// Setup Socket.io
const io = new Server(httpServer, { cors: {...} })
io.use(authenticateSocket)
io.on('connection', (socket) => {
  setupLobbyHandlers(io, socket)
  setupGameHandlers(io, socket)
})

// Connect MongoDB and start server
mongoose.connect(MONGODB_URI).then(() => {
  httpServer.listen(PORT)
})
```

---

## Step 11: Testing & Verification

### 11.1 Test Authentication
1. Register new user
2. Login with credentials
3. Verify JWT token works
4. Test protected routes

### 11.2 Test Lobby
1. Create a room
2. Join from second browser
3. Toggle ready status
4. Start game as host

### 11.3 Test Gameplay
1. Verify initial state (3 gold, 1 key)
2. Buy a card from market
3. Place card in tableau
4. Verify ability triggers
5. Complete full game
6. Check final scoring

### 11.4 Test Edge Cases
- Player disconnection
- Reconnection during game
- Invalid actions
- Insufficient resources

---

## Step 12: Production Preparation

### 12.1 Environment Variables
```env
# Production .env
NODE_ENV=production
PORT=3001
MONGODB_URI=mongodb+srv://...
JWT_SECRET=strong-random-secret
CLIENT_URL=https://yourdomain.com
```

### 12.2 Build Commands
```bash
# Build client
cd client && npm run build

# Build server
cd server && npm run build
```

### 12.3 Deployment Options
- **Frontend**: Vercel, Netlify, AWS S3
- **Backend**: Railway, Render, AWS EC2
- **Database**: MongoDB Atlas

---

## Summary Checklist

### Phase 1: Setup
- [ ] Create project structure
- [ ] Initialize packages
- [ ] Configure TypeScript
- [ ] Setup Tailwind

### Phase 2: Shared Types
- [ ] Define all interfaces
- [ ] Export types

### Phase 3: Authentication
- [ ] User model
- [ ] Auth middleware
- [ ] Auth routes
- [ ] Auth store
- [ ] Login/Register UI

### Phase 4: Game Engine
- [ ] Card definitions
- [ ] Game state management
- [ ] Action processing
- [ ] Ability system
- [ ] Scoring

### Phase 5: Lobby
- [ ] Socket service
- [ ] Room management
- [ ] Lobby UI
- [ ] Waiting room UI

### Phase 6: Game Sync
- [ ] Game socket handlers
- [ ] State broadcasting
- [ ] Turn validation

### Phase 7: Game UI
- [ ] Card component
- [ ] Market component
- [ ] Tableau component
- [ ] Resource display
- [ ] Player list
- [ ] Scoreboard
- [ ] Main game board

### Phase 8: Integration
- [ ] App routing
- [ ] Server entry
- [ ] Error handling

### Phase 9: Testing
- [ ] Auth tests
- [ ] Game logic tests
- [ ] Integration tests

### Phase 10: Deploy
- [ ] Production build
- [ ] Environment config
- [ ] Deploy services

---

## Estimated Development Time

| Phase | Estimated Time |
|-------|---------------|
| Setup & Config | 2-4 hours |
| Shared Types | 1-2 hours |
| Authentication | 4-6 hours |
| Game Engine | 8-12 hours |
| Lobby System | 4-6 hours |
| Game Sync | 4-6 hours |
| Game UI | 8-12 hours |
| Integration | 2-4 hours |
| Testing | 4-8 hours |
| Polish & Deploy | 4-8 hours |
| **Total** | **40-70 hours** |

---

*This plan provides a complete roadmap for building Castle Combo as an online multiplayer game.*
