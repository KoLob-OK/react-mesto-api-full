import React from "react";
import AuthForm from "./AuthForm";

function Login({ onLogin }) {
  function handleSubmit(data) {
    onLogin(data);
  }

  return (
    <div className="login content__login">
      <h2 className="login__title">Вход</h2>
      <AuthForm
          onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Login;
