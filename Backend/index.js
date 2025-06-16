import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import https from "https";
import cors from "cors";

import publicRouter from "./Routes/publicRoutes.js";
import logRouter from "./Routes/logRoutes.js";
import lineRouter from "./Routes/lineRoutes.js";
import authRouter from "./Routes/authRoutes.js";
import userRouter from "./Routes/userRoutes.js";
import staffRouter from "./Routes/staffRoutes.js";
import formsRouter from "./Routes/formsRoutes.js";
import appointmentRouter from "./Routes/appointmentRoutes.js";
import timetableRouter from "./Routes/timetableRoutes.js";
import exportRouter from "./Routes/exportRoutes.js";

import logger, { consoleLogExpress } from "./Middleware/logger.js";
import fs from "fs";

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: [
    "http://localhost",
    "http://localhost:80",
    "http://localhost:3000",
    "https://mindcra.com",
    "https://www.mindcra.com",
    "https://mindcra.com:444",
    "https://www.mindcra.com:3000",
    "http://localhost:444",
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(consoleLogExpress);
app.use(express.urlencoded({ extended: true }));

app.use("/", publicRouter);
app.use("/log", logRouter);
app.use("/line", lineRouter);
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/staff", staffRouter);
app.use("/forms", formsRouter);
app.use("/appointment", appointmentRouter);
app.use("/timetable", timetableRouter);
app.use("/export", exportRouter);

https
  .createServer(
    {
      key: fs.readFileSync(
        `/etc/letsencrypt/live/mindcra.com-0001/privkey.pem`
      ),
      cert: fs.readFileSync(`/etc/letsencrypt/live/mindcra.com-0001/cert.pem`),
      ca: fs.readFileSync(`/etc/letsencrypt/live/mindcra.com-0001/chain.pem`),
    },
    app
  )
  .listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
  });
