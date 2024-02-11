import HandleEvent from './handle.js';
import { logger } from './logger.js';
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
    var event = new HandleEvent(req.body);
    logger.info(req.body);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});