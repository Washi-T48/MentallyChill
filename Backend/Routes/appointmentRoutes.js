import express from 'express';
import logger from '../Config/logger.js';

import { newAppointment } from '../Models/appointment.js';
import { deleteAppointment } from '../Models/appointment.js';
import { lookupAppointment } from '../Models/appointment.js';
import { updateAppointment } from '../Models/appointment.js';
import { userAppointments } from '../Models/appointment.js';
import { allAppointments } from '../Models/appointment.js';
import { upcomingAppointments } from '../Models/appointment.js';
import { pastAppointments } from '../Models/appointment.js';

const appointmentRouter = express.Router();

appointmentRouter.post("/new", async (req, res) => {
    try {
        const { uid, tel, contactMethod, medDoctor, date, time, topic, detail, medHistory } = req.body;
        const newAppointmentResult = await newAppointment(uid, tel, contactMethod, medDoctor, date, time, topic, detail, medHistory);
        res.status(200).json(newAppointmentResult);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

appointmentRouter.delete("/delete", async (req, res) => {
    try {
        const { booking_id } = req.body;
        const appointment = await deleteAppointment(booking_id);
        res.status(200).json(appointment);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

appointmentRouter.put("/update", async (req, res) => {
    try {
        const { booking_id, date, time, topic, detail, medHistory } = req.body;
        const appointment = await updateAppointment(booking_id, date, time, topic, detail, medHistory);
        res.status(200).json(appointment);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

appointmentRouter.get("/lookup", async (req, res) => {
    try {
        const { booking_id } = req.body;
        const appointment = await lookupAppointment(booking_id);
        res.status(200).json(appointment);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

appointmentRouter.get("/user", async (req, res) => {
    try {
        const { uid } = req.body;
        const appointments = await userAppointments(uid);
        res.status(200).json(appointments);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

appointmentRouter.get("/all", async (req, res) => {
    try {
        const appointments = await allAppointments();
        res.status(200).json(appointments);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

appointmentRouter.get("/upcoming", async (req, res) => {
    try {
        const appointments = await upcomingAppointments();
        res.status(200).json(appointments);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

appointmentRouter.get("/past", async (req, res) => {
    try {
        const appointments = await pastAppointments();
        res.status(200).json(appointments);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

export default appointmentRouter;