const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const authMiddleware = (req, res, next) => {
  const { token } = req.headers;

  //Chech in db whether this user is present or not
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  if (payload) {
    //Value chadare payload se nikal ke, apan token banathe waqt payload me user ki id dale the.
    req.userId = payload.id;

    next();
  } else {
    res.json({ msg: "Invalid token" });
  }
};

module.exports = authMiddleware;
