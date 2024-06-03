# docker build -t frontend .
# docker run -p 8080:8080 -d frontend
# ngrok config add-authtoken
# ngrok https 8080 --domain=<domain> 

FROM node:latest
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null && echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list && sudo apt update && sudo apt install ngrok
EXPOSE 8080
ENTRYPOINT [ "npm", "run", "dev"]