import { useEffect, useRef } from "react";

import PopupWithForm from "./PopupWithForm";

export function EditAvatarPopup (props) {
    const { isOpen, onClose, onUpdateAvatar } = props;
    const avatarLink = useRef();


    //Сбрасываю поле ввода
    useEffect(() => {
        if (isOpen) {
            avatarLink.current.value = '';
        }
    }, [isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateAvatar({
            avatar: avatarLink.current.value
        });
    }

    return (
        <PopupWithForm
            name="update-avatar"
            title="Обновить аватар"
            submitBtnText="Создать"
            isOpened={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="form__field">
                <input className="popup__input form__input form__input_type_link" id="avatar-input" type="url"
                       name="avatar" placeholder="Ссылка на картинку" ref={avatarLink} required />
                <span className="form__error avatar-input-error popup__error"></span>
            </label>
        </PopupWithForm>
    )
}