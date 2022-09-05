import { useEffect, useState } from "react";

import PopupWithForm from "./PopupWithForm";

export function AddPlacePopup (props) {
    const { isOpen, onClose, onAddPlace } = props;
    const [name, setName] = useState('');
    const [link, setLink] = useState('');

    useEffect(() => {
        if (isOpen) {
            setName('');
            setLink('');
        }
    }, [isOpen]);

    function handleChangeName(evt) {
        setName(evt.target.value);
    }

    function handleChangeLink(evt) {
        setLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onAddPlace({
            name,
            link,
        });
    }

    return (
        <PopupWithForm
            name="add_card"
            title="Новое место"
            submitBtnText="Создать"
            isOpened={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__field">
                <input className="popup__input form__input form__input_type_place" id="place-input"
                       type="text" name="name-of-place" placeholder="Название" value={name || ''} minLength="2"
                       maxLength="30" required onChange={handleChangeName}/>
                <span className="form__error place-input-error popup__error"></span>
            </label>
            <label className="form__field">
                <input className="popup__input form__input form__input_type_link" id="link-input" type="url"
                       name="link" placeholder="Ссылка на картинку" value={link || ''} required
                       onChange={handleChangeLink}/>
                <span className="form__error link-input-error popup__error"></span>
            </label>
        </PopupWithForm>
    )

}