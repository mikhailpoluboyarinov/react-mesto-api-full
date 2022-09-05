import { Link, useLocation } from "react-router-dom";

import logoMesto from "../images/logo-mesto.svg";

export default function Header(props) {
    const { userEmail, onSignOut } = props;

    const location = useLocation();

    return (
        <header className="header">
            <img className="header__logo" src={logoMesto} alt="Логотип" />
            <div className="header__links">
                <p className="header__text header__email">
                    {location.pathname === "/" ? userEmail : ''}
                </p>
                <button className="header__text header__button"
                        onClick={onSignOut}
                >
                    {location.pathname === "/" ? 'Выйти' : ''}
                </button>
                <Link to="sign-up" className="header__text header__link">
                    {location.pathname === "/sign-in" ? 'Регистрация' : ''}
                </Link>
                <Link to="sign-in" className="header__text header__link">
                    {location.pathname === "/sign-up" ? 'Войти' : ''}
                </Link>
            </div>
        </header>
    )
}