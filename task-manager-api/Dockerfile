# Node/Express Backend Dockerfile
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package manifests first for optimal Docker layer caching
COPY package*.json ./

# Install production and development dependencies
RUN npm install

# Copy application source code
COPY . .

# Expose backend port
EXPOSE 5000

# Start Express server
CMD ["node", "server.js"]
