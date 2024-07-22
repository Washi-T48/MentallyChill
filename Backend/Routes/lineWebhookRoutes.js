import express from "express";
import logger from "../Middleware/logger.js"

import HandleEvent from "../Helpers/handle.js";
import Message from "../Helpers/message.js";
import Profile from "../Helpers/profile.js";

const lineWebhookRouter = express.Router();

lineWebhookRouter.use(async (req, res, next) => { next(); });

lineWebhookRouter.all("/", async (req, res) => {
    res.sendStatus(200);
});


export default lineWebhookRouter;