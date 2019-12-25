FROM alpine:latest

WORKDIR /workspace

RUN apk add --update nodejs npm

COPY package*.json ./
RUN npm install

CMD ["node", "server.js"]
