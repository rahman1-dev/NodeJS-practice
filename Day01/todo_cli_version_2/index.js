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

  result.map((todoObj, index) => {
    console.log(index + 1, ".", todoObj.title, ": ", todoObj.isDone);
  });
};

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

  // Remove the todo whose title matches
  const filteredArr = todoArr.filter(
    (todo) => todo.title.toLowerCase() !== title.toLowerCase(),
  );

  // Check if no todo was deleted
  if (filteredArr.length === todoArr.length) {
    console.log("Todo not found!");
    return;
  }

  // Save the updated array back to the file
  fs.writeFileSync("todo.json", JSON.stringify(filteredArr));

  console.log("Todo deleted successfully!");
};

// update todo title
const updateTodoTitle = (oldTitle, newTitle) => {
  const data = fs.readFileSync("todo.json", "utf8");
  const todoArr = JSON.parse(data);

  const updatedTitle = todoArr.map((todo) => {
    if (todo.title.toLowerCase() == oldTitle.toLowerCase()) {
      todo.title = newTitle;
    }
    return todo;
  });

  fs.writeFileSync("todo.json", JSON.stringify(updatedTitle));
  console.log(`title updated from ${oldTitle} to -----> ${newTitle}`);
};

//update status of todo (true/false)
const updateTodoStatus = (todoName, status) => {
  const data = fs.readFileSync("todo.json", "utf8");
  const todoArr = JSON.parse(data);

  const updatedTodoArr = todoArr.map((todo) => {
    if (todoName.toLowerCase() == todo.title.toLowerCase()) {
      if (status == "true" || status == "True") {
        status = true;
      }
      todo.isDone = status;
    }
    return todo;
  });

  fs.writeFileSync("todo.json", JSON.stringify(updatedTodoArr));
};

program
  .name("Todo CLI")
  .description("This CLI helps you to analyze the content in the file")
  .version("2.0.0");

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
    if (isDone === "true" || isDone === "True") {
      isDone = true;
    } else {
      isDone = false;
    }
    createTodo(title, isDone);
  });

program
  .command("delete")
  .description("This commmand deletes the todo")
  .argument("<title>", "Argument to delete that todo")
  .action((title) => {
    deleteTodo(title);
  });

program
  .command("updateTodoTitle")
  .description("This command updates the todo title")
  .argument("<old_title>", "This is the previews value to be update")
  .argument("<new_title>", "This is the value you wanted to update")
  .action((old_title, new_title) => {
    updateTodoTitle(old_title, new_title);
  });

program
  .command("updateTodoStatus")
  .description("This command updates the todo status")
  .argument("<title>", "This is the todo's name")
  .argument("<status>", "This is the status of that todo")
  .action((title, status) => {
    updateTodoStatus(title, status);
  });

program.parse();
