import logger from './Config/logger.js'
import HandleEvent from './Helpers/handle.js'
import Message from './Helpers/message.js'
import Profile from './Helpers/profile.js'
import express from 'express'
import dotenv from 'dotenv'
const app = express()

dotenv.config();
const PORT = process.env.PORT || 6969;
const CHANNEL_SECRET = process.env.CHANNEL_SECRET;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendStatus(200)
});

app.post("/webhook", async function (req, res) {
    logger.info(JSON.stringify(req.body))
    try {
        var event = new HandleEvent(req.body)
        var message = new Message()
        var profile = new Profile()
        console.log(event.getText())
    }
    catch (e) {
        logger.error(e)
    }
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
    logger.info(`Server listening on port ${PORT}`)
});

