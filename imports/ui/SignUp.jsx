import React, { useState } from "react";

const SignUp = ({ setAuth, auth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  function handleRegister(e) {
    e.preventDefault();
    if (passwordAgain !== password) {
      alert("Password doesn't match...");
    } else {
      Accounts.createUser(
        { username: username, password: password },
        (error) => {
          console.log(error);

          setUsername("");
          setPassword("");
        }
      );
    }
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
        <div className="form-group">
          <label for="exampleInputPassword1">Password Again</label>
          <input
            type="password"
            value={passwordAgain}
            className="form-control"
            onChange={(e) => setPasswordAgain(e.target.value)}
            id="exampleInputPassword1"
            placeholder="Please re-white the Password"
          />
        </div>
        <button
          type="submit"
          onClick={handleRegister}
          className="btn btn-danger"
        >
          Register
        </button>
        <span> already have an account? </span>{" "}
        <span style={{ color: "blue" }} onClick={() => setAuth(!auth)}>
          Login
        </span>
      </form>
    </div>
  );
};

export default SignUp;
