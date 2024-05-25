import pool from '../Config/db.js';
import bcrypt from 'bcryptjs';
import logger from '../Config/logger.js';

const createUser = async (username, password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const result = await pool.query(
            `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *`, [username, hashedPassword]
        );
        return result.rows[0];
    }
    catch (error) {
        logger.error(error);
        throw error;
    }
}

const findUserbyUsername = async (username) => {
    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE username = $1`, [username]
        );
        return result.rows[0];
    }
    catch (error) {
        logger.error(error);
        throw error;
    }
}

const comparePassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

export { createUser, findUserbyUsername, comparePassword };