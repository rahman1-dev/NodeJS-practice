import { useEffect, useState } from "react";
import "./App.css";
import TodoApp from "./components/TodoApp";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState();

  const fetchTodo = async () => {
    const response = await axios
      .get("http://localhost:8080/print")
      .then((res) => setTodos(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchTodo();
  });

  // console.log(todos);
  return (
    <div>
      <TodoApp todos={todos} />
    </div>
  );
}

export default App;
