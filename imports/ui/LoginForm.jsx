import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

const LoginForm = ({ setAuth, auth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const submit = (e) => {
  //   e.preventDefault();

  //   Meteor.loginWithPassword(
  //     {
  //       username: username,
  //     },
  //     password,
  //     function (error) {
  //       console.log(error.reason);
  //     }
  //   );
  // };

  function handleLogin(e) {
    e.preventDefault();
    Meteor.loginWithPassword({ username: username }, password, (error) => {
      if (error) {
        alert(error.message);
      } else {
        props.setLoggingIn(Meteor.loggingIn());
        window.location.replace("/");
      }
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
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter username"
            name="email"
            required
            onChange={(e) => setUsername(e.target.value.toString())}
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
          className="btn btn-success"
          type="submit"
          onClick={(e) => handleLogin(e)}
        >
          Log In
        </button>
        <span> Create a new account?</span>{" "}
        <span style={{ color: "red" }} onClick={() => setAuth(!auth)}>
          SignUp
        </span>
      </form>
    </div>
  );
};

export default LoginForm;
