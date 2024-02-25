const express = require("express");
const dotenv = require("dotenv");
const { register, login } = require("../controller/auth");

dotenv.config();

const router = express.Router();

//REGISTER
router.post("/register", register);

//LOGIN
router.post("/login", login);

module.exports = router;
