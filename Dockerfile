FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "run", "start" ]

ONBUILD RUN mv /usr/src/app /usr/src/server