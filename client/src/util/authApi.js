const AuthAPI = {
  doLogin: (email, password) => {
    return fetch('/auth/login', { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password })
    });
  },
  doRegister: (fullName, handle, email, password) => {
    return fetch('/auth/register', { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ fullName, handle, email, password })
    });
  }
};

export default AuthAPI;