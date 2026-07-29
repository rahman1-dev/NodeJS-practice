const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

app.get("/sum/:a/:b", (req, res) => {
  const { a, b } = req.params;
  const sum = Number(a) + Number(b);
  res.json({ result: sum });
});

app.get("/sub/:a/:b", (req, res) => {
  const { a, b } = req.params;
  const sum = Number(a) - Number(b);
  res.json({ result: sum });
});

app.get("/mul/:a/:b", (req, res) => {
  const { a, b } = req.params;
  const sum = Number(a) * Number(b);
  res.json({ result: sum });
});

app.get("/div/:a/:b", (req, res) => {
  const { a, b } = req.params;
  const sum = Number(a) / Number(b);
  res.json({ result: sum });
});

app.listen("8080", () => {
  console.log("Server is listening....");
});
