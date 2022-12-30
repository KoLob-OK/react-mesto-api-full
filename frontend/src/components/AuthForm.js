import React from 'react';
import { useLocation } from 'react-router-dom';

import useForm from '../hooks/useForm';

function AuthForm({ onSubmit }) {
    const location = useLocation();
    const { enteredValues, errors, handleChange, isFormValid } = useForm({});

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!enteredValues.email || !enteredValues.password) {
            return;
        }

        onSubmit(enteredValues);
    };

    return (
        <form className="form login__form"
              onSubmit={handleSubmit}
              noValidate>
            <input
                type="email"
                name="email"
                className="login__input"
                placeholder="Email"
                value={enteredValues.email || ""}
                onChange={handleChange}
                required
            />
            <span id="email-error"
                  className="login__input-error">
                {errors.email}
            </span>
            <input
                type="password"
                name="password"
                className="login__input"
                placeholder="Пароль"
                value={enteredValues.password || ""}
                onChange={handleChange}
                minLength={6}
                required
            />
            <span id="password-error"
                  className="login__input-error">
                {errors.password}
            </span>
            <button className="login__submit"
                    type="submit"
                    disabled={!isFormValid}>
                {location.pathname === "/sign-in" ? "Войти" : "Зарегистрироваться"}
            </button>
        </form>
    );
}

export default AuthForm;
