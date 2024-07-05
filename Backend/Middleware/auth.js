import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from './logger.js';

dotenv.config();

const authMiddleware = (req, res, next) => {
    // const token = req.cookies.token;
    // if (!token) { return res.sendStatus(401) }

    // try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //     req.user = decoded;
    //     next();
    // } catch (err) {
    //     logger.error(err);
    //     return res.sendStatus(401);
    // }
    next();
};

export default authMiddleware;