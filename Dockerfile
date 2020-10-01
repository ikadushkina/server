FROM node:12.18.4-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

CMD ["npm","run","start"]
