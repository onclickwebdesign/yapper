import React, { Component } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import ProfileImage from './ProfileImage';
import ProfileLandscape from './ProfileLandscape';
import ProfileInfo from './ProfileInfo';
import EditProfile from './EditProfile';
import constants from '../../util/constants';

class Profile extends Component {
  constructor(props) {
    super(props);
    const session = JSON.parse(localStorage.getItem('usersession'));
    
    this.state = {
      handle: session ? session.handle : '',
      email: session ? session.email : '',
      profileImage: session ? session.profileImage: '',
      landscapeImage: '',
      followerCount: 0,
      followingCount: 0,
      dateJoined: '',
      locationCity: '',
      locationState: '',
      occupation: '',
      employer: '',
      token: session ? session.token : '',
      id: session ? session._id: '',
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
        } else if (response.status === 404) {
          // user not found in our system, so wipe browser session
          localStorage.removeItem('usersession');
          window.location.href = '/';
        } else {
          json = { msg: 'Error retrieving user profile info.' };
        }

        console.log('user; ', json);
        const { email, handle, fullName, yipCount, profileImage, landscapeImage, locationCity, locationState, employer, occupation, dateJoined } = json;
  
        this.setState({ email, handle, fullName, yipCount, profileImage, landscapeImage, locationCity, locationState, employer, occupation, dateJoined });
  
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

  doLandscapeImageUpload = async image => {
    if (image.length > 0) {
      const imageFile = image[image.length - 1];
      const fd = new FormData();
      fd.set('Content-Type', imageFile.type);
      fd.set('profileImage', imageFile);

      const response = await fetch('/api/user/updateprofilelandscape', { 
        method: 'POST', 
        headers: {
          'Authorization': `Token ${this.state.token}`
        },
        body: fd
      });
      
      const json = await response.json();
      this.setState({ landscapeImage: json.landscapeImage });
    }
  }

  doProfileUpdate = async () => {
    const { fullName, email, occupation, employer, locationCity, locationState } = this.state;

    try {
      const response = await fetch('/api/user/updateprofile', { 
        method: 'POST', 
        headers: {
          'Authorization': `Token ${this.state.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, occupation, employer, locationCity, locationState })
      });
      
      const json = await response.json();
      console.log('update profile json: ', json);
      
    } catch (err) {
      console.error('Something bad happened: ', err);
    }
  }

  render() {
    return (
      <div>
        <section>
          <ProfileLandscape landscapeImage={this.state.landscapeImage} doLandscapeImageUpload={this.doLandscapeImageUpload} />
          <ProfileInfo {...this.state}>
            <ProfileImage profileImage={this.state.profileImage || constants.DEFAULT_USER_IMAGE} doProfileImageUpload={this.doProfileImageUpload} />
          </ProfileInfo>
        </section>
      
        <Container style={{borderTop:'1px solid #fff', marginTop:'1rem', paddingTop:'2rem'}}>
          <Row>
            <Col sm={12}>
              <EditProfile updateInput={this.updateInput} doProfileUpdate={this.doProfileUpdate} {...this.state} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Profile;
