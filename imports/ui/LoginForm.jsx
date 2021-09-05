import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const submit = (e) => {
  //   e.preventDefault();

  //   Meteor.loginWithPassword(username, password);
  // };

  function handleLogin(e) {
    e.preventDefault();
    Meteor.loginWithPassword(username, password, (error) => {
      if (error) {
        console.log(error);
      } else {
        props.setLoggingIn(Meteor.loggingIn());
        window.location.replace("/");
      }
    });
  }
  console.log(username, password);

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            value={username}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="usernameHelp"
            placeholder="Enter username"
            name="username"
            required
            onChange={(e) => setUsername(e.target.value)}
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
        <button className="btn btn-success" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
