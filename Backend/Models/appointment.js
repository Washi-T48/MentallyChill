import pool from "../Config/db.js";

const newAppointment = async (uid, tel, contactMethod, medDoctor, date, time, topic, detail, medHistory, subtopic) => {
    const datetime = String(date) + " " + String(time);
    const newAppointment = await pool.query(
        `INSERT INTO appointment (user_id, contact, contact_method, staff_id, appointment_date, topic, details, medical_history, sub_topic) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [uid, tel, contactMethod, medDoctor, datetime, topic, detail, medHistory, subtopic]
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
        `SELECT *, TO_CHAR(appointment.appointment_date, 'DD/MM/YYYY') as date, TO_CHAR(appointment.appointment_date, 'HH24:MI') as time FROM appointment INNER JOIN users ON users.user_id = appointment.user_id WHERE booking_id = $1 `,
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
        `SELECT * FROM appointment ORDER BY created DESC`
    );
    return (appointments["rows"]);
};

const upcomingAppointments = async () => {
    const appointments = await pool.query(
        `SELECT * FROM appointment WHERE appointment_date > NOW() where status = 'feedback' ORDER BY appointment_date ASC`
    );
    return (appointments["rows"]);
}

const newAppointments = async () => {
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

const respondAppointment = async (booking_id, status, pre_note) => {
    const appointment = await pool.query(
        `UPDATE appointment SET status = $2, pre_note = $3 WHERE booking_id = $1 RETURNING *`,
        [booking_id, status, pre_note]
    );
    return (appointment["rows"][0])
}

const postAppointment = async (booking_id, status, post_note, post_feedback, post_conclusion) => {
    const appointment = await pool.query(
        `UPDATE appointment SET status = $2, post_note = $3, post_feedback = $4, post_conclusion = $5 WHERE booking_id = $1 RETURNING *`,
        [booking_id, status, post_note, post_feedback, post_conclusion]
    );
    return (appointment["rows"][0])
}

// ONLY FOR SUBMISSION USING LINE_UID [FRONTEND ONLY]
const submitAppointment = async (uid, tel, contactMethod, medDoctor, date, time, topic, detail, medHistory, subtopic) => {
    const newAppointment = await pool.query(
        `INSERT INTO appointment (user_id, contact, contact_method, staff_id, appointment_date, topic, details, medical_history, sub_topic) VALUES ((SELECT user_id FROM users WHERE line_uid = $1), $2, $3, $4, $5 AT TIME ZONE 'Asia/Bangkok', $6, $7, $8, $9) RETURNING *`,
        [uid, tel, contactMethod, medDoctor, String(date) + " " + String(time), topic, detail, medHistory, subtopic]
    );
    return (newAppointment["rows"][0]);
}

const bookingCount = async () => {
    const count = await pool.query(
        `SELECT COUNT(*) FROM appointment WHERE status NOT IN ('cenceled', 'finished')`
    );
    return (count["rows"][0]);
}

const getTopic = async () => {
    const topics = await pool.query(
        `SELECT DISTINCT topic FROM appointment`
    );
    return (topics["rows"]);
}

export {
    newAppointment,
    deleteAppointment,
    updateAppointment,
    lookupAppointment,
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
};