import { useContext } from 'react';
import userDefaultAvatar from '../images/user-avatar.png';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content page__content">

            <section className="profile content__profile">
                <div className="profile__card">

                    <div className="profile__avatar">
                        <div className="profile__avatar-img"
                             style={{backgroundImage: `url(${currentUser.avatar || userDefaultAvatar})`}}>
                        </div>
                    </div>

                    <button className="profile__avatar-button"
                            type="button"
                            aria-label="Обновить аватар"
                            onClick={onEditAvatar}
                    />

                    <div className="profile__info">
                        <h1 className="profile__title">{currentUser.name}</h1>
                        <button className="profile__edit-button"
                                type="button"
                                aria-label="Редактировать профиль"
                                onClick={onEditProfile}
                        />
                        <p className="profile__description">{currentUser.about}</p>
                    </div>

                </div>
                <button className="profile__add-button"
                        type="button"
                        aria-label="Добавить фото"
                        onClick={onAddPlace}
                />
            </section>

            <section className="elements content__elements">
                <ul className="elements__list">
                    {cards.map(card => {
                        return (
                            <Card
                                key={card._id}
                                card={card}
                                onCardClick={onCardClick}
                                onCardLike={onCardLike}
                                onCardDelete = {onCardDelete}
                            />
                        )
                    })}
                </ul>
            </section>

        </main>
    );
}

export default Main;