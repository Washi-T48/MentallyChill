import pool from '../Config/db.js';

const newTimeTable = async (staff_id, date, time_start, time_end) => {
    const timerange = "[" + String(date) + " " + String(time_start) + ", " + String(date) + " " + String(time_end) + "]";
    const newTimeTable = await pool.query(
        `INSERT INTO timetable (staff_id, time_range) VALUES($1, $2) RETURNING *`,
        [staff_id, timerange]
    );
    return (newTimeTable["rows"][0]);
};

const getTimeTable = async (timetable_id) => {
    const timeTable = await pool.query(
        `SELECT *, left(lower(time_range)::varchar, 10) as date, lower(time_range)::time as time_start, upper(time_range)::time as time_end FROM timetable WHERE timetable_id = $1 ORDER BY time_range DESC`,
        [timetable_id]
    );
    return (timeTable["rows"]);
};

const deleteTimeTable = async (timetable_id) => {
    const timeTable = await pool.query(
        `DELETE FROM timetable WHERE timetable_id = $1`,
        [timetable_id]
    );
    return (timeTable["rows"][0])
};

const getTimetableByStaffID = async (staff_id) => {
    const timeTable = await pool.query(
        `SELECT *, left(lower(time_range)::varchar, 10) as date, lower(time_range)::time as time_start, upper(time_range)::time as time_end FROM timetable WHERE staff_id = $1 ORDER BY time_range DESC`,
        [staff_id]
    );
    return (timeTable["rows"]);
};

const getTimetableByDate = async (date) => {
    const timetable = await pool.query(
        `SELECT *, left(lower(time_range)::varchar, 10) as date, lower(time_range)::time as time_start, upper(time_range)::time as time_end FROM timetable WHERE timetable.time_range::date = $1 ORDER BY time_range DESC`,
        [date]
    );
    return (timetable["rows"]);
};

const allTimetable = async () => {
    const timetables = await pool.query(
        `SELECT *, left(lower(time_range)::varchar, 10) as date, lower(time_range)::time as time_start, upper(time_range)::time as time_end FROM timetable ORDER BY time_range DESC`
    );
    return (timetables["rows"]);
}

const checkStaffAvailable = async (staff_id, date, time_start, time_end) => {
    const timetable = await pool.query(
        `SELECT *, left(lower(time_range)::varchar, 10) as date, lower(time_range)::time as time_start, upper(time_range)::time as time_end FROM timetable WHERE staff_id = $1 AND time_range @> $2::tsrange`,
        [staff_id, "[" + date + " " + time_start + ", " + date + " " + time_end + "]"]
    );
    return (timetable["rows"]);
}

const getStaffTimeByDate = async (staff_id, date) => {
    const timetable = await pool.query(
        `SELECT *, left(lower(time_range)::varchar, 10) as date, lower(time_range)::time as time_start, upper(time_range)::time as time_end FROM timetable WHERE staff_id = $1 AND left(lower(time_range)::varchar, 10) = $2`,
        [staff_id, date]
    );
    return (timetable["rows"]);
}

export {
    newTimeTable,
    getTimeTable,
    deleteTimeTable,
    getTimetableByStaffID,
    getTimetableByDate,
    allTimetable,
    checkStaffAvailable,
    getStaffTimeByDate,
}