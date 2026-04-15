# ---------- Build stage ----------
    FROM node:20-alpine AS build

    WORKDIR /app
    
    # Install pnpm (explicit version for reproducible Docker builds)
    RUN npm i -g pnpm@9
    
    # Copy dependency manifests first to maximize layer cache
    COPY package.json pnpm-lock.yaml ./
    
    # Install deps (reproducible)
    RUN pnpm install --frozen-lockfile
    
    # Copy the rest of the source and build
    COPY . .
    RUN pnpm run build
    
    # ---------- Run stage ----------
    FROM nginx:alpine
    
    # SPA routing + static serving
    COPY nginx.conf /etc/nginx/conf.d/default.conf
    
    # Copy build output
    COPY --from=build /app/dist /usr/share/nginx/html
    
    EXPOSE 80
    
    HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1
    
    