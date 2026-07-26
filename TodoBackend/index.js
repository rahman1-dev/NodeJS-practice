const express = require("express");
const app = express();

let todoArr = [
  { title: "go to college", isDone: false },
  { title: "learn node js", isDone: false },
  { title: "do practice", isDone: false },
];

app.use(express.json());

app.get("/todo", (req, res) => {
  res.json({ data: todoArr });
});

app.post("/todo", (req, res) => {
  const newTodo = req.body.todo;

  todoArr.push(newTodo);

  res.json({
    message: "Todo recieved and added successfully",
  });
});

app.listen("8080", () => {
  console.log("server is listening.....");
});
