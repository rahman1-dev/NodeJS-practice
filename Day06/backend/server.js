const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());
app.use(cors());

const usersDB = [];
const JWT_SECRET = "saleem loves biryani";

// app.get("/me", (req, res) => {
//   res.json({ msg: "This is get request" });
// });

function authMiddleware(req, res, next) {
  try {
    const { token } = req.headers;

    if (!token) {
      res.json({ msg: "No token provided" });
    }
    const payload = jwt.verify(token, JWT_SECRET);

    if (payload == null) {
      res.json({ msg: "invalid credentials" });
    }

    req.transferData = payload;

    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalide token" });
  }
}

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  // console.log("request receive");
  const user = {
    username,
    email,
    password,
  };

  {
    username.trim() == "" && email.trim() == "" && password.trim() == ""
      ? res.json({ msg: "Enter a value" })
      : usersDB.push(user);
  }
  // usersDB.push(user);

  res.json({
    msg: "SignUp successful",
    data: usersDB,
  });

  //   console.log(usersDB);
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  let foundUser = null;
  foundUser = usersDB.find((userObj) => {
    if (userObj.email == email && userObj.password == password) {
      return true;
    }
  });

  // console.log("founduser is: ", foundUser);

  if (foundUser) {
    const token = jwt.sign({ email: foundUser.email }, JWT_SECRET);
    res.json({ msg: "Signin successful", token: token });
  } else {
    req.json({ msg: "Invalid email and password" });
  }

  // res.json({ msg: "signin successful", token });
});

app.use(authMiddleware);

app.get("/me", (req, res) => {
  const payload = req.transferData;

  // if (!payload) {
  //   res.json({ msg: "There is no payload, you have loged out!" });
  //   return;
  // }

  //calling db to get the data of verified user

  const foundUser = usersDB.find((userObj) => {
    if (userObj.email == payload.email) {
      return true;
    } else {
      return false;
    }
  });

  res.json({ userProfileData: foundUser, payload });
});

const PORT = "8080";
app.listen(PORT, (req, res) => {
  console.log("Server is listening at port", PORT);
});
