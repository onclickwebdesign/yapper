import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { AuthForm, MaterialInput } from '../styled';
import { AuthAPI } from '../../util';
import Logo from '../Logo';

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

  updateInput = (event) => {
    const { name, value } = event.target;
    this.setState({[name]: value});
  }

  doRegister = async () => {
    const fullName = this.state.fullName;
    const handle = this.state.handle;
    const email = this.state.email;
    const password = this.state.password;

    try {
      const response = await AuthAPI.doRegister(fullName, handle, email, password);
      let json;
      if (response.status === 201) {
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
      <AuthForm>
        <Link to="/" style={{color:'#fff'}}><Logo style={{margin:'0 auto 2rem', textAlign:'center', width:35, fontSize:'2.75rem'}} /></Link>
        <h3 style={{marginBottom:'1rem'}}>Create your account</h3>
        <div className="form-group">
          <MaterialInput type="text" name="fullName" className="form-control" value={this.state.fullName} onChange={this.updateInput} placeholder="Full Name" />
        </div>

        <div className="form-group">
          <MaterialInput type="text" name="handle" className="form-control" value={this.state.handle} onChange={this.updateInput} placeholder="Handle" />
        </div>

        <div className="form-group">
          <MaterialInput type="email" name="email" className="form-control" value={this.state.email} onChange={this.updateInput} placeholder="Email" />
        </div>

        <div className="form-group">
          <MaterialInput type="password" name="password" className="form-control" value={this.state.password} onChange={this.updateInput} placeholder="Password" />
        </div>

        <div className="form-group">
          <button style={{marginTop:'1rem'}} className="btn btn-primary yapper-btn-primary" type="button" onClick={this.doRegister}>Join</button>
        </div>

        <small style={{position:'absolute',right:'2rem',bottom:'3rem'}}>Already have an account? <Link to="/login">Sign in</Link>.</small>
      </AuthForm>
    );
  }
  
}

export default Register;
