import axios from 'axios';
import dotenv from 'dotenv';
import { logger } from './logger.js';
import { getAccessToken } from './auth.js';
dotenv.config();

export default class Message {
    constructor() {
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAccessToken()
        }
    }

    replyMessage(replyToken, message) {

        logger.action("replyMessage" + " " + message + " => " + replyToken)

        let body = {
            replyToken: replyToken,
            messages: [
                {
                    type: 'text',
                    text: message
                }
            ]
        }
        axios.post('https://api.line.me/v2/bot/message/reply', body, { headers: this.headers }
        ).then((res) => {
            console.log(res.data);
        }).catch((err) => {
            logger.error(JSON.stringify(err));
        });
    }

    pushMessage(ID, message) {

        logger.action("pushMessage" + " " + message + " => " + ID)


        let body = {
            to: ID,
            messages: [
                {
                    type: 'text',
                    text: message
                }
            ]
        }


        axios.post('https://api.line.me/v2/bot/message/push', body, { headers: this.headers })
            .then((res) => {
                console.log(res.data);
            }).catch((err) => {
                logger.error(JSON.stringify(err));
            });
    }

}
