const express = require("express");
const app = express();
app.use(express.json());
const jwt = require("jsonwebtoken");

const JWT_SECRET = "ismail loves biryani";

// [
// {
//     username: "ismail bhai",
//     email: "ismailbhai@gmail.com",
//     password: "i love biryani",
//     token: "2dsfkjads;fijo9r"
// }
// ]

const userDataBase = [];

// const generateToken = () => {
//   let options = [
//     "a",
//     "b",
//     "c",
//     "d",
//     "e",
//     "f",
//     "g",
//     "h",
//     "i",
//     "j",
//     "k",
//     "l",
//     "m",
//     "n",
//     "o",
//     "p",
//     "q",
//     "r",
//     "s",
//     "t",
//     "u",
//     "v",
//     "w",
//     "x",
//     "y",
//     "z",
//     "A",
//     "B",
//     "C",
//     "D",
//     "E",
//     "F",
//     "G",
//     "H",
//     "I",
//     "J",
//     "K",
//     "L",
//     "M",
//     "N",
//     "O",
//     "P",
//     "Q",
//     "R",
//     "S",
//     "T",
//     "U",
//     "V",
//     "W",
//     "X",
//     "Y",
//     "Z",
//     "0",
//     "1",
//     "2",
//     "3",
//     "4",
//     "5",
//     "6",
//     "7",
//     "8",
//     "9",
//   ];

//   let token = "";

//   for (let i = 0; i < 32; i++) {
//     token = token + options[Math.floor(Math.random() * options.length)];
//   }
//   return token;
// };

function authmiddleware(req, res, next) {
  const { token } = req.headers;

  let foundUserObj = null;

  foundUserObj = jwt.verify(token, JWT_SECRET);

  if (foundUserObj == null) {
    res.json({
      msg: "invalid credentials",
    });
  } else {
    req.foundUserName = foundUserObj.username;
    next();
  }
}

app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  const user = { username, email, password };
  userDataBase.push(user);

  res.json({ msg: "Registered successful", data: userDataBase });
});

app.post("/signin", (req, res) => {
  const { email, password } = req.body;

  let foundUser = null;
  foundUser = userDataBase.find((user) => {
    if (user.email == email && user.password == password) {
      return true;
    }
  });

  if (foundUser) {
    // const token = generateToken();
    //Now we are not making tokens manually , we are generating it from JWT library.
    const token = jwt.sign({ username: foundUser.username }, JWT_SECRET);

    res.json({ msg: "loggedIn successful", token });
  } else {
    res.json({ msg: "Invalid credentials" });
  }
});

app.use(authmiddleware);

app.get("/me", (req, res) => {
  const payload = req.username;
  // console.log("payload", payload);
  const foundUserName = req.foundUserName;

  // db call to get user data using foundUserName
  const userObjFromDB = userDataBase.find((userObj) => {
    if (userObj.username === foundUserName) {
      return true;
    }
  });

  res.json({
    data: userObjFromDB,
  });
});

PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is listening at port", PORT);
});
