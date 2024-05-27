import pool from '../Config/db.js';

const newStaff = async (name, surname, nickname, description) => {
    const newStaff = await pool.query(
        `INSERT INTO staff (name, surname, nickname, description) VALUES($1, $2, $3, $4) RETURNING *`,
        [name, surname, nickname, description]
    );
    return (newStaff["rows"][0]);
};

const deleteStaff = async (staff_id) => {
    const staff = await pool.query(
        `DELETE FROM staff WHERE staff_id = $1`,
        [staff_id]
    );
    return (staff["rows"][0])
};

const updateStaff = async (staff_id, name, surname, nickname, description) => {
    const staff = await pool.query(
        `UPDATE staff SET name = $1, surname = $2, nickname = $3, description = $4 WHERE staff_id = $5 RETURNING *`,
        [name, surname, nickname, description, staff_id]
    );
    return (staff["rows"][0])
};

const lookupStaff = async (staff_id) => {
    const staff = await pool.query(
        `SELECT * FROM staff WHERE staff_id = $1 ORDER BY created DESC`,
        [staff_id]
    );
    return (staff["rows"]);
};

export {
    newStaff,
    deleteStaff,
    updateStaff,
    lookupStaff
};