import express from 'express';
import logger from '../Middleware/logger.js';

import {
    newAppointment,
    deleteAppointment,
    lookupAppointment,
    updateAppointment,
    userAppointments,
    allAppointments,
    upcomingAppointments,
    newAppointments,
    pastAppointments,
    respondAppointment,
    postAppointment,
    submitAppointment,
    bookingCount,
    getTopic,
} from '../Models/appointment.js';


import { getStaffTimeByDate } from '../Models/timetable.js';

const appointmentRouter = express.Router();

appointmentRouter.all("/", async (req, res) => {
    res.sendStatus(200);
});

//USE USER_ID FOR UID BY DEFAULT

appointmentRouter.post("/new", async (req, res) => {
    try {
        const { uid, tel, contactMethod, medDoctor, date, time, topic, detail, medHistory, sub_topic } = req.body;
        const newAppointmentResult = await newAppointment(uid, tel, contactMethod, medDoctor, date, time, topic, detail, medHistory, sub_topic);
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

appointmentRouter.get("/lookup/:booking_id", async (req, res) => {
    try {
        const booking_id = req.params['booking_id'];
        const appointment = await lookupAppointment(booking_id);
        res.status(200).json(appointment);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

appointmentRouter.get("/user/:uid", async (req, res) => {
    try {
        const uid = req.params['uid'];
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

appointmentRouter.get("/getnew", async (req, res) => {
    try {
        const appointments = await newAppointments();
        res.status(200).json(appointments);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

appointmentRouter.get("/getpast", async (req, res) => {
    try {
        const appointments = await pastAppointments();
        res.status(200).json(appointments);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

appointmentRouter.post("/respond", async (req, res) => {
    try {
        const { booking_id, status, pre_note } = req.body;
        const appointment = await respondAppointment(booking_id, status, pre_note);
        res.status(200).json(appointment);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

appointmentRouter.post("/post", async (req, res) => {
    try {
        const { booking_id, status, post_note, post_feedback, post_conclusion } = req.body;
        const appointment = await postAppointment(booking_id, status, post_note, post_feedback, post_conclusion);
        res.status(200).json(appointment);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

// ONLY FOR FRONTEND SUBMISSION, PLEASE USE LINE_UID FOR UID [FRONTEND ONLY]
appointmentRouter.post("/submit", async (req, res) => {
    try {
        const { uid, tel, contactMethod, medDoctor, date, time, topic, detail, medHistory, sub_topic } = req.body;
        const appointment = await submitAppointment(uid, tel, contactMethod, medDoctor, date, time, topic, detail, medHistory, sub_topic);
        res.status(200).json(appointment);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

appointmentRouter.get("/count", async (req, res) => {
    try {
        const appointments = await bookingCount();
        res.status(200).json(appointments);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

appointmentRouter.get("/topic", async (req, res) => {
    try {
        const appointments = await getTopic();
        res.status(200).json(appointments);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

appointmentRouter.post("/fetchTimeslot", async (req, res) => {
    try {
        const { staff_id, date } = req.body;
        const timeslots = await getStaffTimeByDate(staff_id, date);
        res.status(200).json(timeslots);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});
export default appointmentRouter;