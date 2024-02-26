const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const User = require("../models/user");
const dotenv = require("dotenv");

dotenv.config();

const PASS_SEC = process.env.PASS_SEC || "";
const register = async (req, res) => {
  const newUser = new User({
    // fullname: req.body.fullname,
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(req.body.password, PASS_SEC).toString(),
  });

  try {
    const savedUser = await newUser.save();
    return res.status(201).json(savedUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    // console.log(user);

    if (!user) {
      return res.status(401).json("Wrong User Name");
    }

    const hashedPassword = CryptoJS.AES.decrypt(user.password, PASS_SEC);

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    if (originalPassword != inputPassword) {
      return res.status(401).json("Wrong Password");
    }

    const JWT_SEC = process.env.JWT_SEC || "";
    const accessToken = jwt.sign(
      {
        id: user._id,
        // isAdmin: user.isAdmin,
      },
      JWT_SEC,
      { expiresIn: "3h" }
    );

    const { password, ...others } = user._doc;
    // console.log(user._doc);
    return res.status(200).json({ ...others, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { register, login };
