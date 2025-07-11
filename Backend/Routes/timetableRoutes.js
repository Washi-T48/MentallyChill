import express from 'express';
import logger from '../Middleware/logger.js'

import {
    newTimeTable,
    getTimeTable,
    deleteTimeTable,
    getTimetableByStaffID,
    allTimetable,
    checkStaffAvailable,
    getStaffTimeByDate,
    checkdupicateTime
} from '../Models/timetable.js';

const timetableRouter = express.Router();

// แปลง "HH:MM" เป็น Date object
function parseTime(dateStr, timeStr) {
    return new Date(`${dateStr}T${timeStr}:00`);
}

// แปลง Date object เป็น "HH:MM"
function formatTime(date) {
    return date.toTimeString().slice(0, 5);
}

function getWeekdaysInMonth(year, month) {
    const dates = [];
    const daysInMonth = new Date(year, month, 0).getDate(); // month is 1-based

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day);
        const dayOfWeek = date.getDay(); // 0=Sunday, 1=Monday, ..., 6=Saturday
        if (dayOfWeek >= 1 && dayOfWeek <= 5) {
            dates.push(date.toISOString().slice(0, 10)); // format YYYY-MM-DD
        }
    }

    return dates;
}

timetableRouter.all('/', async (req, res) => {
    res.sendStatus(200);
});

timetableRouter.post('/new', async (req, res) => {
    try {
        const { staff_id, date, time_start, time_end } = req.body;
        const duplicatecheck = await checkdupicateTime(staff_id, date, time_start, time_end);
        if (!(duplicatecheck.length > 0)) {
            const newTimeTableResult = await newTimeTable(staff_id, date, time_start, time_end);
            res.status(200).json(newTimeTableResult);
        } else {
            res.status(400).send('Timeslot duplicated');
        }
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

timetableRouter.post('/newautosplit', async (req, res) => {
    try {
        const { staff_id, date, time_start, time_end } = req.body;
        const start = parseTime(date, time_start);
        const end = parseTime(date, time_end);
        const intervalMinutes = 30;
        let current = new Date(start);
        const insertedSlots = [];
        while (current < end) {
            const next = new Date(current.getTime() + intervalMinutes * 60000);
            if (next > end) break;
            const slotStart = formatTime(current);
            const slotEnd = formatTime(next);
            const duplicatecheck = await checkdupicateTime(staff_id, date, slotStart, slotEnd);
            if (duplicatecheck.length === 0) {
                const newSlot = await newTimeTable(staff_id, date, slotStart, slotEnd);
                insertedSlots.push(newSlot);
            }
            current = next;
        }
        res.status(200).json({ inserted: insertedSlots, count: insertedSlots.length });
    } catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

timetableRouter.post('/setmonthly', async (req, res) => {
    try {
        const { staff_id, year, month, time_start, time_end } = req.body;

        const weekdays = getWeekdaysInMonth(year, month);
        const intervalMinutes = 30;
        const insertedSlots = [];

        for (const date of weekdays) {
            let current = parseTime(date, time_start);
            const end = parseTime(date, time_end);

            while (current < end) {
                const next = new Date(current.getTime() + intervalMinutes * 60000);
                if (next > end) break;

                const slotStart = formatTime(current);
                const slotEnd = formatTime(next);

                const duplicatecheck = await checkdupicateTime(staff_id, date, slotStart, slotEnd);
                if (duplicatecheck.length === 0) {
                    const newSlot = await newTimeTable(staff_id, date, slotStart, slotEnd);
                    insertedSlots.push(newSlot);
                }

                current = next;
            }
        }

        res.status(200).json({
            inserted_count: insertedSlots.length,
            working_days: weekdays.length,
            inserted_slots: insertedSlots
        });
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

timetableRouter.post('/get', async (req, res) => {
    try {
        const { timetable_id } = req.body;
        const timetable = await getTimeTable(timetable_id);
        res.status(200).json(timetable);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

timetableRouter.get('/all', async (req, res) => {
    try {
        const timetables = await allTimetable()
        res.status(200).json(timetables);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

timetableRouter.delete('/delete', async (req, res) => {
    try {
        const { timetable_id } = req.body;
        const timetable = await deleteTimeTable(timetable_id);
        res.status(200).json(timetable);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

timetableRouter.post('/check', async (req, res) => {
    try {
        const { staff_id, date, time_start, time_end } = req.body;
        const timetable = await checkStaffAvailable(staff_id, date, time_start, time_end);
        res.status(200).json(timetable);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

timetableRouter.post('/getByStaffID', async (req, res) => {
    try {
        const { staff_id } = req.body;
        const timetable = await getTimetableByStaffID(staff_id);
        res.status(200).json(timetable);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

timetableRouter.post('/getStaffTimeByDate', async (req, res) => {
    try {
        const { staff_id, date } = req.body;
        const timetable = await getStaffTimeByDate(staff_id, date);
        res.status(200).json(timetable);
    } catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

timetableRouter.post('/checkDuplicate', async (req, res) => {
    try {
        const { staff_id, date, time_start, time_end } = req.body;
        const timetable = await checkdupicateTime(staff_id, date, time_start, time_end);
        res.status(200).json(timetable);
    } catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

export default timetableRouter;