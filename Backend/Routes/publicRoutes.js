import express from 'express';
import logger from '../Middleware/logger.js';
import jwt from 'jsonwebtoken';

import {
    submitForms,
} from '../Models/forms_result.js';

import {
    submitAppointment,
} from '../Models/appointment.js';

import {
    findStaff,
    comparePassword,
} from '../Models/auth.js';

import {
    allStaffs,
} from '../Models/staff.js';

import {
    getStaffTimeByDate,
} from '../Models/timetable.js';

import {
    formResultNotify,
    appointmentNotify,
} from "../Models/line.js";

const publicRouter = express.Router();

publicRouter.all('/', async (req, res) => {
    res.sendStatus(200);
});

// COPIED FROM AUTH ROUTES
publicRouter.post('/login', async (req, res) => {
    try {
        const { staff_id, password } = req.body;
        if (!staff_id || !password) { return res.sendStatus(400) }
        const staff = await findStaff(staff_id);
        if (!staff) { return res.status(401).send('Account not found') };
        if (staff && !staff.password) { return res.status(401).send('Permission denied') };

        if (await comparePassword(password, staff.password)) {
            const token = jwt.sign({ staff_id: staff.staff_id }, process.env.JWT_SECRET, { expiresIn: '3h' });
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({ token });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

// COPIED FROM FORMS ROUTES
publicRouter.post('/submitForms', async (req, res) => {
    try {
        const { uid, forms_type, result } = req.body;
        const submitResult = await submitForms(uid, forms_type, result);
        await formResultNotify(submitResult.result_id);
        res.status(200).json(submitResult);
    } catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
    return res.status(200);
});

publicRouter.post("/submitAppointment", async (req, res) => {
    try {
        const { uid, tel, contactMethod, medDoctor, date, time, topic, detail, medHistory, subtopic } = req.body;
        const appointment = await submitAppointment(uid, tel, contactMethod, medDoctor, date, time, topic, detail, medHistory, subtopic);
        await appointmentNotify(appointment.booking_id);
        res.status(200).json(appointment);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

publicRouter.post("/allStaff", async (req, res) => {
    try {
        const staffs = await allStaffs();
        res.status(200).json(staffs);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

publicRouter.post("/getStaffTimeByDate", async (req, res) => {
    try {
        const { staff_id, date } = req.body;
        const timetable = await getStaffTimeByDate(staff_id, date);
        res.status(200).json(timetable);
    } catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

export default publicRouter;