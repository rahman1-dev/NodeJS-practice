//CRUD - operations (create,read,update,delete)
const fs = require("fs");
const { program } = require("commander");
const { join } = require("path");
const { json } = require("stream/consumers");

const data = fs.readFileSync("todo.json", "utf8");

//read
const readTodo = () => {
  const data = fs.readFileSync("todo.json", "utf8");
  const result = JSON.parse(data);
  console.log("Todos are:", result);
};
// readTodo();

//create
const createTodo = (title, isDone) => {
  const data = fs.readFileSync("todo.json", "utf8");
  const todoArr = JSON.parse(data);

  const newTodo = {
    title: title,
    isDone: isDone,
  };

  todoArr.push(newTodo);

  fs.writeFileSync("todo.json", JSON.stringify(todoArr), "utf8");
  console.log("todo added---->", title);
};

//delete
const deleteTodo = (title) => {
  const data = fs.readFileSync("todo.json", "utf8");
  const todoArr = JSON.parse(data);

  let deleteIndex = 0;
  const filteredArr = todoArr.filter((todoDet, index) => {
    if (todoDet.tittle.toLowerCase() == title.toLowerCase()) {
      deleteIndex = index;
      return false;
    } else {
      return true;
    }
  });
  filteredArr.splice(deleteIndex, 0, filteredArr);

  fs.writeFileSync("todo.json", JSON.stringify(filteredArr), "utf8");
  console.log(todoArr);
};

// update
const updateTodo = (Old, New) => {};

// //Done
// const doneTodo = (todo_name) => {
//   const data = fs.readFileSync("todo.json", "utf8");
//   const todoArr = JSON.parse(data);

//   const doneTodoList = todoArr.filter((todo) => {
//     if (todo.toLowerCase() == todo_name.toLowerCase()) {
//       return true;
//     } else {
//       return false;
//     }
//   });

//   console.log("Done todos:", doneTodoList);
// };

program
  .name("Todo CLI")
  .description("This CLI helps you to analyze the content in the file")
  .version("1.0.0");

program
  .command("print")
  .description("This will print the todos")
  .action(() => {
    readTodo();
  });

program
  .command("add")
  .description("This command adds todo")
  .argument("<title>", "This argument is simply todo name")
  .argument("<isDone>", "This argument is sayes whether it is completed or not")
  .action((title, isDone) => {
    createTodo(title, isDone);
  });

program
  .command("delete")
  .description("This commmand deletes the todo")
  .argument("<title>", "Argument to delete that todo")
  .action((title) => {
    deleteTodo(title);
  });

// program
//   .command("done")
//   .description("This commmand check the todo as done")
//   .argument("<todo_name>", "Argument to done that todo")
//   .action((todo_name) => {
//     doneTodo(todo_name);
//   });

program
  .command("update")
  .description("This command updates the todo")
  .argument("<old_value>", "This is the previews value to be update")
  .argument("<new_value>", "This is the value you wanted to update")
  .action((old_value, new_value) => {
    updateTodo(old_value, new_value);
  });

program.parse();
