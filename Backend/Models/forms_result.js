import pool from "../Config/db.js";

const newFormResult = async (uid, form_id, result) => {
    const newFormResult = await pool.query(
        `INSERT INTO forms_result (user_id, forms_type, result) VALUES($1, $2, $3) RETURNING *`,
        [uid, form_id, result]
    );
    return (newFormResult["rows"][0]);
}

const deleteFormResult = async (result_id) => {
    const formResult = await pool.query(
        `DELETE FROM forms_result WHERE result_id = $1`,
        [result_id]
    );
    return (formResult["rows"][0]);
}

const lookupFormResult = async (result_id) => {
    const formResult = await pool.query(
        `SELECT * FROM forms_result WHERE result_id = $1 ORDER BY created DESC`,
        [result_id]
    );
    return (formResult["rows"]);
}

const userFormResult = async (uid) => {
    const formResults = await pool.query(
        `SELECT * FROM forms_result WHERE user_id = $1 ORDER BY created DESC`,
        [uid]
    );
    return (formResults["rows"]);
}

const allFormResults = async () => {
    const formResults = await pool.query(
        `SELECT * FROM forms_result ORDER BY created DESC`
    );
    return (formResults["rows"]);
}

export {
    newFormResult,
    deleteFormResult,
    lookupFormResult,
    userFormResult,
    allFormResults,
};