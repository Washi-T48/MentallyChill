import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
const app = express();

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/", (req, res) => {
    res.sendStatus(200)
});