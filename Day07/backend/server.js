const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("./utils/db.js");
const authMiddleware = require("./middlewares/authMiddleware");

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  const feedback = await UserModel.create({
    username,
    email,
    password,
  });

  //   console.log(feedback);
  res.json({
    msg: "signUp successful",
    feedback,
  });
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  //Check db is this your is registerd or not
  const foundUser = await UserModel.find({ email, password });

  if (foundUser != undefined) {
    const token = jwt.sign(
      { id: foundUser[0]._id.toString() },
      process.env.JWT_SECRET,
    );

    res.json({ msg: "Logged in successful", token });
  } else {
    res.json({ msg: "Invalid credentials" });
  }
});

app.use(authMiddleware);

app.get("/profile", async (req, res) => {
  const userId = req.userId;

  const foundUser = await UserModel.find({ _id:userId });
  res.json({ msg: "Your profile details", foundUser });
});


app.listen("8080", () => {
  console.log("server is listening........");
});
