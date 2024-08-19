import dotenv from 'dotenv';
import crypto from "crypto";
import logger from './logger.js';

dotenv.config();

const lineSignatureValidate = async (req, res, next) => {
    const secret = process.env.LINE_CHANNEL_SECRET;
    const signature = crypto.createHmac("SHA256", secret)
        .update(JSON.stringify(req.body))
        .digest("base64").toString();
    if (signature === req.headers["x-line-signature"]) { next(); }
    else { logger.alert("INVALID WEBHOOK SIGNATURE"); res.sendStatus(401); }
};

export default lineSignatureValidate;