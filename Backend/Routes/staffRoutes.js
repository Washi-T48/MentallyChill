import express from 'express';
import logger from '../Middleware/logger.js';

import { newStaff, deleteStaff, updateStaff, lookupStaff, allStaffs } from '../Models/staff.js';

const staffRouter = express.Router();

staffRouter.all('/', async (req, res) => {
    res.sendStatus(400);
});

staffRouter.post('/new', async (req, res) => {
    try {
        const { name, surname, nickname, description } = req.body;
        const newStaffResult = await newStaff(name, surname, nickname, description);
        res.status(200).json(newStaffResult);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

staffRouter.delete('/delete', async (req, res) => {
    try {
        const { staff_id } = req.body;
        const staff = await deleteStaff(staff_id);
        res.status(200).json(staff);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

staffRouter.put('/update', async (req, res) => {
    try {
        const { staff_id, name, surname, nickname, description } = req.body;
        const staff = await updateStaff(staff_id, name, surname, nickname, description);
        res.status(200).json(staff);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

staffRouter.get('/lookup/:staff_id', async (req, res) => {
    try {
        const staff_id = req.params['staff_id'];
        const staff = await lookupStaff(staff_id);
        res.status(200).json(staff);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

staffRouter.get('/all', async (req, res) => {
    try {
        const staffs = await allStaffs();
        res.status(200).json(staffs);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

export default staffRouter;