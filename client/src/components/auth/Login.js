import React, { Component } from 'react';
import { AuthForm, MaterialInput } from '../styled';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import { AuthAPI } from '../../util';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  updateInput = e => {
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  doLogin = async () => {
    const email = this.state.email;
    const password = this.state.password;

    try {
      const response = await AuthAPI.doLogin(email, password);
      let json;

      if (response.status === 401) {
        json = { msg: 'Email or password is incorrect.' };
      } else {
        json = await response.json();
        localStorage.setItem('usersession', JSON.stringify(json.user));
        window.location.href = json.redirect;
      }
    } catch (err) {
      console.error('Something bad happened: ', err);
    }
  }

  render() {
    return (
      <AuthForm>
        <Link to="/" style={{color:'#fff'}}><Logo style={{margin:'0 auto 2rem', textAlign:'center', width:35, fontSize:'2.75rem'}} /></Link>
        <h3 style={{marginBottom:'1rem'}}>Log in to Yapper</h3>
        <div className="form-group">
          <MaterialInput type="email" name="email" className="form-control" value={this.state.email} onChange={this.updateInput} placeholder="Email" />
        </div>

        <div className="form-group">
          <MaterialInput type="password" name="password" className="form-control" value={this.state.password} onChange={this.updateInput} placeholder="Password" />
        </div>

        <div className="form-group">
          <button style={{marginTop:'1rem'}} className="btn btn-primary yapper-btn-primary" type="button" onClick={this.doLogin}>Log In!</button>
        </div>
      </AuthForm>
    );
  }
}

export default Login;
