import pool from '../Config/db.js';
import json2csv from 'json2csv';

const exportcsvformResuit = async (res) => {
    const formResults = await pool.query(
        `SELECT * FROM forms_result ORDER BY created DESC`
    );
    const fields = ['result_id', 'user_id', 'forms_type', 'result', 'created'];
    const csv = json2csv.parse(formResults.rows, { fields });
    res.setHeader('Content-disposition', 'attachment; filename=formResult.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
}

const exportcsvAppointment = async (res) => {
    const appointments = await pool.query(
        `SELECT * FROM appointment ORDER BY created DESC`
    );
    const fields = ['booking_id', 'user_id', 'appointment_date', 'status', 'pre_note', 'post_note', 'post_feedback', 'post_conclusion', 'created'];
    const csv = json2csv.parse(appointments.rows, { fields });
    res.setHeader('Content-disposition', 'attachment; filename=appointment.csv');
    res.set('Content-Type', 'text/csv');
    res.status(200).send(csv);
}

export {
    exportcsvformResuit,
    exportcsvAppointment,
};
