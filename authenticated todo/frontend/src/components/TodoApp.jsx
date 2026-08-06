import React from "react";
import TodoDisplayBox from "./TodoDisplayBox";
import { useState } from "react";
import axios from "axios";

const TodoApp = ({ todos }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(false);

  const addTodoFunc = async () => {
    const res = await axios
      .post("http://localhost:8080/add", {
        title,
        status,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const todoList = todos?.data?.todoList ?? []; //This is array
  // console.log(todoList);

  if (!todoList) {
    console.log("Loading todos......");
  }
  return (
    <div>
      <h2>Todo App</h2>
      <div className="flex gap-3 justify-center">
        <input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          type="text"
          placeholder="Enter todo"
          className="bg-white rounded w-[70vw] h-10 placeholder:text-gray-600 text-black pl-3"
        />
        <button
          onClick={() => {
            addTodoFunc();
          }}
          className="bg-green-700 h-10 text-white p-1 rounded"
        >
          Add
        </button>
      </div>

      {todoList.map((todo, index) => {
        return <TodoDisplayBox key={index} todo={todo} />;
      })}
    </div>
  );
};

export default TodoApp;
