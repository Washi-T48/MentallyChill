import axios from 'axios';
import dotenv from 'dotenv';
import logger from './logger.js';
import { getAuthHeader } from './auth.js';
dotenv.config();

export default class Profile {

    constructor() {
        this.userProfile = {}
    }

    async getUserProfile(userID) {
        return new Promise((resolve, reject) => {
            axios.get('https://api.line.me/v2/bot/profile/' + userID, { headers: getAuthHeader() }
            ).then((res) => {
                logger.info(JSON.stringify(res.data));
                this.userProfile = res.data;
                resolve(JSON.stringify(res.data));
            }).catch((err) => {
                logger.error(JSON.stringify(err));
                reject(err);
            });
        });
    }

    async getGroupMemberProfile(userID, groupID) {
        return new Promise((resolve, reject) => {
            axios.get('https://api.line.me/v2/bot/group/' + groupID + '/member/' + userID, { headers: getAuthHeader() }
            ).then((res) => {
                logger.info(JSON.stringify(res.data));
                this.userProfile = res.data;
                resolve(res.data);
            }).catch((err) => {
                logger.error(JSON.stringify(err));
                reject(err);
            });
        });
    }

    async getRoomMemberProfile(userID, roomID) {
        return new Promise((resolve, reject) => {
            axios.get('https://api.line.me/v2/bot/room/' + roomID + '/member/' + userID, { headers: getAuthHeader() }
            ).then((res) => {
                logger.info(JSON.stringify(res.data));
                this.userProfile = res.data;
                resolve(res.data);
            }).catch((err) => {
                logger.error(JSON.stringify(err));
                reject(err);
            });
        });
    }

    getDisplayName() {
        return this.userProfile.displayName;
    }
}