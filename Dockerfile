# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

# Want to help us make this template better? Share your feedback here: https://forms.gle/ybq9Krt8jtBL3iCk7

ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine3.21 AS base
WORKDIR /usr/src/app
EXPOSE 3000

############################
# DEV
FROM base AS dev
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev
USER node
COPY . .
# CMD npm run dev
CMD ["npm", "run", "dev"]

############################
# PROD
FROM base AS prod
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev
USER node
COPY . .
# CMD node src/index.js
CMD ["node", "src/index.js"]

############################
# TEST
FROM base AS test
USER root

RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=package-lock.json,target=package-lock.json \
    --mount=type=cache,target=/root/.npm \
    npm ci --include=dev

COPY . .

# Use POSIX-compatible `sh -c` with `set -a` to export envs
RUN /bin/sh -c "set -a && . .env.test && npm run test"
