import express from "express";
import * as dotenv from "dotenv";
import { login, register } from "../controllers/auth";

dotenv.config();

const router = express.Router();

//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);

export default router;
