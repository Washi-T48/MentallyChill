import express from 'express';
import dotenv from 'dotenv';
import logger from '../Config/logger.js';

import { newAppointment } from '../Models/appointment.js';

dotenv.config();

const appointmentRouter = express.Router();

appointmentRouter.post("/newAppointment", async (req, res) => {
    const { uid, tel, contactMethod, medDoctor, date, time, topic, detail, medHistory } = req.body;
    try {
        const newAppointmentResult = await newAppointment(uid, tel, contactMethod, medDoctor, date, time, topic, detail, medHistory);
        res.status(200).json(newAppointmentResult);
    }
    catch (error) {
        logger.error(error);
        res.status(500);
    }
});

export default appointmentRouter;