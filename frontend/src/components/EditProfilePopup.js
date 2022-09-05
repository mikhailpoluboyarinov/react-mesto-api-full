import { useState, useEffect, useContext } from "react";

import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

export function EditProfilePopup (props) {
    const currentUser = useContext(CurrentUserContext);

    const { isOpen, onClose, onUpdateUser } = props;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    const handleChangeName = (evt) => {
        setName(evt.target.value);
    }

    const handleChangeDescription = (evt) => {
        setDescription(evt.target.value);
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="edit"
            title="Редактировать профиль"
            submitBtnText="Сохранить"
            isOpened={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__field">
                <input className="popup__input form__input form__input_type_name" id="name-input" type="text"
                       name="name" value={name || ''} autoComplete="off" minLength="2" maxLength="40"
                       required onChange={handleChangeName}
                />
                <span className="form__error name-input-error popup__error"></span>
            </label>
            <label className="form__field">
                <input className="popup__input form__input form__input_type_profession" id="profession-input"
                       type="text" name="profession" autoComplete="off" value={description || ''}
                       placeholder="Профессия" minLength="2" maxLength="200" required onChange={handleChangeDescription}
                />
                <span className="form__error profession-input-error popup__error"></span>
            </label>
        </PopupWithForm>
    )
}