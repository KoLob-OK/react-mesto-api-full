import { useEffect } from 'react';

import PopupWithForm from './PopupWithForm';

import useForm from '../hooks/useForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
    // Используем хук useForm для создания объекта
    const { enteredValues, errors, handleChange, isFormValid, resetForm } = useForm();

    //Сброс полей инпутов при открытии попапа
    useEffect(() => {
        resetForm();
    }, [resetForm, isOpen]);

    // Обработчик сабмита формы
    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(enteredValues);
    }

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}>
            <fieldset className="form__set">
                <input
                    className="form__input form__input_type_title"
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Название"
                    minLength="2"
                    maxLength="30"
                    value={enteredValues.title || ''}
                    onChange={handleChange}
                    required/>
                <span id="title-error"
                      className="form__input-error">{errors.title}</span>


                <input
                    className="form__input form__input_type_link"
                    type="url"
                    name="link"
                    id="link"
                    placeholder="Ссылка на картинку"
                    value={enteredValues.link || ''}
                    onChange={handleChange}
                    required
                />
                <span id="link-error"
                      className="form__input-error">{errors.link}</span>


                <button className="form__submit"
                        type="submit"
                        disabled={!isFormValid}>
                    {onLoading ? "Сохранение..." : "Создать"}
                </button>

            </fieldset>
        </PopupWithForm>
    )
}

export default AddPlacePopup;