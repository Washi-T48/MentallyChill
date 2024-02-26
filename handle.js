import logger from "./logger.js";

export default class HandleEvent {
    constructor(event) {
        this.event = event.events[0];
    }

    getEventType() {
        this.type = this.event.type;
        return this.type;
    }

    getEventSource() {
        this.source = this.event.source;
        return this.source;
    }

    getID() {
        if (this.getEventSource().type == 'user') {
            this.id = this.getUserID();
            return this.id;
        }
        else if (this.getEventSource().type == 'group') {
            this.id = this.getGroupID();
            return this.id;
        }
    }

    getUserID() {
        this.userID = this.getEventSource().userId;
        return this.userID;
    }

    getGroupID() {
        this.groupID = this.getEventSource().groupId;
        this.userID = this.getEventSource().userId;
        return this.groupID;
    }

    getMessage() {
        this.message = this.event.message;
        return this.message;
    }

    getReplyToken() {
        this.replyToken = this.event.replyToken;
        return this.replyToken;
    }

    getMessageType() {
        this.messageType = this.getMessage().type;
        return this.messageType;
    }

    getText() {
        if (this.getEventType() == 'message') {
            this.text = this.event.message.text;
            return this.text;
        }
        else {
            return null;
        }
    }

    getMessageID() {
        if (this.getEventType() == 'message') {
            this.messageID = this.event.message.id;
            return this.messageID;
        }
        else {
            return false;
        }
    }

    getUnsend() {
        if (this.getEventType() == 'unsend') {
            this.unsend = this.event.unsend.messageId;
            return this.unsend;
        }
        else {
            return null;
        }
    }
}