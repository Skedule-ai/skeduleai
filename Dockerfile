FROM node:20.11.0-alpine As deps
RUN mkdir -p /app
WORKDIR /app
COPY .env.production ./
COPY package*.json ./
RUN npm ci

FROM node:20.11.0-alpine As builder
ENV NODE_ENV production

WORKDIR /app
COPY --from=deps /app/.env.production ./
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package.json ./

COPY ./public ./public
COPY ./prisma ./prisma
COPY ./src ./src
COPY ./*.config.js ./
COPY ./tsconfig.json ./
COPY ./*.config.mjs ./
COPY ./*.config.js ./
COPY ./*.ts ./

RUN npm run prisma:generate && npm run build && npm prune --production

FROM node:20.11.0-alpine As runner
ENV NODE_ENV production
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

COPY --from=builder /app/.env.production ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/postcss.config.mjs ./
COPY --from=builder /app/*.ts ./
COPY --from=builder /app/*.config.mjs ./

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD [ "npm", "start" ]
