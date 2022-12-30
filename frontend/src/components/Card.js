import { useContext } from 'react';

import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    // Текущий пользователь
    const currentUser = useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwner = card.owner._id === currentUser._id;
    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName = "element__del-button";
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
    );

    // Обработчик клика по картинке
    function handleClick() {
        onCardClick(card);
    }

    // Обработчик клика лайка
    function handleLikeClick() {
        onCardLike(card);
    }

    // Обработчик клика корзины
    function handleDeleteClick() {
        onCardDelete(card._id);
    }

    return (
        <li className="element">
            <div className="element__image"
                 style={{backgroundImage: `url(${card.link})`}}
                 alt={card.name}
                 onClick={handleClick}>
            </div>
            <div className="element__wrapper">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__likes">
                    <button className={cardLikeButtonClassName}
                            type="button"
                            aria-label="Нравится"
                            onClick={handleLikeClick}
                    />
                    <span className="element__likes-counter">
                                            {card.likes.length}
                                        </span>
                </div>
            </div>
            {isOwner && <button className={cardDeleteButtonClassName}
                                type="button"
                                aria-label="Удалить"
                                onClick={handleDeleteClick}
                        />
            }
        </li>
    );
}

export default Card;