import axios from 'axios';
import dotenv from 'dotenv';
import { getAuthHeader } from '../Config/lineAuth.js';
dotenv.config();

export default class Profile {

    constructor() {
        this.userProfile = {}
    }

    async getUserProfile(userID) {
        return new Promise((resolve, reject) => {
            axios.get('https://api.line.me/v2/bot/profile/' + userID, { headers: getAuthHeader() }
            ).then((res) => {
                this.userProfile = res.data;
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    async getGroupMemberProfile(userID, groupID) {
        return new Promise((resolve, reject) => {
            axios.get('https://api.line.me/v2/bot/group/' + groupID + '/member/' + userID, { headers: getAuthHeader() }
            ).then((res) => {
                this.userProfile = res.data;
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    async getRoomMemberProfile(userID, roomID) {
        return new Promise((resolve, reject) => {
            axios.get('https://api.line.me/v2/bot/room/' + roomID + '/member/' + userID, { headers: getAuthHeader() }
            ).then((res) => {
                this.userProfile = res;
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}