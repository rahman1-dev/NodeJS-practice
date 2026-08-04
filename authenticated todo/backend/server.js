const express = require("express");
const cors = require("cors");
// const jwt = require("jsonwebtoken");

let todoDb = [];

const app = express();
app.use(express.json());

//Print todo request
app.get("/todoPrint", (req, res) => {
  res.json({ todoList: todoDb });
});

//Add todo request
app.post("/todoAdd", (req, res) => {
  const { title, status } = req.body;

  const todoObj = { title, status };
  todoDb.push(todoObj);

  res.json({ msg: "Todo added successfully", title, status });
});

//Delete todo request
app.delete("/todoDelete", (req, res) => {
  const { title } = req.body;

  todoDb = todoDb.filter((todoObj) => {
    if (todoObj.title == title) {
      return false;
    } else {
      return true;
    }
  });

  res.json({ todoList: todoDb });
});

//update todo title request
app.post("/todoTitleUpd", (req, res) => {
  const { oldTitle, newTitle } = req.body;

  todoDb = todoDb.map((todoObj) => {
    if (todoObj.title == oldTitle) {
      return { ...todoObj, title: newTitle };
    }
    return todoObj;
  });

  res.json({ msg: "todo title updated successfully", todoDb });
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
