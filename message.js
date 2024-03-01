import axios from 'axios';
import dotenv from 'dotenv';
import logger from './logger.js';
import { getAuthHeader } from './auth.js';
dotenv.config();

export default class Message {
    constructor() {
    }

    text(...texts) {
        var messagesArray = [];
        texts.forEach(text => {
            messagesArray.push({
                "type": "text",
                "text": String(text)
            });
        });
        return messagesArray;
    }

    reply(replyToken, messagesArray) {
        let body = {
            replyToken: replyToken,
            messages: messagesArray
        }
        axios.post('https://api.line.me/v2/bot/message/reply', body, { headers: getAuthHeader() })
            .then((res) => { }).catch((err) => { });
    }

    push(ID, messagesArray) {
        let body = {
            to: ID,
            messages: messagesArray
        }


        axios.post('https://api.line.me/v2/bot/message/push', body, { headers: getAuthHeader() })
            .then((res) => { }).catch((err) => { });
    }

}
