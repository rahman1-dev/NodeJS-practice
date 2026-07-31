const express = require("express");
const app = express();
app.use(express.json());

const userDataBase = [];

const generateToken = () => {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  let token = "";

  for (let i = 0; i < 32; i++) {
    token = token + options[Math.floor(Math.random() * options.length)];
  }
  return token;
};

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
    const token = generateToken();
    foundUser.token = token;

    console.log("db check", userDataBase);

    res.json({ msg: "loggedIn successful", token });
  } else {
    res.json({ msg: "Invalid credentials" });
  }

  res.json({ msg: "Signin successful" });
});

PORT = 8080;
app.listen(PORT, () => {
  console.log("Server is listening at port", PORT);
});
