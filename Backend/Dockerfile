# docker build -t backend .
# docker run -p 3000:3000 -d backend

FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm", "run", "start"]