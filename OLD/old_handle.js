import { MongoClient } from 'mongodb';

class HandleEvent {
    constructor(event) {
        this.event = event;
    }

    fullGet() {
        getEventType();
        getMessage();
        getMessageType();
        if (this.getEventType() == 'message') {
            getText();
        }
        if (this.getEventType() == 'unsend') {
            getUnsend();
        }
    }

    getEventType() {
        this.type = this.event.events[0].type;
        return this.type;
    }

    getMessage() {
        this.message = this.event.events[0].message;
        return this.message;
    }
    getReplyToken() {
        this.replyToken = this.event.events[0].replyToken;
        return this.replyToken;
    }

    getMessageType() {
        this.messageType = this.getMessage().type;
        return this.messageType;
    }

    getText() {
        if (this.getEventType() == 'message') {
            this.text = this.event.events[0].message.text;
            return this.text;
        }
        else {
            return null;
        }
    }
    getMessageID() {
        if (this.getEventType() == 'message') {
            this.messageID = this.event.events[0].message.id;
            return this.messageID;
        }
        else {
            return false;
        }
    }

    getUnsend() {
        if (this.getEventType() == 'unsend') {
            this.unsend = this.event.events[0].unsend.messageId;
            return this.unsend;
        }
        else {
            return null;
        }
    }
}

class MongoCon {


    constructor() {
        this.uri = "mongodb://localhost:27017";
        this.MongoClient = new MongoClient(this.uri, {});
    }

    async connect() {
        await this.MongoClient.connect();
    }

    async insert(event) {
        try {
            await this.connect();
            await this.MongoClient.db("ml1").collection("msglog").insertOne({ messageID: event.events[0].message.id, text: event.events[0].message.text, replyToken: event.events[0].replyToken });
        } finally {
            await this.MongoClient.close();
        }
    }

    async findMSG(messageID) {
        try {
            await this.connect();
            const message = await this.MongoClient.db("ml1").collection("msglog").findOne({ messageID });
            return message ? message.text : null;
        } finally {
            await this.MongoClient.close();
        }
    }

    async getReplyToken(messageID) {
        await this.connect();
        const message = await this.MongoClient.db("ml1").collection("msglog").findOne({ messageID });
        return message ? message.replyToken : null;
    }
}
export default HandleEvent;
export { MongoCon };