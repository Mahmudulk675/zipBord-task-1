import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignUp from "./SignUp";

const Auth = () => {
  const [auth, setAuth] = useState(true);

  return (
    <div>
      {auth ? (
        <LoginForm setAuth={setAuth} auth={auth} />
      ) : (
        <SignUp setAuth={setAuth} auth={auth} />
      )}
    </div>
  );
};

export default Auth;
