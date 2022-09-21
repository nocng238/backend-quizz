FROM node:14-alpine

WORKDIR /app

COPY package.json .
RUN npm install --silent

RUN chown -R node:node /app
USER node

COPY . .

CMD ["node", "server.js"]
