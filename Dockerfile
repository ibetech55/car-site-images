FROM node:14.19.1

EXPOSE 8000

WORKDIR /app

RUN npm install -g npm

COPY ./package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
