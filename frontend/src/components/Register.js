import { Link } from "react-router-dom";
import AuthForm from "./AuthForm";

function Register({ onRegister }) {
  function handleSubmit(data) {
    onRegister(data);
  }

  return (
    <div className="login content__login">
      <h2 className="login__title">Регистрация</h2>
      <AuthForm
          onSubmit={handleSubmit}
      />
      <p className="login__link-text">
        Уже зарегистрированы?
        <Link className="login__link" to="/sign-in">
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;