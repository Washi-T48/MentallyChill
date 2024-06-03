import express from "express";
import logger from "../Middleware/logger.js";

import {
  newFormResult,
  deleteFormResult,
  lookupFormResult,
  userFormResult,
  allFormResults,
  submitForms,
} from "../Models/forms_result.js";

const formsRouter = express.Router();

formsRouter.all("/", async (req, res) => {
  res.sendStatus(400);
});

//USE USER_ID FOR UID BY DEFAULT

formsRouter.post("/new", async (req, res) => {
  try {
    const { uid, form_type, result } = req.body;
    const newFormResultResult = await newFormResult(uid, form_type, result);
    res.status(200).json(newFormResultResult);
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
});

formsRouter.delete("/delete", async (req, res) => {
  try {
    const { result_id } = req.body;
    const formResult = await deleteFormResult(result_id);
    res.status(200).json(formResult);
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
});

formsRouter.get("/lookup/:result_id", async (req, res) => {
  try {
    const result_id = req.params["result_id"];
    const formResult = await lookupFormResult(result_id);
    res.status(200).json(formResult);
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
});

formsRouter.get("/user/:uid", async (req, res) => {
  try {
    const uid = req.params["uid"];
    const formResults = await userFormResult(uid);
    res.status(200).json(formResults);
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
});

formsRouter.get("/all", async (req, res) => {
  try {
    const formResults = await allFormResults();
    res.status(200).json(formResults);
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
});

// ONLY FOR FRONTEND SUBMISSION, PLEASE USE LINE_UID FOR UID [FRONTEND ONLY]
formsRouter.post("/submit", async (req, res) => {
  try {
    const { uid, form_type, result } = req.body;
    const submitResult = await submitForms(uid, form_type, result);
    res.status(200).json(submitResult);
  } catch (error) {
    logger.error(error);
    res.sendStatus(500);
  }
  return res.status(200).json({ success: true });
});

export default formsRouter;
