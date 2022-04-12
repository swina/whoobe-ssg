FROM node:16.10.0

RUN npm install -g npm@8.5.5
RUN mkdir /app && chown node:node /app
RUN npm install -g nodemon
RUN npm install -g http-server
USER node

WORKDIR /app

COPY . .