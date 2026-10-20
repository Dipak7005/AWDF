# Multi-stage Dockerfile for React Frontend (Supplementary Problem 2)
# Stage 1: Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Lightweight production runner stage
FROM node:20-alpine AS runner
WORKDIR /app
COPY package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/vite.config.js ./vite.config.js
COPY --from=build /app/node_modules ./node_modules

EXPOSE 5173

# Serve built bundle using Vite preview accessible across Docker bridge network
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
