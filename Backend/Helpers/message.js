import axios from 'axios';
import dotenv from 'dotenv';
import { getAuthHeader } from '../Config/lineAuth.js';
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

    flex(...flexes) {
        var messagesArray = [];
        flexes.forEach(flex => {
            messagesArray.push({
                "type": "flex",
                "altText": String(flex.altText),
                "contents": flex
            });
        });
        console.log(messagesArray)
        return messagesArray;
    }


    textSender(...textSendersArray) {
        var messagesArray = [];
        textSendersArray.forEach(textSender => {
            const message = {
                "type": "text",
                "sender": {
                    name: (textSender.hasOwnProperty('sender') ? String(textSender.sender) : ""),
                    iconUrl: (textSender.hasOwnProperty('IconUrl') ? String(textSender.IconUrl) : "")
                },
                "text": (textSender.hasOwnProperty('text')) ? String(textSender.text) : String(textSender),
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
            .then((res) => { }).catch((err) => { throw err });
    }

    push(ID, messagesArray) {
        let body = {
            to: ID,
            messages: messagesArray
        }
        axios.post('https://api.line.me/v2/bot/message/push', body, { headers: getAuthHeader() })
            .then((res) => { }).catch((err) => { throw err });
    }

}
