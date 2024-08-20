import express from "express";
import logger from "../Middleware/logger.js"

import lineSignatureValidate from "../Middleware/line.js";
import HandleEvent from "../Helpers/handle.js";
import Message from "../Helpers/message.js";
import Profile from "../Helpers/profile.js";
import { url } from "inspector";

import { lookupStaff } from "../Models/staff.js";

import { appointmentNotify } from "../Models/line.js";

const lineRouter = express.Router();

lineRouter.post("/webhook", lineSignatureValidate, async (req, res) => {
    try {
        //INSERT TRIGGERS HERE
        const event = new HandleEvent(req.body);
        console.log(event.getID());
        res.sendStatus(200);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
}
);

export default lineRouter;