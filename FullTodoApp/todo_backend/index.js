const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());

const todoArr = ["go to college"];

const updatefunc = (oldTodo, newTodo) => {
  let deleteIndex;
  const updatedArr = todoArr.filter((todo, index) => {
    if (todo == oldTodo) {
      deleteIndex = index;
      return false;
    } else {
      return true;
    }
  });
  updatedArr.splice(delIndex, 0, newTodo);
  todoArr.push(updatedArr);
  console.log(todoArr);
};

app.get("/todo", (request, response) => {
  response.json({ data: todoArr });
  console.log(todoArr);
});

app.post("/todo", (req, res) => {
  //   console.log(req.body);
  const { todo } = req.body;
  todoArr.push(todo);
});

app.put("/todo", (req, res) => {
    const { oldTodo, newTodo } = req.body;
  //   console.log(oldTodo, newTodo);
  updatefunc(oldTodo, newTodo);

  res.json({ message: "Updated successfully" });
});

app.listen("8080", () => {
  console.log("server is listening on port 8080");
});
