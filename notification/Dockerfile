FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json /app

RUN npm install 
COPY . . 

EXPOSE 3001

ENTRYPOINT ["npm", "start"]
