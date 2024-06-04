# docker build -t line .
# docker run -p 6969:6969 -d line

FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 6969
ENTRYPOINT [ "npm", "run", "start"]