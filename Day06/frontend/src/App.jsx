import { useState } from "react";
import axios from "axios";
import "./App.css";
import Signup from "./components/signup";
import Signin from "./components/Signin";
import Profile from "./components/Profile";

function App() {
  return (
    <div>
      <Signup />
      <hr />
      <Signin />
      <hr />
      <Profile />
    </div>
  );
}

export default App;
