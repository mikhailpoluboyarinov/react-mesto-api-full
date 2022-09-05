export class ApiAuth {
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

    _postData(suffix, data) {
        return fetch(this._baseUrl + suffix, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify(data)
        })
            .then((res) => this._checkResponse(res))
    }

    _getData(suffix) {
        return fetch(this._baseUrl + suffix, {
            headers: this._headers
        })
            .then((res) => this._checkResponse(res))
    }

    registerUser(data) {
        return this._postData('/signup', data);
    }

    loginUser(data) {
        return this._postData('/signin', data);
    }

    getUserInfo() {
        const userId = localStorage.getItem('userId');

        return this._getData(`/users/${userId}`);
    }
}

const token = localStorage.getItem('token');

export const apiAuth = new ApiAuth({
    baseUrl: 'https://api.mestompoluboyarinov.students.nomoredomains.sbs',
    headers: {
        'Content-Type': 'application/json',
        "Authorization" : token ? `Bearer ${token}` : ''
    }
});