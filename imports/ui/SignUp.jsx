import React, { useState } from "react";
import LoginForm from "./LoginForm";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //   function handleValueChange(e) {
  //     const {
  //       target: { value, name },
  //     } = e;
  //     if (name === username) {
  //       setUsername(value);
  //     } else if (name === "password") {
  //       setPassword(value);
  //     } else {
  //       // other code.
  //     }
  //   }

  function handleRegister(e) {
    e.preventDefault();
    Accounts.createUser({ username: username, password: password }, (error) => {
      console.log(error);
      // if not error
      // After register code goes here
      setUsername("");
      setPassword("");
    });
  }

  return (
    <div>
      <form>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="usernameHelp"
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            value={password}
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
            id="exampleInputPassword1"
            placeholder="Password"
          />
        </div>
        <button
          type="submit"
          onClick={handleRegister}
          className="btn btn-danger"
        >
          Register
        </button>
      </form>
      <br /> <br />
      <LoginForm />
    </div>
  );
};

export default SignUp;
