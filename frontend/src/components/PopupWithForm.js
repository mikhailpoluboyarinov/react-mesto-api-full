export default function PopupWithForm (props) {
    const { title, name, submitBtnText, isOpened, onClose, children, onSubmit } = props;

    return (
        <div className={`popup popup_${name}${isOpened ? ' popup_opened' : ''}`}>
            <div className="popup__container">
                <form className={`form popup__form form_${name}`} name={`form_${name}`} onSubmit={onSubmit}>
                    <h2 className="form__title">{title}</h2>

                    {children}

                    <button className="form__save-button popup__button" type="submit">{submitBtnText}</button>
                </form>
                <button onClick={onClose} className="popup__close-button" type="button" aria-label="Закрыть"></button>
            </div>
        </div>
    )
}