const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
  const token = req.headers.authorization;
  console.log("req.headers", req.headers);
  console.log("token--", token);
  const authHeader = req.headers.authorization;
  jwt.verify(token, "@one", (err, decode) => {
    if (err)
      return res.send({
        message: "Token is not valid please --- login",
        // console.log("Token is not valid please -------------login"),
        status: 2,
      });
    if (decode) {
      req.body.user = decode.userId;
      next();
    } else {
      res.send({
        message: "Token is not valid please login",
        status: 2,
      });
    }
  });
}

module.exports = {
  auth,
};
