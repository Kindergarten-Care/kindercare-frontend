# Sử dụng Alpine để tối ưu dung lượng
FROM node:20-alpine AS base

# Giai đoạn 1: Prune dự án bằng turbo
FROM base AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo
COPY . .
ARG APP_NAME
RUN turbo prune @kindercare/${APP_NAME} --docker

# Giai đoạn 2: Cài đặt dependencies
FROM base AS installer
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Copy files từ giai đoạn prune
COPY .gitignore .gitignore
COPY --from=pruner /app/out/json/ .
COPY --from=pruner /app/out/yarn.lock ./yarn.lock
RUN yarn install --network-timeout 100000

# Giai đoạn 3: Build dự án
FROM base AS builder
WORKDIR /app
COPY --from=installer /app/ .
COPY --from=pruner /app/out/full/ .
COPY turbo.json turbo.json
ARG APP_NAME
# Next.js build
RUN yarn turbo build --filter=@kindercare/${APP_NAME}

# Giai đoạn 4: Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ARG APP_NAME
ENV APP_NAME=${APP_NAME}

# [BẮT BUỘC THÊM]: Giúp Next.js bind đúng IP mạng bên trong container
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone ./
# Copy static assets — cần CẢ HAI đường dẫn:
#   1. Đường dẫn gốc /app/.next/static → Next.js server tìm file tĩnh ở đây
#   2. Đường dẫn monorepo /app/apps/<app>/.next/static → một số internal reference cần
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/public ./apps/${APP_NAME}/public

USER nextjs

EXPOSE 3000
ENV PORT 3000

CMD node apps/${APP_NAME}/server.js