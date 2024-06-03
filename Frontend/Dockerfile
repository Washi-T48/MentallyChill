# docker build -t line .
# docker run -p 8080:8080 -d line

FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
ENTRYPOINT [ "npm", "run", "dev"]