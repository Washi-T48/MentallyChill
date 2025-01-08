import pool from '../Config/db.js';

const newStaff = async (staff_id, name, surname, nickname, image) => {
    const result = await pool.query(`
        INSERT INTO staff (staff_id, name, surname, nickname, image, permission) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [staff_id, name, surname, nickname, image, permission]
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

// const updateStaff = async (staff_id, name, surname, nickname) => {
//     const staff = await pool.query(
//         `UPDATE staff SET name = $2, surname = $3, nickname = $4 WHERE staff_id = $1 RETURNING *`,
//         [staff_id, name, surname, nickname]
//     );
//     return (staff["rows"][0])
// };

const updateStaff = async (staff_id, name, surname, nickname, description, image) => {
    const fields = [];
    const values = [staff_id];

    if (name) {
        values.push(name);
        fields.push(`name = $${values.length}`);
    }
    if (surname) {
        values.push(surname);
        fields.push(`surname = $${values.length}`);
    }
    if (nickname) {
        values.push(nickname);
        fields.push(`nickname = $${values.length}`);
    }
    if (description) {
        values.push(description);
        fields.push(`description = $${values.length}`);
    }
    if (permission) {
        values.push(permission);
        fields.push(`permission = $${values.length}`);
    }
    if (image) {
        values.push(image);
        fields.push(`image = $${values.length}`);
    }
    if (fields.length === 0) {
        throw new Error('No fields to update');
    }

    const query = `UPDATE staff SET ${fields.join(', ')} WHERE staff_id = $1 RETURNING *`;
    const staff = await pool.query(query, values);
    return staff.rows[0];
};

const lookupStaff = async (staff_id) => {
    const staff = await pool.query(
        `SELECT staff_id, name, surname, nickname, image, description, permission FROM staff WHERE staff_id = $1 ORDER BY created DESC`,
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

// SPECIFICALLY FOR SEMI-PUBLIC USE 

const listStaffs = async () => {
    const staff = await pool.query(
        `SELECT staff_id, name, surname, nickname, image, description, created, permission FROM staff ORDER BY created DESC`
    );
    return (staff["rows"]);
};

export {
    newStaff,
    deleteStaff,
    updateStaff,
    lookupStaff,
    allStaffs,
    listStaffs,
};