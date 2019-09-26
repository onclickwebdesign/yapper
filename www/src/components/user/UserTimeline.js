import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ComposeYip from '../yip/ComposeYip';

class UserTimeline extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      
    };
  }

  async componentDidMount() {
    
  }

  render() {
    return (
      <section id="timeline">
        <nav>
          <ul>
            <li><span className="fa fa-home"></span> Home</li>
            <li><span className="fa fa-hashtag"></span> Explore</li>
            <li><span className="fa fa-bell"></span> Notifications</li>
            <li><span className="fa fa-envelope"></span> Messages</li>
            <li><span className="fa fa-bookmark"></span> Favorites</li>
            <li><span className="fa fa-profile"></span> Profile</li>
          </ul>
        </nav>

        <main>
          <h2>Latest Yips</h2>
          <ComposeYip />
          <div id="feed">
            <h1>See what people are Yappin' about</h1>
            <h4>Join Yapper today.</h4>
            <Link to="/register" className="btn btn-primary yapper-btn-primary">Register</Link>
            
            <Link to="/login" className="btn btn-secondary yapper-btn-primary">Log in</Link>
          </div>
        </main>
      </section>
    );
  }
}

export default UserTimeline;