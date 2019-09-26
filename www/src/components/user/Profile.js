import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Profile extends Component {
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
    console.log('componentDidMount');

    if (!this.state.token) {
      console.log('not authorized to view this page...');
    } else {
      try {
        const response = await fetch(`http://localhost:3002/user?id=${this.state.id}`, { 
          method: 'GET', 
          headers: {
            'Authorization': `Token ${this.state.token}`,
            'Content-Type': 'application/json',
          }
        });
  
        let json;
  
        console.log('response is: ', response);
  
        if (response.status === 200) {
          json = await response.json();
        } else {
          json = { msg: 'Error retrieving user profile info.' };
        }

        console.log('json is: ', json);
  
        this.setState({
          handle: json.handle
        });
  
      } catch (err) {
        console.error('Something bad happened: ', err);
      }
    }
  }

  updateInput(e) {
    const newState = {};
    newState[e.target.name] = e.target.value;
    this.setState(newState);
  }

  async doProfileUpdate() {
    const email = this.state.email;
    const handle = this.state.handle;

    try {
      const response = await fetch('http://localhost:3002/user/updateprofile', { 
        method: 'POST', 
        headers: {
          'Authorization': `Token ${this.state.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, handle })
      });
      
      const json = await response.json();
      console.log('update profile json: ', json);
      
    } catch (err) {
      console.error('Something bad happened: ', err);
    }
  }

  render() {
    const greeting = <h1 className="text-center">{ this.state.token ? `Welcome ${this.state.handle}!` : `Unauthorized` }</h1>;
    return (
      <div className="container">
        { greeting }
        <form>
          <div className="form-group">
            <input type="text" name="handle" className="form-control" value={this.state.handle} onChange={(e) => this.updateInput(e)} placeholder="Handle" />
          </div>

          <div className="form-group">
            <input type="email" name="email" className="form-control" value={this.state.email} onChange={(e) => this.updateInput(e)} placeholder="Email" />
          </div>

          <div className="form-group">
            <input type="password" name="password" className="form-control" value="******" readOnly />
            <Link to="/resetpassword">Reset Password</Link>
          </div>

          <div className="form-group">
            <button type="button" onClick={() => this.doProfileUpdate()}>Update Profile Info</button>
          </div>
        </form>
      </div>
      

    );
  }
  
}

export default Profile;
