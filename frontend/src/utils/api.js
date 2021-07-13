class Api {
  constructor({ address, headers }) {
    this._address = address;
    this._headers = headers;
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
      headers: this._headers,
    }).then(this._handleResponse);
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      credentials: 'include',
      headers: this._headers,
    }).then(this._handleResponse);
  }

  setProfileInfo({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: this._headers,
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
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar,
      }),
    }).then(this._handleResponse);
  }

  addCard({ name, link }) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: this._headers,
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
      headers: this._headers,
    }).then(this._handleResponse);
  }

  changeLikeCardStatus(id, isLiked) {
  return fetch(`${this._address}/cards/${id}/likes`, {
    method: isLiked  ? 'DELETE' : 'PUT',
    credentials: 'include',
    headers: this._headers,
  }).then(this._handleResponse);
}
}

const api = new Api({
  address: 'https://api.mesto.front.nomoredomains.monster',
  headers: {
'Content-Type': 'application/json'
}
});

export default api;
