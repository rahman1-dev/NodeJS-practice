const express = require("express");
const app = express();
app.use(express.json());

//Counter using Middleware
let counter = 0;
setInterval(() => {
  counter = 0;
}, 5000);

const requestCounterMiddleware = (req, res, next) => {
  counter++;
  console.log("no. of requested came is:", counter);
  next();
};

//Rate limiter middleware
const requestLimiterMiddleware = (req, res, next) => {
  if (counter < 6) {
    next();
  } else {
    res.status(429).json({
      msg: "limit exeeds",
    });
  }
};

//requestLoggerMiddleware
const requestLoggerMiddleware = (req, res, next) => {
  const data = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString();

  console.log("-----------New Request came-------------");
  console.log("Method of the request is:", req.method);
  console.log("Date:", data);
  console.log("Time:", time);
  next();
  //   console.log();
};

app.use(requestCounterMiddleware);
app.use(requestLimiterMiddleware);
app.use(requestLoggerMiddleware);

app.get("/data", (req, res) => {
  console.log("Middle ware ran");

  res.json({ Msg: "This is the main function" });
});

app.listen("8080", () => {
  console.log("listening.....");
});
