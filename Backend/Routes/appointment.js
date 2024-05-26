import express from 'express';
import pool from '../Config/db.js';
import dotenv from 'dotenv';
import logger from '../Config/logger.js';

dotenv.config();

const appointmentRouter = express.Router();

appointmentRouter.post("/appoint", async (req, res) => {
    const { tel,
        uuid,
        contactMethod,
        medDoctor,
        datetime,
        date,
        time,
        topic,
        detail,
        medHistory
    } = req.body;

    try {
        console.log(req.body);
        const newAppointment = await pool.query(
            `INSERT INTO appointment (user_id, contact, contact_method, staff_id, appointment_date, topic, medHistory) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [uuid, tel, contactMethod, medDoctor, topic, medHistory]
        );
        console.log(newAppointment);
        res.status(200).json(newAppointment);
    } catch (err) {
        logger.error(err.message);
    }
});

export default appointmentRouter;