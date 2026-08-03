import axios from "axios";
import React, { useState } from "react";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postSignUpData = async () => {
    const response = await axios
      .post("http://localhost:8080/signup", {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // const handleInputs = () => {
  //   if (username.trim() == "" && email.trim() == "" && password.trim() == "") {
  //     alert("Please enter a value.");
  //     return;
  //   }
  // };

  return (
    <div>
      <h1>SignUp page</h1>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => {
          setUserName(e.target.value);
        }}
      />
      <br />
      <input
        type="email"
        required
        placeholder="Enter email"
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
          postSignUpData();
        }}
      >
        Signup
      </button>
    </div>
  );
};

export default Signup;
