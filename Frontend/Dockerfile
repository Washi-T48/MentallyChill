# docker build -t frontend .
# docker run -p 443:443 -d frontend

FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 443
ENTRYPOINT [ "npm", "run", "dev"]