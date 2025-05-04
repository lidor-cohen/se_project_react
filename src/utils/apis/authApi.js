class AuthAPI {
  constructor() {
    this._baseUrl = 'http://localhost:3001';
  }

  checkResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(`Error: ${res.statusText}`);
  }

  call({ method, endpoint, headers = {}, body }) {
    const options = {
      method,
      headers: {
        'content-type': 'application/json',
        ...headers,
      },
    };

    if (body) options['body'] = JSON.stringify(body);

    return fetch(`${this._baseUrl}${endpoint}`, options).then(
      this.checkResponse
    );
  }

  login({ email, password }) {
    return this.call({
      method: 'POST',
      endpoint: '/signin',
      body: {
        email,
        password,
      },
    });
  }

  signup({ name, email, password, avatar }) {
    return this.call({
      method: 'POST',
      endpoint: '/signup',
      body: {
        email,
        password,
        name,
        avatar,
      },
    });
  }

  getUser({ token }) {
    return this.call({
      method: 'GET',
      endpoint: '/users/me',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const authApi = new AuthAPI();
export default authApi;
