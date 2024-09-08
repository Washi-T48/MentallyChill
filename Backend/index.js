import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import https from 'https';
import cors from 'cors';

import publicRouter from './Routes/publicRoutes.js';
import lineRouter from './Routes/lineRoutes.js';
import authRouter from './Routes/authRoutes.js';
import userRouter from './Routes/userRoutes.js';
import staffRouter from './Routes/staffRoutes.js';
import formsRouter from './Routes/formsRoutes.js';
import appointmentRouter from './Routes/appointmentRoutes.js';
import timetableRouter from './Routes/timetableRoutes.js'

import logger, { consoleLogExpress } from './Middleware/logger.js';
import authMiddleware from './Middleware/auth.js';

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: [
        'https://sombat.cc',
        'http://localhost',
        'http://localhost:3000',
        'http://localhost:80',
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

app.use("/", publicRouter);
app.use("/line", lineRouter);
app.use("/auth", authRouter)
app.use("/user", userRouter);
app.use("/staff", staffRouter);
app.use("/forms", formsRouter);
app.use("/appointment", appointmentRouter);
app.use("/timetable", timetableRouter);

// https.createServer({
//     key: fs.readFileSync(path.resolve(__dirname, './certs', 'privkey.pem')),
//     cert: fs.readFileSync(path.resolve(__dirname, './certs', 'cert.pem')),
//     ca: fs.readFileSync(path.resolve(__dirname, './certs', 'chain.pem')),
// }, app).listen(PORT, () => {
//     logger.info(`Server started on port ${PORT}`);
// });

app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
});