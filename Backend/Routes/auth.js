// import express from 'express';
// import jwt from 'jsonwebtoken';
// import logger from '../Config/logger.js';
// import { createUser, findUserbyUsername, comparePassword } from '../Models/user.js';

// const auth = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET;

// auth.post("/register", async (req, res) => {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({ message: "Username and password required" });
//     }

//     try {
//         if (await findUserbyUsername(username)) {
//             return res.status(400).json({ message: "User already exists" });
//         } else {
//             const user = await createUser(username, password);
//             res.status(201).json(user);
//         }
//     }
//     catch (err) {
//         logger.error(err);
//         res.status(500);
//     }
// });

// auth.post("/login", async (req, res) => {
//     const { username, password } = req.body;
//     if (!username || !password) {
//         return res.status(400).json({ message: "Username and password required" });
//     }

//     try {
//         const user = await findUserbyUsername(username);

//         if (!user) {
//             return res.status(400).json({ message: "User not found" });
//         }

//         if (await comparePassword(password, user.password)) {
//             const token = jwt.sign({ username }, JWT_SECRET);
//             res.cookie("token", token, { httpOnly: true });
//             res.status(200).json({ message: "Login successful" });
//         } else {
//             res.status(401).json({ message: "Incorrect password" });
//         }
//     }
//     catch (err) {
//         logger.error(err);
//         res.sendStatus(500);
//     }
// });

// auth.all("/dbtest", (req, res) => {
    
// });

// export default auth;