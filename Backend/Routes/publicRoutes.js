import express from 'express';
import logger from '../Middleware/logger';

import {
    submitForms,
} from '../Models/forms_result';

const publicRouter = express.Router();

publicRouter.all('/', async (req, res) => {
    res.sendStatus(200);
});

// COPIED FROM AUTH ROUTES
publicRouter.post('/login', async (req, res) => {
    try {
        const { staff_id, password } = req.body;
        if (!staff_id || !password) { return res.sendStatus(400) }
        const staff = await findStaff(staff_id);
        if (!staff) { return res.status(401).send('Account not found') };
        if (staff && !staff.password) { return res.status(401).send('Permission denied') };

        if (await comparePassword(password, staff.password)) {
            const token = jwt.sign({ staff_id: staff.staff_id }, process.env.JWT_SECRET, { expiresIn: '3h' });
            res.cookie('token', token, { httpOnly: true });
            res.status(200).json({ token });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

// COPIED FROM FORMS ROUTES
publicRouter.post('/submit', async (req, res) => {
    try {
        const { uid, form_type, result } = req.body;
        const submitResult = await submitForms(uid, form_type, result);
        res.status(200).json(submitResult);
    } catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
    return res.status(200);
});

export default publicRouter;