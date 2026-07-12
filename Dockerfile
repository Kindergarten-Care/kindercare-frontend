# Sử dụng Alpine để tối ưu dung lượng
FROM node:20-alpine AS base

# Giai đoạn 1: Prune dự án bằng turbo
FROM base AS pruner
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN npm install -g turbo@^2.9.18
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

# Declare build-time environment variables for Next.js static inlining
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_API_BASE
ARG NEXT_PUBLIC_SOCKET_URL
ARG NEXT_PUBLIC_LANDING_APP_URL
ARG NEXT_PUBLIC_PARENT_APP_URL
ARG NEXT_PUBLIC_TEACHER_APP_URL
ARG NEXT_PUBLIC_PRINCIPAL_APP_URL
ARG NEXT_PUBLIC_PORTAL_APP_URL

ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_BASE=$NEXT_PUBLIC_API_BASE
ENV NEXT_PUBLIC_SOCKET_URL=$NEXT_PUBLIC_SOCKET_URL
ENV NEXT_PUBLIC_LANDING_APP_URL=$NEXT_PUBLIC_LANDING_APP_URL
ENV NEXT_PUBLIC_PARENT_APP_URL=$NEXT_PUBLIC_PARENT_APP_URL
ENV NEXT_PUBLIC_TEACHER_APP_URL=$NEXT_PUBLIC_TEACHER_APP_URL
ENV NEXT_PUBLIC_PRINCIPAL_APP_URL=$NEXT_PUBLIC_PRINCIPAL_APP_URL
ENV NEXT_PUBLIC_PORTAL_APP_URL=$NEXT_PUBLIC_PORTAL_APP_URL

# Next.js build
RUN yarn turbo build --filter=@kindercare/${APP_NAME}

# Giai đoạn 4: Runner
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ARG APP_NAME
ENV APP_NAME=${APP_NAME}

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy các file cần thiết từ builder (standalone mode)
# Lưu ý: Với monorepo, file standalone nằm trong apps/[app-name]/.next/standalone
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/.next/static ./apps/${APP_NAME}/.next/static
COPY --from=builder --chown=nextjs:nodejs /app/apps/${APP_NAME}/public ./apps/${APP_NAME}/public

# Copy node_modules của root và app (cần thiết cho standalone trong monorepo)
# Tuy nhiên standalone mode thường đã gom đủ. 

USER nextjs

EXPOSE 3000
ENV PORT 3000

# Chạy server.js của app tương ứng
CMD node apps/${APP_NAME}/server.js