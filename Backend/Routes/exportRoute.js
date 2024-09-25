import express from "express";
import logger from "../Middleware/logger.js"

import { exportcsvAppointment,exportcsvformResuit } from "../Models/export";

const exportRouter = express.Router();

exportRouter.get ("/exportformResult", async (req, res) => {
    try {
        await exportcsvformResuit(res);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

exportRouter.get ("/exportappointment", async (req, res) => {
    try {
        await exportcsvAppointment(res);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

export default exportRouter;