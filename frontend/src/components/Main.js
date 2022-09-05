import { useContext } from "react";

import Card from "./Card";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Main(props) {
    const { onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete } = props;
    const currentUser = useContext(CurrentUserContext);

    return (
        <main>
            <section className="profile">
                <div onClick={onEditAvatar} className="profile__avatar-container">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля"/>
                </div>
                <div className="profile__info-container">
                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button onClick={onEditProfile} className="profile__edit-button" type="button" aria-label="Редактировать профиль"></button>
                    </div>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
                <button onClick={onAddPlace} className="profile__add-button" type="button" aria-label="Добавить карточку"></button>
            </section>
            <section className="elements">
                {cards.map(card =>
                    (
                        <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete}/>
                    )
                )}
            </section>
        </main>
    );
}