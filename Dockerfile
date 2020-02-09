FROM node:12.15.0-alpine AS root

RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json yarn.lock ./
COPY packages/validator/package.json packages/validator/
COPY packages/server/package.json packages/server/
COPY packages/web/package.json packages/web/
COPY lerna.json ./

RUN yarn install --production=false
RUN yarn lerna bootstrap

ENV NODE_ENV=production


FROM root AS server

COPY config/tsconfig.json config/

# build validator
COPY packages/validator/ packages/validator/
RUN yarn lerna run build --scope @mono/validator

# build server
COPY packages/server/ packages/server/
RUN yarn lerna run build --scope @mono/server

# build web
COPY config/tsconfig.json config/paths.ts config/webpack.config.ts config/
COPY scripts/ scripts/
COPY packages/web/ packages/web/
RUN yarn lerna run build --scope @mono/web

# start server
CMD yarn lerna run start:build --stream --scope @mono/server


FROM nginx:alpine AS web

# next line is for local debuging
# RUN rm /etc/nginx/conf.d/default.conf

COPY config/nginx.conf /etc/nginx/conf.d/bldr.fyrlabs.com.conf
COPY --from=server /usr/app/packages/web/build/ /usr/share/nginx/html/

CMD ["nginx", "-g", "daemon off;"]
