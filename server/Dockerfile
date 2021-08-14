FROM node:16.6.1-alpine3.11

WORKDIR /usr/install
COPY ./package.json .
RUN yarn install
ENV NODE_PATH=/usr/install/node_modules
ENV PATH /usr/install/node_modules/.bin:$PATH

WORKDIR /usr/src/app
COPY . /usr/src/app

