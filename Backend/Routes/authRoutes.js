import jwt from 'jsonwebtoken';
import express from 'express';
import logger from '../Middleware/logger.js';
import dotenv from 'dotenv';
import authMiddleware from '../Middleware/auth.js';

import {
    findStaff,
    registerStaff,
    comparePassword
} from '../Models/auth.js';

import { newStaff, updateStaff } from '../Models/staff.js';


const authRouter = express.Router();
dotenv.config();

authRouter.all("/", async (req, res) => {
    res.sendStatus(200);
});

authRouter.post('/login', async (req, res) => {
    try {
        const { staff_id, password } = req.body;
        if (!staff_id || !password) { return res.sendStatus(400) }
        const staff = await findStaff(staff_id);
        if (!staff) { return res.status(401).send('Account not found') };
        if (staff && !staff.password) { return res.status(401).send('Permission denied') };

        if (await comparePassword(password, staff.password)) {
            const token = jwt.sign({ staff_id: staff.staff_id }, process.env.JWT_SECRET, { expiresIn: '3h' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
            });
            res.status(200).json({ token });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

authRouter.post('/register', authMiddleware, async (req, res) => {
    try {
        const { staff_id, name, surname, nickname, password } = req.body;
        if (!staff_id || !password) { return res.sendStatus(400) }
        const staff = await findStaff(staff_id);
        if (!staff) {
            const createStaff = await newStaff(staff_id, name, surname, nickname);
            const updatePassword = await registerStaff(staff_id, password);
            res.status(200).send(updatePassword)
        } else if (staff && !staff.password) {
            const updatePassword = await registerStaff(staff_id, password);
            res.status(200).send(updatePassword)
        } else {
            res.status(401).send('Account already exists');
        }
    }
    catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

authRouter.get('/check', authMiddleware, async (req, res) => {
    try {
        res.send(jwt.decode(req.cookies.token)).status(200);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

authRouter.all('/logout', authMiddleware, async (req, res) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ token: null });
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

export default authRouter;