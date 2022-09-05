export class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    setHeaders(headers) {
        this._headers = {
            ...this._headers,
            ...headers
        };
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    _getData(suffix) {
        return fetch(this._baseUrl + suffix, {
            headers: this._headers
        })
            .then((res) => this._checkResponse(res))
    }

    _patchData(suffix, data) {
        return fetch(this._baseUrl + suffix, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then((res) => this._checkResponse(res))
    }

    _postData(suffix, data) {
        return fetch(this._baseUrl + suffix, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then((res) => this._checkResponse(res))
    }

    _deleteData(suffix) {
        return fetch(this._baseUrl + suffix, {
            method: 'DELETE',
            headers: this._headers
        })
            .then((res) => this._checkResponse(res))
    }

    _putData(suffix) {
        return fetch(this._baseUrl + suffix, {
            method: 'PUT',
            headers: this._headers
        })
            .then((res) => this._checkResponse(res))
    }

    getUserInfo() {
        return this._getData('/users/me');
    }

    getInitialCards() {
        return this._getData('/cards');
    }

    patchUserInfo(data) {
        return this._patchData('/users/me', data);
    }

    patchUserAvatar(data) {
        return this._patchData('/users/me/avatar', data);
    }

    postNewCard(data) {
        return this._postData('/cards', data);
    }

    deleteCard(cardId) {
        return this._deleteData('/cards/' + cardId);
    }

    putLike(cardId) {
        return this._putData('/cards/' + cardId + '/likes');
    }

    deleteLike(cardId) {
        return this._deleteData('/cards/' + cardId + '/likes');
    }
}

const token = localStorage.getItem('token');

export const api = new Api({
    baseUrl: 'https://api.mestompoluboyarinov.students.nomoredomains.sbs',
    headers: {
        'Content-Type': 'application/json',
        "Authorization" : token ? `Bearer ${token}` : ''
    }
});