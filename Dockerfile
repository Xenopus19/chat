FROM node:24-alpine

WORKDIR /usr/src/app

ENV NODE_ENV=production \
    PORT=3001 \
    DATABASE_URL="" \
    CLOUDFLARE_ACCOUNT_ID="" \
    R2_ACCESS_KEY_ID="" \
    R2_SECRET_ACCESS_KEY="" \
    BUCKET_NAME="" \
    JWT_SECRET="" \
    DEBUG=express:*

COPY --chown=node:node package*.json ./

RUN npm ci --include=dev

COPY --chown=node:node . .

RUN npm run build && npm prune --omit=dev && npm cache clean --force

USER node

EXPOSE 3001

CMD ["npm", "start"]