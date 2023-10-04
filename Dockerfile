FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
EXPOSE 10000/udp
CMD [ "node", "app.js" ]
