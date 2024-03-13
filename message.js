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
                "text": String(text),
            });
        });
        return messagesArray;
    }

    textSender(...textSendersArray) {
        var messagesArray = [];
        textSendersArray.forEach(textSender => {
            const message = {
                "type": "text",
                "text": String(textSender.text),
                "sender": {
                }
            }

            if (textSender.hasOwnProperty('sender')) {
                message.sender.name = String(textSender.sender);
            }

            if (textSender.hasOwnProperty('IconUrl')) {
                message.sender.IconUrl = String(textSender.IconUrl);
            }

            if (!textSender.hasOwnProperty('sender') && !textSender.hasOwnProperty('IconUrl')) {
                delete message.sender;
            }

            messagesArray.push(message);
        });
        return messagesArray;
    }

    reply(replyToken, messagesArray) {
        let body = {
            replyToken: replyToken,
            messages: messagesArray
        }
        axios.post('https://api.line.me/v2/bot/message/reply', body, { headers: getAuthHeader() })
            .then((res) => { }).catch((err) => { logger.error(err) });
    }

    push(ID, messagesArray) {
        let body = {
            to: ID,
            messages: messagesArray
        }


        axios.post('https://api.line.me/v2/bot/message/push', body, { headers: getAuthHeader() })
            .then((res) => { }).catch((err) => { logger.error(err) });
    }

}
