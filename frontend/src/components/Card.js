import { useContext } from "react";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Card (props) {
    const { card, onCardClick, onCardLike, onCardDelete } = props;

    const handleCardClick = () => {
        onCardClick(card);
    }

    const currentUser = useContext(CurrentUserContext);

    const isOwn = card.owner === currentUser._id;

    const isLiked = card.likes.some(item => item === currentUser._id);

    const cardLikeButtonClassName = `element__like-button ${isLiked ? "element__like-button_active" : ''}`;

    const handleDeleteClick = () => {
        onCardDelete(card);
    }

    const handleLikeClick = () => {
        onCardLike(card);
    }

    return (
        <article className="element">
            <img className="element__image" src={card.link} alt={card.name} onClick={handleCardClick} />
            {isOwn ? <button className="element__delete-button" type="button" aria-label="Удаление карточки" onClick={handleDeleteClick}></button> : null}
            <div className="element__info">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like">
                    <button className={cardLikeButtonClassName} type="button" aria-label="Мне нравится" onClick={handleLikeClick}></button>
                    <span className="element__likes-count">{card.likes.length}</span>
                </div>
            </div>
        </article>
    )
}