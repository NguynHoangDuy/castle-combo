# Server Dockerfile - Node.js + Express Backend
# This Dockerfile expects to be built from the monorepo root context

FROM node:20-alpine AS base
WORKDIR /app

# Development stage
FROM base AS development

# Copy root package.json for workspaces
COPY package.json package-lock.json* ./

# Copy shared package
COPY shared ./shared

# Copy server package
COPY server ./server

# Copy cards data
COPY cards.json ./cards.json

# Install all dependencies from root (handles workspaces)
RUN npm install --workspace=shared --workspace=server

WORKDIR /app/server
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Build stage
FROM base AS build

COPY package.json package-lock.json* ./
COPY shared ./shared
COPY server ./server

RUN npm ci --workspace=shared --workspace=server
RUN npm run build --workspace=shared || true
RUN npm run build --workspace=server

# Production stage
FROM base AS production

COPY package.json package-lock.json* ./
COPY shared/package.json ./shared/
COPY server/package.json ./server/

RUN npm ci --workspace=shared --workspace=server --only=production

COPY --from=build /app/shared/dist ./shared/dist
COPY --from=build /app/server/dist ./server/dist

WORKDIR /app/server
EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "dist/index.js"]
