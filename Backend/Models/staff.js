import pool from '../Config/db.js';

const newStaff = async (staff_id, name, surname, nickname, image) => {
    const result = await pool.query(`
        INSERT INTO staff (staff_id, name, surname, nickname, image) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [staff_id, name, surname, nickname, image]
    );
    return result.rows[0];
};


const deleteStaff = async (staff_id) => {
    const staff = await pool.query(
        `DELETE FROM staff WHERE staff_id = $1`,
        [staff_id]
    );
    return (staff["rows"][0])
};

const updateStaff = async (staff_id, name, surname, nickname) => {
    const staff = await pool.query(
        `UPDATE staff SET name = $2, surname = $3, nickname = $4 WHERE staff_id = $1 RETURNING *`,
        [staff_id, name, surname, nickname]
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

const allStaffs = async () => {
    const staff = await pool.query(
        `SELECT * FROM staff ORDER BY created DESC`
    );
    return (staff["rows"]);
};

export {
    newStaff,
    deleteStaff,
    updateStaff,
    lookupStaff,
    allStaffs,
};