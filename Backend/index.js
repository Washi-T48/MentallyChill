import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import userRouter from './Routes/userRoutes.js';
import staffRouter from './Routes/staffRoutes.js';
import formsRouter from './Routes/formsRoutes.js';
import appointmentRouter from './Routes/appointmentRoutes.js';

import logger, { consoleLogExpress } from './Middleware/logger.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: "*",
    credentials: true,
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(consoleLogExpress);

app.all("/", (req, res) => {
    res.sendStatus(200)
});

app.use("/user", userRouter);
app.use("/staff", staffRouter);
app.use("/forms", formsRouter);
app.use("/appointment", appointmentRouter);

app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
});