# Stage 1: Build
FROM node:24-alpine AS builder

WORKDIR /usr/src/app

# Copier uniquement les fichiers de dépendances
COPY package*.json ./

# Installer toutes les dépendances (dev incluses pour le build)
RUN npm ci

# Copier le code source
COPY . .

# Builder l'application
RUN npm run build

# Stage 2: Production
FROM nginx:alpine AS production

# Copier le build depuis le stage builder vers le dossier nginx
COPY --from=builder /usr/src/app/build /usr/share/nginx/html

COPY poker.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]