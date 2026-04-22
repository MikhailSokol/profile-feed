FROM node:22.16-slim AS development

WORKDIR /app

# system deps
RUN apt-get update && apt-get install -y \
  curl \
  && rm -rf /var/lib/apt/lists/*


ENV NPM_CONFIG_MAXSOCKETS=1

COPY package*.json ./
RUN npm ci --no-audit --no-fund --no-progress

COPY . .

CMD ["npm", "run", "dev"]