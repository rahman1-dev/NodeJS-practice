const express = require("express");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");

const filePath = path.join(__dirname, "todo.json");

const app = express();
app.use(express.json());
app.use(cors());

async function readDb() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    const todoArr = JSON.parse(data || "[]");
    let changed = false;
    const normalized = todoArr.map((todo) => {
      if (!todo.id) {
        changed = true;
        return {
          ...todo,
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        };
      }
      return todo;
    });
    if (changed) {
      await writeDb(normalized);
    }
    return normalized;
  } catch (err) {
    return [];
  }
}

async function writeDb(todoArr) {
  await fs.writeFile(filePath, JSON.stringify(todoArr, null, 2), "utf-8");
}

//Print todo request
app.get("/print", async (req, res) => {
  try {
    const todoArr = await readDb();
    res.json({ todoList: todoArr });
  } catch (err) {
    res.status(500).json({ error: "Failed to read todos" });
  }
});

//Add todo request
app.post("/add", async (req, res) => {
  try {
    const todoArr = await readDb();
    const { title, status } = req.body;
    if (!title || !title.toString().trim()) {
      return res.status(400).json({ error: "Title is required" });
    }
    const todo = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: title.toString().trim(),
      status: Boolean(status),
    };
    todoArr.push(todo);
    await writeDb(todoArr);
    res.status(201).json({ msg: "todo added successfully", todoList: todoArr });
  } catch (err) {
    res.status(500).json({ error: "Failed to add todo" });
  }
});

//Delete todo request
app.delete("/delete/:id", async (req, res) => {
  try {
    const todoArr = await readDb();
    const id = req.params.id;
    const newTodoArr = todoArr.filter((todo) => todo.id !== id);
    await writeDb(newTodoArr);
    res.json({ msg: "todo deleted", todoList: newTodoArr });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete todo" });
  }
});

//update todo title request
app.patch("/updTitle/:id", async (req, res) => {
  try {
    const todoArr = await readDb();
    const { id } = req.params;
    const { newTitle } = req.body;
    if (!newTitle || !newTitle.toString().trim()) {
      return res.status(400).json({ error: "newTitle is required" });
    }
    const newTodoArr = todoArr.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: newTitle.toString().trim() };
      }
      return todo;
    });
    await writeDb(newTodoArr);
    res.json({ msg: "Title updated successfully", todoList: newTodoArr });
  } catch (err) {
    res.status(500).json({ error: "Failed to update title" });
  }
});

//update todo status request
app.patch("/updStatus/:id", async (req, res) => {
  try {
    const todoArr = await readDb();
    const { id } = req.params;
    const { status } = req.body;
    const newTodoArr = todoArr.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: Boolean(status) };
      }
      return todo;
    });
    await writeDb(newTodoArr);
    res.json({ msg: "Status updated successfully", todoList: newTodoArr });
  } catch (err) {
    res.status(500).json({ error: "Failed to update status" });
  }
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is listening at port ${PORT}`);
});
