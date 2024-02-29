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
    var event = new HandleEvent(req.body);
    var message = new Message();
    var profile = new Profile();
    if (event.getText() == '!ทำแบบประเมิน') {
        message.reply(event.getReplyToken(), message.text('ทำแบบทดสอบได้ที่ลิ้งค์นี้...'));
    } else if (event.getText() == '!นัดหมาย') {
        message.reply(event.getReplyToken(), message.text('กรุณารอสักครู่ เจ้าหน้าที่จะติตต่อกลับโดยเร็วที่สุด...'));
    } else if (event.getText() == '!ติดต่อเจ้าหน้าที่') {
        message.reply(event.getReplyToken(), message.text('หน้าสำหรับนัดหมายเจ้าหน้าที่...'));
    }
    res.sendStatus(200);
});

app.listen(PORT, () => {
    logger.info(`Server listening on port ${PORT}`)
});