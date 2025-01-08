import express from 'express';
import authMiddleware from '../Middleware/auth.js';

import {
    newLog,
    simpleLog,
    allLogs,
    feLogs,
} from '../Models/log.js';

const logRouter = express.Router();

logRouter.all('/', async (req, res) => {
    res.sendStatus(200);
});

// logRouter.get('/all', async (req, res) => {
//     try {
//         const logs = await allLogs();
//         res.status(200).json(logs);
//     } catch (err) {
//         res.sendStatus(500);
//     }
// });

logRouter.get('/all', authMiddleware, async (req, res) => {
    try {
        const logs = await feLogs();
        res.status(200).json(logs);
    } catch (err) {
        res.sendStatus(500);
    }
});

logRouter.get('/get/:log_id', authMiddleware, async (req, res) => {
    try {
        const log = await getLog(req.params.log_id);
        res.status(200).json(log);
    } catch (err) {
        res.sendStatus(500);
    }
});

export default logRouter;