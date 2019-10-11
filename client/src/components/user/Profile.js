import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from 'react-bootstrap';
import ProfileImage from './ProfileImage';

class Profile extends Component {
  constructor(props) {
    super(props);
    const session = JSON.parse(localStorage.getItem('usersession'));
    
    this.state = {
      handle: session ? session.handle : '',
      email: session ? session.email : '',
      profileImage: session ? session.profileImage: '',
      token: session ? session.token : '',
      id: session ? session._id: '',
      imageUploader: ''
    };
  }

  async componentDidMount() {
    if (!this.state.token) {
      console.log('not authorized to view this page...');
    } else {
      try {
        const response = await fetch('/api/user', { 
          method: 'GET', 
          headers: {
            'Authorization': `Token ${this.state.token}`,
            'Content-Type': 'application/json',
          }
        });
  
        let json;
  
        if (response.status === 200) {
          json = await response.json();
        } else {
          json = { msg: 'Error retrieving user profile info.' };
        }
  
        this.setState({
          email: json.email,
          handle: json.handle,
          fullName: json.fullName,
          yipCount: json.yipCount,
          profileImage: json.profileImage
        });
  
      } catch (err) {
        console.error('Something bad happened: ', err);
      }
    }
  }

  updateInput = e => {
    const {name, value} = e.target;
    this.setState({ [name]: value });
  }

  doProfileImageUpload = async image => {
    if (image.length > 0) {
      const imageFile = image[image.length - 1];
      const fd = new FormData();
      fd.set('Content-Type', imageFile.type);
      fd.set('profileImage', imageFile);

      const response = await fetch('/api/user/updateprofilepicture', { 
        method: 'POST', 
        headers: {
          'Authorization': `Token ${this.state.token}`
        },
        body: fd
      });
      
      const json = await response.json();
      this.setState({ profileImage: json.profileImage });
    }
  }

  doProfileUpdate = async () => {
    const email = this.state.email;
    const handle = this.state.handle;

    try {
      const response = await fetch('/api/user/updateprofile', { 
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
    return (
      <Container style={{borderTop:'1px solid #fff', marginTop:'1rem', paddingTop:'2rem'}}>
        <Row>
          <Col sm={3}>
            <ProfileImage profileImage={this.state.profileImage} doProfileImageUpload={this.doProfileImageUpload} />
          </Col>
          <Col sm={9}>
            <form>
              <div className="form-group">
                <input type="text" name="handle" className="form-control" value={this.state.handle} onChange={this.updateInput} placeholder="Handle" />
              </div>

              <div className="form-group">
                <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.updateInput} placeholder="Email" />
              </div>

              <div className="form-group">
                <input type="password" name="password" className="form-control" value="******" readOnly />
                <Link to="/changepassword">Change Password</Link>
              </div>

              <div className="form-group">
                <button type="button" className="btn btn-primary yapper-btn-primary" onClick={this.doProfileUpdate}>Update Profile Info</button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
      
    );
  }
}

export default Profile;
