import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import https from 'https';

import authRouter from './Routes/authRoutes.js';
import userRouter from './Routes/userRoutes.js';
import staffRouter from './Routes/staffRoutes.js';
import formsRouter from './Routes/formsRoutes.js';
import appointmentRouter from './Routes/appointmentRoutes.js';
import timetableRouter from './Routes/timetableRoutes.js'

import logger, { consoleLogExpress } from './Middleware/logger.js';
import authMiddleware from './Middleware/auth.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(consoleLogExpress);
app.use(express.urlencoded({ extended: true }));

app.all("/", (req, res) => {
    res.sendStatus(200)
});

app.use("/auth", authRouter)
app.use("/user", userRouter);
app.use("/staff", staffRouter);
app.use("/forms", formsRouter);
app.use("/appointment", appointmentRouter);
app.use("/timetable", timetableRouter);

https.createServer({
    key: process.env.SSL_KEY,
    cert: process.env.SSL_CERT,
    ca: process.env.SSL_CA,
}, app).listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
});

// app.listen(PORT, () => {
//     logger.info(`Server started on port ${PORT}`);
// });