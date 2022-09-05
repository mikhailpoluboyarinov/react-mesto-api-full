export default function ImagePopup(props) {
    const { card, onClose, isOpened } = props;

    return (
        <div className={`popup popup_photo${isOpened && " popup_opened"}`}>
            <div className="popup__container-photo">
                <img className="popup__image" src={card.link} alt={card.name} />
                <h2 className="popup__title">{card.name}</h2>
                <button onClick={onClose} className="popup__close-button" type="button" aria-label="Закрыть"></button>
            </div>
        </div>
    )
}