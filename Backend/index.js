import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';

import auth from './Routes/auth.js';

const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.all("/", (req, res) => {
    console.log("GET /");
    res.sendStatus(200)
});

app.use("/api/auth", auth);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});