
#
# build frontend
#
FROM node:13.1.0 AS frontendBuild
WORKDIR /usr/app

COPY frontend/package.json .
COPY frontend/package-lock.json .

RUN npm install

COPY frontend/.babelrc .
COPY frontend/webpack.config.js .
COPY frontend/src ./src

RUN npm run build-prod

#
# build release image
#
FROM node:13.1.0-alpine AS release
WORKDIR /usr/app

COPY backend/package.json .
COPY backend/package-lock.json .
RUN npm install --only=production

COPY backend/src ./src

COPY --from=frontendBuild /usr/app/dist/prod ./frontend

ENV FRONTEND_STATIC_FILES=/usr/app/frontend

CMD npm run serve-prod
