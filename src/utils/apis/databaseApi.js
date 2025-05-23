import { getToken } from '../token';

class DatabaseAPI {
  constructor() {
    this._baseUrl =
      process.env.NODE_ENV === 'production'
        ? 'https://api.what-to-wear.twilightparadox.com'
        : 'http://localhost:3001';
  }

  checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Error: ${res.statusText}`);
  }

  call({ method, endpoint, body }) {
    const options = {
      method,
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${getToken()}`,
      },
    };

    if (body) options['body'] = JSON.stringify(body);

    return fetch(`${this._baseUrl}${endpoint}`, options).then(
      this.checkResponse
    );
  }

  getItems() {
    return this.call({ method: 'GET', endpoint: '/items' });
  }

  createItem({ name, imageUrl, weather }) {
    return this.call({
      method: 'POST',
      endpoint: '/items',
      body: { name, imageUrl, weather },
    });
  }

  deleteItem({ id }) {
    return this.call({
      method: 'DELETE',
      endpoint: `/items/${id}`,
    });
  }

  likeItem({ id }) {
    return this.call({
      method: 'PUT',
      endpoint: `/items/${id}/likes`,
    });
  }

  dislikeItem({ id }) {
    return this.call({
      method: 'DELETE',
      endpoint: `/items/${id}/likes`,
    });
  }
}

const databaseApi = new DatabaseAPI();
export default databaseApi;
