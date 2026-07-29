import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("");
  const [result, setResult] = useState(0);

  const getResult = async (num1, num2, operation) => {
    const json = await fetch(
      `http://localhost:8080/${operation}/${num1}/${num2}`,
    );
    const data = await json.json();
    setResult(data.result);
  };

  if (result == null) {
    return (
      <div>
        <h1>Loading.....</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Full stack calculator</h1>
      <div className="result">
        <h2>Result : {result}</h2>
      </div>
      <input
        onChange={(e) => {
          setNum1(e.target.value);
        }}
        type="number"
        placeholder="Enter first no."
        value={num1}
      />
      <br />
      <input
        onChange={(e) => {
          setNum2(e.target.value);
        }}
        type="number"
        placeholder="Enter second no."
        value={num2}
      />
      <br />
      <div className="operations">
        <button
          onClick={() => {
            getResult(num1, num2, "sum");
          }}
        >
          ADD
        </button>
        <button
          onClick={() => {
            getResult(num1, num2, "sub");
          }}
        >
          SUB
        </button>
        <button
          onClick={() => {
            getResult(num1, num2, "mul");
          }}
        >
          MUL
        </button>
        <button
          onClick={() => {
            getResult(num1, num2, "div");
          }}
        >
          DIV
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            setResult("");
            setNum1("");
            setNum2("");
          }}
        >
          CLEAR
        </button>
      </div>
    </div>
  );
}

export default App;
