import axios from "axios";
import React, { useState } from "react";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postSignInData = async () => {
    const response = await axios
      .post("http://localhost:8080/signin", { email, password })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <h1>SignIn</h1>
      <div>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <button
          onClick={() => {
            postSignInData();
          }}
        >
          SignIn
        </button>
      </div>
    </div>
  );
};

export default Signin;
