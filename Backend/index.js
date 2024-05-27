import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import userRouter from './Routes/userRoutes.js';
import appointmentRouter from './Routes/appointmentRoutes.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.all("/", (req, res) => {
    console.log("ALL / ");
    res.sendStatus(200)
});

app.use("/appointment", appointmentRouter);
app.use("/user", userRouter);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});