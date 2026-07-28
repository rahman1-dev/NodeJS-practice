const express = require("express");
const app = express();
app.use(express.json());

let todoArr = [
  { title: "go to college", isDone: false },
  { title: "learn node js", isDone: false },
  { title: "do practice", isDone: false },
];

const updateFucn = (oldTodo, newTodo) => {
  let deleteIndex;
  let filteredArr = todoArr.filter((todo, index) => {
    if (todo.title == oldTodo) {
      deleteIndex = index;
      return false;
    } else {
      return true;
    }

    return deleteIndex;
  });

  filteredArr.splice(deleteIndex,0,newTodo)
  filteredArr=todoArr
  console.log(filteredArr)
};

app.get("/todo", (req, res) => {
  res.json({ data: todoArr });
});

app.post("/todo", (req, res) => {
  const newTodo = req.body.todo;

  todoArr.push(newTodo);

  console.log("Todos list is:", todoArr);

  res.json({
    message: "Todo recieved and added successfully",
  });
});

app.put("/todo", (req, res) => {
  let { oldTitle, newTitle } = req.body.data;
  // console.log(oldTitle, newTitle);

  updateFucn(oldTitle,newTitle)

  res.json({
    message: "Todo updated successfully",
  });
});

app.delete("/todo", (req, res) => {
  // console.log(req.body.title);

  let updatedArr = todoArr.filter((todo, index) => {
    if(todo.title==req.body.title){
      return false
    }else{
      return true;
    }
  });
  todoArr=updatedArr
  console.log(todoArr);

  res.json({ message: "deleted successfully" });
});

app.listen("8080", () => {
  console.log("server is listening.....");
});
