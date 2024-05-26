import express from 'express';
import pool from '../Config/db.js';
import dotenv from 'dotenv';
import logger from '../Config/logger.js';

dotenv.config();

const appointmentRouter = express.Router();

appointmentRouter.post("/newAppointment", async (req, res) => {
    const {
        uid,
        tel,
        contactMethod,
        medDoctor,
        date,
        time,
        topic,
        detail,
        medHistory,
    } = req.body;

    try {
        console.log(req.body);
        const newAppointment = await pool.query(
            `INSERT INTO appointment (user_id, contact, contact_method, staff_id, appointment_date, topic, details, medical_history) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [uid, tel, contactMethod, medDoctor, String(date) + " " + String(time), topic, detail, medHistory]
        );
        console.log(newAppointment);
        res.status(200).json(newAppointment["rows"][0]);
        // res.send([uid, tel, contactMethod, medDoctor, String(date) + " " + String(time), topic, detail, medHistory]);
    } catch (err) {
        logger.error(err.message);
        res.sendStatus(500);
    }
});

export default appointmentRouter;