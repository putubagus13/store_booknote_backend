FROM node:20

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3600

CMD ["npm", "run", "start"]
