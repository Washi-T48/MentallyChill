import express from 'express';
import logger from '../Middleware/logger.js';
import multer from 'multer';

import { newStaff, deleteStaff, updateStaff, lookupStaff, allStaffs, listStaffs, } from '../Models/staff.js';

const staffRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });


staffRouter.all('/', async (req, res) => {
    res.sendStatus(200);
});

staffRouter.post('/new', upload.single('image'), async (req, res) => {
    try {
        const { staff_id, name, surname, nickname, password } = req.body;
        const image = req.file.buffer.toString('base64');

        const newStaffResult = await newStaff(staff_id, name, surname, nickname, image, password);
        res.status(200).json(newStaffResult);
    } catch (error) {
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

staffRouter.put('/update', upload.single('image'), async (req, res) => {
    try {
        const { staff_id, name, surname, nickname, description, permission} = req.body;
        const image = req.file ? req.file.buffer.toString('base64') : null;
        const staff = await updateStaff(staff_id, name, surname, nickname, description, image, permission);
        res.status(200).json(staff);
    } catch (error) {
        console.error('Update Staff Error:', error);
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
        const staffs = await listStaffs();
        res.status(200).json(staffs);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

export default staffRouter;