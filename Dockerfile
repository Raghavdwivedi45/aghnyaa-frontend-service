# Production image. Local development uses Dockerfile.local (`next dev` + bind mount).
FROM node:24-slim

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

# Choose the env file to bake in, e.g. --build-arg APP_ENV=staging.
# NEXT_PUBLIC_* get compiled into the browser bundle, so changing them needs a rebuild.
# sudo docker build -t aghnyaa-frontend:prod . -> # uses env/.env.production
# sudo docker build --build-arg APP_ENV=staging -t aghnyaa-frontend:staging . -> # once env/.env.staging exists
ARG APP_ENV=production
COPY env/.env.${APP_ENV} .env.production

RUN npm run build

# Set after `npm ci` on purpose: with NODE_ENV=production, npm would skip
# devDependencies and the build would have no next/eslint/react-compiler to run with.
ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start"]
