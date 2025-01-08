import pool from "../Config/db.js";

const newLog = async (staff_id, action, description) => {
    const log = await pool.query(
        `INSERT INTO log (staff_id, action, description) VALUES($1, $2, $3) RETURNING *`,
        [staff_id, action, description]
    );
}

const allLogs = async () => {
    const logs = await pool.query(
        `SELECT * FROM log ORDER BY created DESC`
    );
    return (logs["rows"]);
}

const getLog = async (log_id) => {
    const log = await pool.query(
        `SELECT * FROM log WHERE log_id = $1`,
        [log_id]
    );
    return (log["rows"]);
}

const simpleLog = async (staff_id, action) => {
    const log = await pool.query(
        `INSERT INTO log (staff_id, action) VALUES($1, $2) RETURNING *`,
        [staff_id, action]
    );
    return (log["rows"][0]);
}

//FOR FRONTEND USAGE

const feLogs = async () => {
    const logs = await pool.query(
        `SELECT * FROM log WHERE action != 'Check' ORDER BY created DESC`
    );
    return (logs["rows"]);
}

export {
    newLog,
    allLogs,
    getLog,
    simpleLog,
    feLogs
};