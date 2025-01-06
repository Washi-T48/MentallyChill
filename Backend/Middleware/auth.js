import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from './logger.js';
import { getPermission } from '../Models/auth.js';

dotenv.config();

export default authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) { return res.sendStatus(401) }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        logger.error(err);
        return res.sendStatus(401);
    }
    // next();
};

export const adminMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) { return res.sendStatus(401) }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        const permission = (await getPermission(decoded.staff_id)).permission;
        if (permission !== 'admin') { return res.sendStatus(401) }
    } catch (err) {
        logger.error(err);
        return res.sendStatus(401);
    }
    // next();
};