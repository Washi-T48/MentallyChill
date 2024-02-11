import axios from 'axios';
import dotenv from 'dotenv';
import { getAccessToken } from './auth.js';
dotenv.config();

export default class Message {
    constructor() {
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getAccessToken()
        }
    }

    sendMessage(message, userID) {
        axios.post('https://api.line.me/v2/bot/message/push', {
            headers: this.headers,
            body: {
                to: userID,
                messages: [
                    {
                        type: 'text',
                        text: message
                    }
                ]
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }

}

const nice = new Message();
nice.sendMessage("Hello", "U43354d20204e8cd7717133c1a03d9360");
