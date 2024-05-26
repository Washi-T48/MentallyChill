import pool from "../Config/db.js";

const newAppointment = async (uid, tel, contactMethod, medDoctor, date, time, topic, detail, medHistory) => {
    const newAppointment = await pool.query(
        `INSERT INTO appointment (user_id, contact, contact_method, staff_id, appointment_date, topic, details, medical_history) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [uid, tel, contactMethod, medDoctor, String(date) + " " + String(time), topic, detail, medHistory]
    );
    return (newAppointment["rows"][0]);
};

export { newAppointment };