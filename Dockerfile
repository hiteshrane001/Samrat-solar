# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve Backend & Frontend
FROM node:18-alpine
WORKDIR /app

# Copy server files
COPY server/package*.json ./server/
RUN cd server && npm install --production

COPY server/ ./server/

# Copy built frontend from Stage 1 to server's public or serve path
# Note: we need to configure Express to serve these files
COPY --from=frontend-build /app/dist ./server/public

ENV NODE_ENV=production
ENV PORT=5000

EXPOSE 5000
CMD ["node", "server/index.js"]
