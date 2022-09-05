import { useState } from "react";

export default function Login(props) {
    const { handleLogin } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = (evt) => {
        setEmail(evt.target.value);
    }

    const handleChangePassword = (evt) => {
        setPassword(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        handleLogin({
            email,
            password,
        });
    }

    return (
        <div className="auth">
            <h2 className="auth__title">Вход</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <label className="auth__form-field">
                    <input
                        className="auth__text"
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        minLength="2"
                        maxLength="40"
                        required
                        onChange={handleChangeEmail}
                    />
                </label>
                <label className="auth__form-field">
                    <input
                        className="auth__text"
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Пароль"
                        minLength="8"
                        maxLength="40"
                        required
                        onChange={handleChangePassword}
                    />
                </label>
                <button className="auth__save-button" type="submit">
                    Войти
                </button>
            </form>
        </div>
    )
}