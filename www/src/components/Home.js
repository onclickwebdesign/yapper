import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserTimeline from './user/UserTimeline';

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
      this.state.token ? <UserTimeline /> : 
      <main>
        <section id="yapper-features">
          <ul>
            <li><span className="fa fa-hashtag"></span> Explore trending topics and interesting discussions.</li>
            <li><span className="fa fa-bookmark"></span> Save that intriguing topic for later review with a bookmark.</li> 
            <li><span className="fa fa-at"></span> Share with your friends with the "at username" functionality.</li> 
          </ul>
        </section>

        <section id="yapper-join-login">
          <div>
            <h1>See what people are Yappin' about</h1>
            <h4>Join Yapper today.</h4>
            <Link to="/register" className="btn btn-primary yapper-btn-primary">Register</Link>
            
            <Link to="/login" className="btn btn-secondary yapper-btn-primary">Log in</Link>
          </div>
        </section>
      </main>
    );
  }
}

export default Home;