import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

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

const corsOptions = {
    origin: [
        'http://localhost',
        'http://localhost:3000',
        'http://localhost:5173',
        'http://ligma.sombat.cc',
        'http://ligma.sombat.cc:3000',
        'http://ligma.sombat.cc:5173',
        'http://together-hardy-dove.ngrok-free.app',
        'https://together-hardy-dove.ngrok-free.app',
    ],
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(consoleLogExpress);
app.use(express.urlencoded({ extended: true }));

app.all("/", (req, res) => {
    res.sendStatus(200)
});

app.use("/auth", authRouter)
app.use("/user", authMiddleware, userRouter);
app.use("/staff", authMiddleware, staffRouter);
app.use("/forms", authMiddleware, formsRouter);
app.use("/appointment", authMiddleware, appointmentRouter);
app.use("/timetable", authMiddleware, timetableRouter);

app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
});