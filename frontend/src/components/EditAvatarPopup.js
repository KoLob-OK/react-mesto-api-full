import { useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import useForm from '../hooks/useForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
    // Используем хук useForm для создания объекта
    const { enteredValues, errors, handleChange, isFormValid, resetForm } = useForm();

    //Сброс полей инпутов при открытии попапа
    useEffect(() => {
     resetForm()
    }, []);

    // Обработчик сабмита формы
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: enteredValues.avatar
        });
    }

    return(
        <PopupWithForm
            name="update-avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <fieldset className="form__set">
                <input
                    className="form form__input form__input_type_avatar"
                    type="url"
                    name="avatar"
                    id="avatar"
                    placeholder="Ссылка на картинку"
                    value={enteredValues.avatar}
                    onChange={handleChange}
                    required
                />
                <span id="avatar-error"
                      className="form__input-error">{errors.avatar}</span>

                <button className="form__submit"
                        type="submit"
                        disabled={!isFormValid}>
                    {onLoading ? "Сохранение..." : "Сохранить"}
                </button>
            </fieldset>
        </PopupWithForm>
    );
}

export default EditAvatarPopup