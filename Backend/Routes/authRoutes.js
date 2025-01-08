import jwt from 'jsonwebtoken';
import express from 'express';
import logger from '../Middleware/logger.js';
import dotenv from 'dotenv';
import authMiddleware from '../Middleware/auth.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });
import {
    findStaff,
    registerStaff,
    comparePassword,
    changePassword,
    getPermission,
} from '../Models/auth.js';

import {
    newLog,
    allLogs,
    getLog,
    simpleLog
} from '../Models/log.js';

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
            const token = jwt.sign({ staff_id: staff.staff_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.cookie('token', token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
            });
            newLog(staff_id, 'Login', { 'ip': req.headers['x-forwarded-for'], 'expire': token.exp });
            res.status(200).json({ token });
        } else {
            res.sendStatus(401);
        }
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

authRouter.post('/register', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const { staff_id, name, surname, nickname, password } = req.body;
        const image = req.file.buffer.toString('base64');

        if (!staff_id || !password) {
            console.log('Missing staff_id or password');
            return res.sendStatus(400);
        }

        const staff = await findStaff(staff_id);
        if (!staff) {
            const createStaff = await newStaff(staff_id, name, surname, nickname, image);
            const updatePassword = await registerStaff(staff_id, password);
            newLog(staff_id, 'Register', { staff_id, name, surname, nickname });
            res.status(200).send(updatePassword);
        } else {
            res.status(401).send('Account already exists');
        }
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

authRouter.get('/check', authMiddleware, async (req, res) => {
    try {
        res.send(Object.assign(jwt.decode(req.cookies.token), (await getPermission(jwt.decode(req.cookies.token).staff_id)))).status(200);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

authRouter.get('/permission', authMiddleware, async (req, res) => {
    try {
        res.send(await getPermission(jwt.decode(req.cookies.token).staff_id)).status(200);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

authRouter.all('/logout', authMiddleware, async (req, res) => {
    try {
        simpleLog(jwt.decode(req.cookies.token).staff_id, 'Logout');
        res.clearCookie('token');
        res.status(200).json({ token: null });
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

authRouter.post('/changePassword', authMiddleware, async (req, res) => {
    try {
        const { staff_id, password } = req.body;
        const staff = await changePassword(staff_id, password);
        simpleLog(staff_id, 'Change Password');
        res.status(200).json(staff);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

authRouter.post('/updateStaff', authMiddleware, async (req, res) => {
    try {
        const { staff_id, name, surname, nickname } = req.body;
        const staff = await updateStaff(staff_id, name, surname, nickname);
        newLog(staff_id, 'Update', { staff_id, name, surname, nickname });
        res.status(200).json(staff);
    } catch (err) {
        logger.error(err);
        res.sendStatus(500);
    }
});

export default authRouter;