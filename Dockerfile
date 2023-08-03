FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "dev" ]
