import pool from '../Config/db.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const findStaff = async (staff_id) => {
    const result = await pool.query('SELECT staff_id, password FROM staff WHERE staff_id = $1',
        [staff_id]);
    return result.rows[0];
};

const registerStaff = async (staff_id, password) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newStaff = await pool.query(`UPDATE staff SET password = $2 WHERE staff_id = $1 RETURNING *`,
        [staff_id, hashedPassword]);
    return newStaff.rows[0];
};

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

const changePassword = async (staff_id, password) => {
    const hashedPassword = await bcrypt.hash(password, 12);
    const staff = await pool.query(`UPDATE staff SET password = $2 WHERE staff_id = $1 RETURNING *`,
        [staff_id, hashedPassword]);
    return staff.rows[0];
}

const updateStaff = async (staff_id, name, surname, nickname) => {
    const staff = await pool.query(
        `UPDATE staff SET name = $2, surname = $3, nickname = $4 WHERE staff_id = $1 RETURNING *`,
        [staff_id, name, surname, nickname]
    );
    return (staff["rows"][0])
};

export {
    findStaff,
    registerStaff,
    comparePassword,
    changePassword,
    updateStaff
};