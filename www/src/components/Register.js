import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      handle: '',
      email: '',
      password: ''
    };
  }

  updateInput(e) {
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  async doRegister() {
    const handle = this.state.handle;
    const email = this.state.email;
    const password = this.state.password;

    try {
      const result = await fetch('http://localhost:3002/auth/register', { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ handle, email, password })
      });

      const jsonResult = await result.json();

      console.log('jsonResult: ', jsonResult);
    } catch (err) {
      console.error('Something bad happened: ', err);
    }
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <input type="text" name="handle" className="form-control" value={this.state.handle} onChange={(e) => this.updateInput(e)} placeholder="Handle" />
        </div>

        <div className="form-group">
          <input type="email" name="email" className="form-control" value={this.state.email} onChange={(e) => this.updateInput(e)} placeholder="Email" />
        </div>

        <div className="form-group">
          <input type="password" name="password" className="form-control" value={this.state.password} onChange={(e) => this.updateInput(e)} placeholder="Password" />
        </div>

        <div className="form-group">
          <button id="register-button" type="button" onClick={() => this.doRegister()}>Join</button>
        </div>
      </form>
    );
  }
  
}

export default Register;
