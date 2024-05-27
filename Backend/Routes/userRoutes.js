import express from 'express';
import logger from '../Middleware/logger.js';

import { newUser } from '../Models/user.js';
import { deleteUser } from '../Models/user.js';
import { lookupUser } from '../Models/user.js';
import { allUsers } from '../Models/user.js';

const userRouter = express.Router();

userRouter.post("/new", async (req, res) => {
    const { uid, gender, age, year, email, tel, sos_tel } = req.body;
    try {
        const newUserResult = await newUser(uid, gender, age, year, email, tel, sos_tel);
        res.status(200).json(newUserResult);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

userRouter.delete("/delete", async (req, res) => {
    const { uid } = req.body;
    try {
        const user = await deleteUser(uid);
        res.status(200).json(user);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

userRouter.get("/lookup", async (req, res) => {
    const { uid } = req.body;
    try {
        const user = await lookupUser(uid);
        res.status(200).json(user);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

userRouter.get("/all", async (req, res) => {
    try {
        const users = await allUsers();
        res.status(200).json(users);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

export default userRouter;