import checkedTrue from "../images/checked-true.svg";
import checkedFalse from "../images/checked-false.svg";

export default function InfoTooltip(props) {
    const { registrationComplete, onClose, isOpen } = props;

    let text;
    let image;

    if (registrationComplete) {
        text= 'Вы успешно зарегистрировались!'
        image= checkedTrue
    }
    else {
        text= 'Что-то пошло не так! Попробуйте  еще раз.'
        image= checkedFalse
    }
    return (
        <div className={`tooltip ${isOpen ? "tooltip_opened" : ''}`}>
            <div className="tooltip__container">
                <img src={image} className="tooltip__image" alt="info" />
                <h2 className="tooltip__text">{text}</h2>
                <button
                    className="tooltip__close-button"
                    type="button"
                    onClick={onClose}
                ></button>
            </div>
        </div>
    );
}