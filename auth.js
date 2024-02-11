import axios from "axios";
import dotenv from "dotenv";
import querystring from "querystring";

dotenv.config();

export async function getAccessToken() {
    const response = await axios.post('https://api.line.me/oauth2/v3/token', querystring.stringify({
        grant_type: 'client_credentials',
        client_id: process.env.CHANNEL_ID,
        client_secret: process.env.CHANNEL_SECRET
    }), {
        headers: {
            contentType: 'application/x-www-form-urlencoded'
        }
    });
    return response.data.access_token;
}