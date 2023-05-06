FROM node:14

WORKDIR /app
COPY package.json /app/package.json
RUN npm config set registry https://registry.npm.taobao.org
RUN  npm i 
COPY . /app

EXPOSE 7001

CMD  npm run start
