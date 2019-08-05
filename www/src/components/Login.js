import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  updateInput(e) {
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  async doLogin() {
    const email = this.state.email;
    const password = this.state.password;

    try {
      const response = await fetch('http://localhost:3002/auth/login', { 
        method: 'POST', 
        headers: {
          //'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      let json;

      if (response.status === 401) {
        json = { msg: 'Email or password is incorrect.' };
      } else {
        json = await response.json();
      }
      
      console.log('json is: ', json);
      localStorage.setItem('usersession', JSON.stringify(json));

    } catch (err) {
      console.error('Something bad happened: ', err);
    }
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <input type="email" name="email" className="form-control" value={this.state.email} onChange={(e) => this.updateInput(e)} placeholder="Email" />
        </div>

        <div className="form-group">
          <input type="password" name="password" className="form-control" value={this.state.password} onChange={(e) => this.updateInput(e)} placeholder="Password" />
        </div>

        <div className="form-group">
          <button id="login-button" type="button" onClick={() => this.doLogin()}>Log In!</button>
        </div>
      </form>
    );
  }
  
}

export default Login;
