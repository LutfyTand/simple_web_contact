FROM node:alpine3.15

WORKDIR /usr/src/app

RUN apk add curl
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]