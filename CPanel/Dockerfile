# docker build -t cpanel .
# docker run -p 5173:5173 -d cpanel

FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
ENTRYPOINT [ "npm", "run", "start"]