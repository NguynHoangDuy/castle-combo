# Client Dockerfile - React + Vite Frontend
# This Dockerfile expects to be built from the monorepo root context

FROM node:20-alpine AS base
WORKDIR /app

# Development stage
FROM base AS development

# Copy root package.json for workspaces
COPY package.json package-lock.json* ./

# Copy shared package
COPY shared ./shared

# Copy client package
COPY client ./client

# Install all dependencies from root (handles workspaces)
RUN npm install --workspace=shared --workspace=client

WORKDIR /app/client
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Build stage
FROM base AS build

COPY package.json package-lock.json* ./
COPY shared ./shared
COPY client ./client

RUN npm ci --workspace=shared --workspace=client
RUN npm run build --workspace=shared || true
RUN npm run build --workspace=client

# Production stage
FROM nginx:alpine AS production
COPY --from=build /app/client/dist /usr/share/nginx/html
COPY client/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
