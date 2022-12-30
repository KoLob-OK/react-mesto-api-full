class Api {
    constructor(options) {
        // baseUrl - базовая часть url-адреса запроса
        this._baseUrl = options.baseUrl;
        // headers - заголовки запроса
        this._headers = options.headers;
    }

    // Метод проверки статуса ответа
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`) //ПРОМИС - ОБЕЩАНИЕ
    }

    // Метод получения initialCards с сервера
    // получает начальные карточки с сервера и
    // возвращает промис {Promise} - массив карточек
    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // Метод получения данных пользователя с сервера
    // получает данные текущего пользователя и
    // возвращает промис {Promise} - объект текущего пользователя
    getUserData() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // Метод добавления новой карточки card (объект имеет 2 параметра: name-имя, link-ссылка)
    // возвращает промис {Promise} - объект новой карточки
    addCard({ title, link }) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: title,
                link: link
            })
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // Метод удаления карточки с идентификатором cardID
    // возвращает промис {Promise} - ответ с сервера
    delCard(cardID) {
        return fetch(`${this._baseUrl}/cards/${cardID}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // Метод изменения лайка карточки (имеет 2 свойства: cardID-идентификатор, isLiked-статус)
    // возвращает промис {Promise} - массив новых лайков
    changeLikeCardStatus(cardID, isLiked) {
        return fetch(`${this._baseUrl}/cards/${cardID}/likes`, {
            method: `${!isLiked ? 'DELETE' : 'PUT'}`,
            headers: this._headers
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // Метод изменения данных пользователя data (имеет 2 параметра: username-имя, job-профессия)
    // возвращает промис {Promise} - новый объект пользователя
    changeUserData({ name, about }) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // Метод обновления аватара пользователя (avatar-ссылка на изображение)
    // возвращает промис {Promise} - новый аватар
    updateAvatar({ avatar }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }
}

/*++++++++++++++++++++API+++++++++++++++++++++++*/
const api = new Api({
        baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-50',
        headers: {
            authorization: '3da86922-f76f-47f7-81bc-c1b3b90197e4',
            'Content-Type': 'application/json'
        }
    });

export default api;