const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
// const jwt = require("jsonwebtoken");

const filePath = path.join(__dirname, "todo.json");
let todoDb = [];
const data = fs.readFileSync(filePath, "utf-8");

const app = express();
app.use(express.json());
app.use(cors());

//Print todo request
app.get("/todoPrint", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    res.json({ todoList: JSON.parse(data) });
  } catch (err) {
    res.json({ msg: "There is no todo present" });
  }
});

//Add todo request
app.post("/todoAdd", (req, res) => {
  const data = fs.readFileSync(filePath, "utf-8");
  const todoArr = JSON.parse(data);

  const { title, status } = req.body;

  const todoObj = { title, status };

  todoArr.push(todoObj);

  fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf-8");

  res.json({ msg: "Todo added successfully", data: todoArr });
});

//Delete todo request
app.delete("/todoDelete", (req, res) => {
  const data = fs.readFileSync(filePath, "utf-8");
  let todoArr = JSON.parse(data);

  const { title } = req.body;

  const newTodoArr = todoArr.filter((todoObj) => {
    return todoObj.title !== title;
  });

  fs.writeFileSync(filePath, JSON.stringify(newTodoArr), "utf-8");

  res.json({ todoList: newTodoArr });
});

//update todo title request
app.post("/todoTitleUpd", (req, res) => {
  const data = fs.readFileSync(filePath, "utf-8");
  let todoArr = JSON.parse(data);

  const { oldTitle, newTitle } = req.body;

  newTodoArr = todoArr.map((todoObj) => {
    if (todoObj.title == oldTitle) {
      todoObj.title = newTitle;
    }
    return todoObj;
  });

  fs.writeFileSync(filePath, JSON.stringify(newTodoArr), "utf-8");
  // console.log(todoDb);

  res.json({ msg: "todo title updated successfully", newTodoArr });
});

//update todo status request
app.post("/todoStatusUpd", (req, res) => {
  const { title, status } = req.body;

  todoDb = todoDb.map((todoObj) => {
    if (todoObj.title == title) {
      //   todoObj.status = status;
      return { ...todoObj, status: status };
    }
    return todoObj;
  });

  res.json({ msg: "todo status updated successfully", todoList: todoDb });
});

app.listen("8080", () => {
  console.log("Server is listening at port 8080");
});
