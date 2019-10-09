import React, { Component } from 'react';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullName: '',
      handle: '',
      email: '',
      password: ''
    };
  }

  updateInput = ({name, value}) => {
    this.setState({[name]: value});
  }

  async doRegister() {
    const fullName = this.state.fullName;
    const handle = this.state.handle;
    const email = this.state.email;
    const password = this.state.password;

    try {
      const response = await fetch('http://localhost:3002/auth/register', { 
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, handle, email, password })
      });

      let json;
      if (response.status === 200) {
        json = await response.json();
        localStorage.setItem('usersession', JSON.stringify(json));
        console.log('json: ', json);
        window.location.href = '/';
      } else {
        console.log('Registration error..');
      }
    } catch (err) {
      console.error('Something bad happened: ', err);
    }
  }

  render() {
    return (
      <form>
        <div className="form-group">
          <input type="text" name="fullName" className="form-control" value={this.state.fullName} onChange={this.updateInput} placeholder="Full Name" />
        </div>

        <div className="form-group">
          <input type="text" name="handle" className="form-control" value={this.state.handle} onChange={this.updateInput} placeholder="Handle" />
        </div>

        <div className="form-group">
          <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.updateInput} placeholder="Email" />
        </div>

        <div className="form-group">
          <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.updateInput} placeholder="Password" />
        </div>

        <div className="form-group">
          <button id="register-button" type="button" onClick={this.doRegister}>Join</button>
        </div>
      </form>
    );
  }
  
}

export default Register;
