import pool from "../Config/db.js";

const newUser = async (uid, line_uid, gender, age, year, email, tel, sos_tel) => {
    const newUser = await pool.query(
        `INSERT INTO users (user_id, line_uid, gender, age, grade_level, email, phone, phone_emergency) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [uid, line_uid, gender, age, year, email, tel, sos_tel]
    );
    return (newUser["rows"][0]);
};

const deleteUser = async (uid) => {
    const user = await pool.query(
        `DELETE FROM users WHERE user_id = $1`,
        [uid]
    );
    return (user)
};

const updateUser = async (uid, gender, age, year, email, tel, sos_tel) => {
    const user = await pool.query(
        `UPDATE users SET gender = $2, age = $3, grade_level = $4, email = $5, phone = $6, phone_emergency = $7 WHERE user_id = $1 RETURNING *`,
        [uid, gender, age, year, email, tel, sos_tel]
    );
    return (user["rows"][0]);
};

const lookupUser = async (uid) => {
    const user = await pool.query(
        `SELECT * FROM users WHERE user_id = $1`,
        [uid]
    );
    return (user["rows"]);
};

const lookupUserByLineID = async (line_uid) => {
    const user = await pool.query(
        `SELECT * FROM users WHERE line_uid = $1`,
        [line_uid]
    );
    return (user["rows"]);
};

const allUsers = async () => {
    const users = await pool.query(
        `SELECT * FROM users ORDER BY created DESC`
    );
    return (users["rows"]);
};

const getUserID = async (uid) => {
    const user = await pool.query(
        `SELECT user_id FROM users WHERE line_uid = $1`,
        [uid]
    );
    return (user["rows"][0]);
}

// ONLY FOR SUBMISSION USING LINE_UID [FRONTEND ONLY]
const registerUser = async (uid, gender, age, year, email, tel, sos_tel) => {
    const newUser = await pool.query(
        `INSERT INTO users (line_uid, gender, age, grade_level, email, phone, phone_emergency) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [uid, gender, age, year, email, tel, sos_tel]
    );
    return (newUser["rows"][0]);
};

const updateUserByLineID = async (uid, gender, age, year, email, tel, sos_tel) => {
    const user = await pool.query(
        `UPDATE users SET gender = $2, age = $3, grade_level = $4, email = $5, phone = $6, phone_emergency = $7 WHERE line_uid = $1 RETURNING *`,
        [uid, gender, age, year, email, tel, sos_tel]
    );
    return (user["rows"][0]);
};

export {
    newUser,
    deleteUser,
    updateUser,
    lookupUser,
    allUsers,
    getUserID,
    registerUser,
    lookupUserByLineID,
    updateUserByLineID,
};