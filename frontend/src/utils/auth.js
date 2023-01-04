class Auth {
    // baseUrl - базовый url-адрес запроса
    constructor(baseUrl) {
        this._baseUrl = baseUrl;
    }

    // Метод проверки статуса ответа
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    // Метод регистрации пользователя (принимает объект с 2-мя параметрами: email-почта, password-пароль)
    // отправляет объект с данными пользователя {email, password}
    // возвращает промис {Promise} - объект нового пользователя {_id, email}
    register({ email, password }) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // Метод авторизации пользователя (принимает объект с 2-мя параметрами: email-почта, password-пароль)
    // отправляет объект с данными пользователя {email, password}
    // возвращает промис {Promise} - токен пользователя
    authorize({ email, password }) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }

    // Метод проверки токена пользователя (принимает токен)
    // отправляет токен пользователя
    // возвращает промис {Promise} - 2 параметра: _id и email (для вставки в шапку)
    checkUser(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
            .then(res => {
                return this._checkResponse(res)
            });
    }
}

/*++++++++++++++++++++API+++++++++++++++++++++++*/
const auth = new Auth('http://localhost:3000');

export default auth;