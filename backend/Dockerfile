FROM node:22.16-slim AS development
WORKDIR /usr/src/app


RUN apt-get update

RUN apt-get install -y build-essential python3


ENV NPM_CONFIG_MAXSOCKETS=1

# Копируем package.json + lock
COPY package*.json ./

# Ставим все зависимости
RUN npm ci --no-audit --no-fund --no-progress --prefer-offline

# Копируем весь код (для watch)
COPY . .

# Создаём папку для загрузок
RUN mkdir -p uploads

ENV NODE_ENV=development
EXPOSE 3000

CMD ["npm", "run", "start:dev"]
