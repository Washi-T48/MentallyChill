import logger from './logger.js';
import HandleEvent from './handle.js';
import Message from './message.js';
import Profile from './profile.js';
import express from 'express';
import dotenv from 'dotenv';
const app = express();

dotenv.config();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendStatus(200);
});

app.post("/webhook", async function (req, res) {
    logger.info(JSON.stringify(req.body));
    res.sendStatus(200);
});

app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`)
});