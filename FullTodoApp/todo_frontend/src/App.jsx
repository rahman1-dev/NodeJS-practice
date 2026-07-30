import { useEffect, useState } from "react";
import "./App.css";
import TodoBox from "./components/TodoBox";

function App() {
  const [input, setInput] = useState("");

  const [todoArr, setTodoArr] = useState([]);

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const submitHandler = () => {
    if (input.trim() == "") {
      return;
    }

    setTodoArr((prevTodos) => [...prevTodos, input]);
    setInput("");
  };

  return (
    <div>
      <h1>Todo Application</h1>
      <input
        onChange={(e) => {
          inputHandler(e);
        }}
        value={input}
        type="text"
        placeholder="Enter todo here"
      />
      <button
        onClick={() => {
          submitHandler();
        }}
      >
        Add
      </button>

      {todoArr.map((todo, index) => {
        return <TodoBox todo={todo} key={index} />;
      })}
      {/* <TodoBox /> */}
    </div>
  );
}

export default App;
