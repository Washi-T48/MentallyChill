import HandleEvent from './handle.js';
import { logger } from './logger.js';
import express from 'express';
import dotenv from 'dotenv';
import Message from './message.js';
const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendStatus(200);
});

app.post("/webhook", async function (req, res) {
    var event = new HandleEvent(req.body);
    var message = new Message();
    message.pushMessage(event.getID(), event.getText());
    res.sendStatus(200);
});

app.listen(PORT, () => {
    logger.server(`Server listening on port ${PORT}`)
});