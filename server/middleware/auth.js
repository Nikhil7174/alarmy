const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  const authHeader = req.headers.token;
  const JWT_SEC = process.env.JWT_SEC || "";
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    // console.log(token);
    jwt.verify(token, JWT_SEC, (err, user) => {
      if (err) return res.status(403).json("Token is not valid!");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
};

module.exports = auth;
