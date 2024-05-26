import pool from "../Config/db.js";

const newAppointment = async (uid, tel, contactMethod, medDoctor, date, time, topic, detail, medHistory) => {
    const newAppointment = await pool.query(
        `INSERT INTO appointment (user_id, contact, contact_method, staff_id, appointment_date, topic, details, medical_history) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
        [uid, tel, contactMethod, medDoctor, String(date) + " " + String(time), topic, detail, medHistory]
    );
    return (newAppointment["rows"][0]);
};

const deleteAppointment = async (booking_id) => {
    const appointment = await pool.query(
        `DELETE FROM appointment WHERE booking_id = $1`,
        [booking_id]
    );
    return (appointment["rows"][0])
};

const updateAppointment = async (booking_id, date, time, topic, detail, medHistory) => {
    const appointment = await pool.query(
        `UPDATE appointment SET appointment_date = $1, topic = $2, details = $3, medical_history = $4 WHERE booking_id = $5 RETURNING *`,
        [String(date) + " " + String(time), topic, detail, medHistory, booking_id]
    );
    return (appointment["rows"][0])
};

const lookupAppointment = async (booking_id) => {
    const appointment = await pool.query(
        `SELECT * FROM appointment WHERE booking_id = $1 ORDER BY appointment_date DESC`,
        [booking_id]
    );
    return (appointment["rows"]);
};

const userAppointments = async (uid) => {
    const appointments = await pool.query(
        `SELECT * FROM appointment WHERE user_id = $1 ORDER BY appointment_date DESC`,
        [uid]
    );
    return (appointments["rows"]);
};
const allAppointments = async () => {
    const appointments = await pool.query(
        `SELECT * FROM appointment ORDER BY appointment_date DESC`
    );
    return (appointments["rows"]);
};

const upcomingAppointments = async () => {
    const appointments = await pool.query(
        `SELECT * FROM appointment WHERE appointment_date > NOW() ORDER BY appointment_date ASC`
    );
    return (appointments["rows"]);
};

const pastAppointments = async () => {
    const appointments = await pool.query(
        `SELECT * FROM appointment WHERE appointment_date < NOW() ORDER BY appointment_date DESC`
    );
    return (appointments["rows"]);
};

export {
    newAppointment,
    deleteAppointment,
    updateAppointment,
    lookupAppointment,
    userAppointments,
    allAppointments,
    upcomingAppointments,
    pastAppointments,
};