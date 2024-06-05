# docker build -t cpanel .
# docker run -p 80:80 -d cpanel

FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
ENTRYPOINT [ "npm", "run", "dev"]