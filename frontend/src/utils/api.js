class Api {
  constructor({ address, token }) {
    this._address = address;
    this._token = token;
  }

  _handleResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getProfileInfo() {
    return fetch(`${this._address}/users/me`, {
      credentials: 'include',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json',
      },
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      credentials: 'include',
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  setProfileInfo({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._handleResponse);
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._handleResponse);
  }

  addCard({ name, link }) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        authorization: this._token,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this._handleResponse);
  }

  removeCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        authorization: this._token,
      },
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(id, isLiked) {
  return fetch(`${this._address}/cards/likes/${id}`, {
    method: isLiked  ? 'DELETE' : 'PUT',
    credentials: 'include',
    headers: {
      authorization: this._token,
    },
  }).then(this._handleResponse);
}
}

const api = new Api({
  address: 'https://mesto.nomoreparties.co/v1/cohort-22',
  token: '239868fa-70b9-49a6-a5c6-22cb2b6196e6',
});

export default api;
