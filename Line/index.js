import logger from './Config/logger.js'
import HandleEvent from './Helpers/handle.js'
import Message from './Helpers/message.js'
import Profile from './Helpers/profile.js'
import express from 'express'
import dotenv from 'dotenv'

// SSL
import https from 'https'
import fs from 'fs'

const options = {
    key: fs.readFileSync('./ssl/private-key.pem'),
    cert: fs.readFileSync('./ssl/certificate.pem')
}

const app = express()

dotenv.config();
const PORT = process.env.PORT || 6969;
const CHANNEL_SECRET = process.env.CHANNEL_SECRET;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/", (req, res) => {
    console.log("GET / ");
    res.sendStatus(200)
});

app.post("/webhook", async function (req, res) {
    logger.info(JSON.stringify(req.body))
    try {
        var event = new HandleEvent(req.body)
        var message = new Message()
        var profile = new Profile()
        console.log(event.getUserID())
        message.reply(event.getReplyToken(), message.text(event.getUserID()))
    }
    catch (e) {
        logger.error(e)
        res.sendStatus(500);
    }
});

const server = https.createServer(options, app)

server.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
    console.log(`Server started on port ${PORT}`);
});

