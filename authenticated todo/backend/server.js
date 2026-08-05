const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const filePath = path.join(__dirname, "todo.json");
let todoDb = [];
// const data = fs.readFileSync(filePath, "utf-8");

const app = express();
app.use(express.json());
app.use(cors());

//Print todo request
app.get("/print", (req, res) => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    res.json({ todoList: JSON.parse(data) });
  } catch (err) {
    res.json({ msg: "There is no todo present" });
  }
});

//Add todo request
app.post("/add", (req, res) => {
  const data = fs.readFileSync(filePath, "utf-8");
  const todoArr = JSON.parse(data);
  // console.log(todoArr);
  const { title, status } = req.body;
  const todo = {
    title,
    status,
  };
  todoArr.push(todo);
  fs.writeFileSync(filePath, JSON.stringify(todoArr), "utf-8");
  res.json({ msg: "todo added successfully", todoList: todoArr });
});

//Delete todo request
app.delete("/delete", (req, res) => {
  const data = fs.readFileSync(filePath, "utf-8");
  const todoArr = JSON.parse(data);
  const { title } = req.body;

  const newTodoArr = todoArr.filter((todo) => {
    if (todo.title.toLowerCase() == title.toLowerCase()) {
      return false;
    }
    return todo;
  });

  console.log("After deletion:", newTodoArr);

  fs.writeFileSync(filePath, JSON.stringify(newTodoArr), "utf-8");

  res.json({ msg: "todo delted", todoList: newTodoArr });
});

//update todo title request
app.post("/updTitle", (req, res) => {
  const data = fs.readFileSync(filePath, "utf-8");
  const todoArr = JSON.parse(data);

  const { oldTitle, newTitle } = req.body;

  const newTodoArr = todoArr.map((todo) => {
    if (todo.title.toLowerCase() == oldTitle.toLowerCase()) {
      todo.title = newTitle;
    }
    return todo;
  });

  fs.writeFileSync(filePath, JSON.stringify(newTodoArr), "utf-8");
  res.json({ msg: "Title updated succesfully", todoList: newTodoArr });
});

//update todo status request
app.post("/updStatus", (req, res) => {
  const data = fs.readFileSync(filePath, "utf-8");
  const todoArr = JSON.parse(data);

  const { title, status } = req.body;

  newTodoArr = todoArr.map((todo) => {
    if (todo.title.toLowerCase() == title.toLowerCase()) {
      todo.status = status;
    }
    return todo;
  });

  fs.writeFileSync(filePath, JSON.stringify(newTodoArr), "utf-8");
  res.json({ msg: "status updated successfully", todoList: newTodoArr });
});

app.listen("8080", () => {
  console.log("Server is listening at port 8080");
});
