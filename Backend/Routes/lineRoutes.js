import express from "express";
import logger from "../Middleware/logger.js"

import lineSignatureValidate from "../Middleware/line.js";
import HandleEvent from "../Helpers/handle.js";
import Message from "../Helpers/message.js";
import Profile from "../Helpers/profile.js";
import { url } from "inspector";

const lineRouter = express.Router();

lineRouter.post("/webhook", async (req, lineSignatureValidate, res) => {
    try {
        //INSERT TRIGGERS HERE
        res.sendStatus(200);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

export default lineRouter;