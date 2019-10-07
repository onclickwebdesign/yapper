import React, { Component } from 'react';
// import { Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
import UserHome from './user/UserHome';
import Main from './Main';
import Footer from './Footer';

class Home extends Component {
  constructor(props) {
    super(props);
    const session = JSON.parse(localStorage.getItem('usersession'));
    console.log('session is: ', session);
    this.state = {
      handle: session ? session.handle : '',
      email: session ? session.email : '',
      token: session ? session.token : false,
      id: session ? session._id: '',
    };
  }

  async componentDidMount() {
    
  }

  render() {
    return (
      this.state.token ? 
        <UserHome {...this.state} /> : 
        (<div><Main /><Footer /></div>)
    );
  }
}

export default Home;