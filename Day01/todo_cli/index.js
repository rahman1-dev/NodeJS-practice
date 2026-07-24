//CRUD - operations (create,read,update,delete)
const fs = require("fs");

const data = fs.readFileSync("todo.json", "utf8");

//read
const readTodo = () => {
  const data = fs.readFileSync("todo.json", "utf8");
  const result = JSON.parse(data);
  console.log("Todos are:", result);
};
readTodo();

//create
const createTodo = (newTodo) => {
  const data = fs.readFileSync("todo.json", "utf8");
  const result = JSON.parse(data);
  result.push(newTodo);

  fs.writeFileSync("todo.json", JSON.stringify(result), "utf8");
  console.log("todo added succesfully------>", newTodo);
};
// createTodo("go to market");

//delete
const deleteTodo = (todoName) => {
  const data = fs.readFileSync("todo.json", "utf8");
  const todoArr = JSON.parse(data);

  const filteredArr = todoArr.filter((todo) => {
    if (todo.toLowerCase() === todoName.toLowerCase()) {
      return false;
    } else {
      return true;
    }
  });

  fs.writeFileSync("todo.json", JSON.stringify(filteredArr), "utf8");
  console.log("todo deleted successfully:", todoName);
};
// deleteTodo("go to school");

// update
const updateTodo = (Old, New) => {
  const data = fs.readFileSync("todo.json", "utf8");
  const todoArr = JSON.parse(data);

  let deleteIndex = 0;
  const filteredArr = todoArr.filter((todo, index) => {
    if (todo.toLowerCase() === Old.toLowerCase()) {
      deleteIndex = index;
      return false;
    } else {
      return true;
    }
  });

  filteredArr.splice(deleteIndex, 0, New);

  fs.writeFileSync("todo.json", JSON.stringify(filteredArr), "utf8");
  console.log("Updated existing todo", Old, "to", New);
};
// updateTodo("go to school", "go to friend's house");
