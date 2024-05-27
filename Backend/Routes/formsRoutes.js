import express from 'express';
import logger from '../Config/logger.js';

import { newFormResult, deleteFormResult, lookupFormResult, userFormResults, allFormResults } from '../Models/forms_result.js';

const formsRouter = express.Router();

formsRouter.post("/new", async (req, res) => {
    try {
        const { uid, form_id, result } = req.body;
        const newFormResultResult = await newFormResult(uid, form_id, result);
        res.status(200).json(newFormResultResult);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

formsRouter.delete("/delete", async (req, res) => {
    try {
        const { result_id } = req.body;
        const formResult = await deleteFormResult(result_id);
        res.status(200).json(formResult);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

formsRouter.get("/lookup", async (req, res) => {
    try {
        const { result_id } = req.body;
        const formResult = await lookupFormResult(result_id);
        res.status(200).json(formResult);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

formsRouter.get("/user", async (req, res) => {
    try {
        const { uid } = req.body;
        const formResults = await userFormResults(uid);
        res.status(200).json(formResults);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

formsRouter.get("/all", async (req, res) => {
    try {
        const formResults = await allFormResults();
        res.status(200).json(formResults);
    }
    catch (error) {
        logger.error(error);
        res.sendStatus(500);
    }
});

export default formsRouter;