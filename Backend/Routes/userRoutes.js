import express from 'express';
import logger from '../Middleware/logger.js';

import { newUser, deleteUser, updateUser, lookupUser, allUsers, getUserID, registerUser, lookupUserByLineID } from '../Models/user.js';

const userRouter = express.Router();

userRouter.all("/", async (req, res) => {
    res.sendStatus(200);
});

//USE USER_ID FOR UID BY DEFAULT

userRouter.post("/new", async (req, res) => {
    try {
        const { uid, line_uid, gender, age, year, email, tel, sos_tel } = req.body;
        const newUserResult = await newUser(uid, line_uid, gender, age, year, email, tel, sos_tel);
        res.status(200).json(newUserResult);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

userRouter.delete("/delete", async (req, res) => {
    try {
        const { uid } = req.body;
        const user = await deleteUser(uid);
        res.status(200).json(user);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

userRouter.put("/update", async (req, res) => {
    try {
        const { uid, gender, age, year, email, tel, sos_tel } = req.body;
        const user = await updateUser(uid, gender, age, year, email, tel, sos_tel)
        res.status(200).json(user);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

userRouter.get("/lookup/:uid", async (req, res) => {
    try {
        const uid = req.params['uid'];
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

// GET USER_ID FROM LINE_UID
userRouter.get("/getID/:uid", async (req, res) => {
    try {
        const uid = req.params['uid'];
        const user = await getUserID(uid);
        res.status(200).send(user["user_id"]);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

// ONLY FOR FRONTEND SUBMISSION, PLEASE USE LINE_UID FOR UID [FRONTEND ONLY]
userRouter.post("/register", async (req, res) => {
    try {
        const { uid, gender, age, year, email, tel, sos_tel } = req.body;
        if (await lookupUserByLineID(uid).length != 0) {
            updateUser(uid, gender, age, year, email, tel, sos_tel)
        } else {
            const newUserResult = await registerUser(uid, gender, age, year, email, tel, sos_tel);
            res.status(200).json(newUserResult);
        }
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

export default userRouter;