class AuthAPI {
  constructor() {
    this._baseUrl = 'http://localhost:3001';
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
}

const authApi = new AuthAPI();
export default authApi;
