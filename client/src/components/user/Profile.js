import React, { Component } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import LoadingSpinner from '../LoadingSpinner';
import ProfileImage from './ProfileImage';
import ProfileLandscape from './ProfileLandscape';
import ProfileInfo from './ProfileInfo';
import EditProfile from './EditProfile';
import { constants, userApi, fetchApi } from '../../util';

class Profile extends Component {
  constructor(props) {
    super(props);
    const session = JSON.parse(localStorage.getItem('usersession'));

    if (!session.token) {
      alert('You need to be logged in to view this page.');
      window.location.href = '/';
    }
    
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
      loading: false
    };
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const response = await userApi.getUserWithSession(this.state.token);
      let json;

      if (response.status === 200) {
        json = await response.json();

        console.log('user: ', json);
        const { email, handle, fullName, yipCount, profileImage, landscapeImage, locationCity, locationState, employer, occupation, dateJoined } = json;
        this.setState({ email, handle, fullName, yipCount, profileImage, landscapeImage, locationCity, locationState, employer, occupation, dateJoined });
      } else if (response.status === 404) {
        // user not found in our system, so wipe browser session
        localStorage.removeItem('usersession');
        window.location.href = '/';
      } else {
        alert('Error retrieving user profile info. Please try again later.');
        window.location.href = '/';
        json = { msg: 'Error retrieving user profile info.' };
      }
    } catch (err) {
      console.error('Something bad happened: ', err);
    } finally {
      this.setState({ loading: false });
    }
  }

  updateInput = e => {
    const {name, value} = e.target;
    this.setState({ [name]: value });
  }

  doProfileImageUpload = async image => {
    if (image.length > 0) {
      this.setState({ loading: true });
      const imageFile = image[image.length - 1];
      const fd = new FormData();
      fd.set('Content-Type', imageFile.type);
      fd.set('user', imageFile);

      try {
        const response = await fetchApi.fetchPost('/api/user/updateprofilepicture/user', { 'Authorization': `Token ${this.state.token}` }, fd);
        
        const json = await response.json();
        const session = JSON.parse(localStorage.getItem('usersession'));
        session.profileImage = json.profileImage;
        localStorage.setItem('usersession', JSON.stringify(session));
        this.setState({ profileImage: json.profileImage });
      } catch (e) {
        console.error('Error: ', e);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  doLandscapeImageUpload = async image => {
    if (image.length > 0) {
      this.setState({ loading: true });
      const imageFile = image[image.length - 1];
      const fd = new FormData();
      fd.set('Content-Type', imageFile.type);
      fd.set('landscape', imageFile);

      try {
        const response = await fetchApi.fetchPost('/api/user/updateprofilepicture/landscape', { 'Authorization': `Token ${this.state.token}` }, fd);
      
        const json = await response.json();
        this.setState({ landscapeImage: json.landscapeImage });
      } catch (e) {
        console.error('Error: ', e);
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  doProfileUpdate = async () => {
    this.setState({ loading: true });
    const { fullName, email, occupation, employer, locationCity, locationState } = this.state;
    const body = JSON.stringify({ fullName, email, occupation, employer, locationCity, locationState });
    const headers = {
      'Authorization': `Token ${this.state.token}`,
      'Content-Type': 'application/json',
    };
    
    try {
      const response = await fetchApi.fetchPost('/api/user/updateprofile', headers, body);
      const json = await response.json();
      console.log('update profile json: ', json);
    } catch (err) {
      console.error('Something bad happened: ', err);
    } finally {
      this.setState({ loading: false });
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

        {this.state.loading && <LoadingSpinner />}
      </div>
    );
  }
}

export default Profile;
