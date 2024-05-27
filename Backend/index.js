import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import userRouter from './Routes/userRoutes.js';
import appointmentRouter from './Routes/appointmentRoutes.js';

import logger, { consoleLogExpress } from './Middleware/logger.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(consoleLogExpress);

app.all("/", (req, res) => {
    console.log("ALL / ");
    res.sendStatus(200)
});

app.use("/appointment", appointmentRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
});