import pool from "../Config/db.js";

const newUser = async (uid, gender, age, year, email, tel, sos_tel) => {
    const newUser = await pool.query(
        `INSERT INTO users (user_id, gender, age, grade_level, email, phone, phone_emergency) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [uid, gender, age, year, email, tel, sos_tel]
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

const lookupUser = async (uid) => {
    const user = await pool.query(
        `SELECT * FROM users WHERE user_id = $1`,
        [uid]
    );
    return (user["rows"]);
};

const allUsers = async () => {
    const users = await pool.query(
        `SELECT * FROM users`
    );
    return (users["rows"]);
};

export {
    newUser,
    deleteUser,
    lookupUser,
    allUsers,
};