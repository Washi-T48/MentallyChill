import axios from "axios";
import dotenv from "dotenv";
import querystring from "querystring";
dotenv.config();

export function getAuthHeader() {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.LINE_CHANNEL_SECRET
    }
}