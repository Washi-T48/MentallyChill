import express from 'express';
import logger from '../Middleware/logger.js'

import {
    newTimeTable,
    getTimeTable,
    deleteTimeTable,
    getTimetableByStaffID,
    getTimetableByDate,
    allTimetable,
    checkStaffAvailable,
} from '../Models/timetable.js';

const timetableRouter = express.Router();

timetableRouter.all('/', async (req, res) => {
    res.sendStatus(200);
});

timetableRouter.post('/new', async (req, res) => {
    try {
        const { staff_id, date, time_start, time_end } = req.body;
        const newTimeTableResult = await newTimeTable(staff_id, date, time_start, time_end);
        res.status(200).json(newTimeTableResult);
    }
    catch (error) {
        logger.error(error);
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

export default timetableRouter;