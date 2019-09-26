import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

class Header extends Component {
  constructor(props) {
    super(props);
    const session = JSON.parse(localStorage.getItem('usersession'));
    console.log('session is: ', session);
    this.state = {
      handle: '',
      email: session ? session.user.email : '',
      token: session ? session.user.token : '',
      id: session ? session.user._id: '',
    };
  }

  async componentDidMount() {
    
  }

  render() {
    return (
      <header>
        <img src={logo} className="App-logo" alt="logo" />

        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/profile">Profile</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;