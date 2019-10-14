import React, { Component } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import ProfileImage from './ProfileImage';
import ProfileLandscape from './ProfileLandscape';
import ProfileInfo from './ProfileInfo';
import NotFound from '../NotFound';
import { constants, fetchApi } from '../../util';

export default class PublicProfile extends Component {
  constructor(props) {
    super(props);
    const session = JSON.parse(localStorage.getItem('usersession'));
    
    this.state = {
      session,
      handle: '',
      email: '',
      profileImage: '',
      landscapeImage: '',
      followerCount: 0,
      followingCount: 0,
      dateJoined: '',
      locationCity: '',
      locationState: '',
      occupation: '',
      employer: '',
      loading: false
    };
  }

  async componentDidMount() {
    console.log('componentDidMount: ', this.props.match.params.handle);
    try {
      this.setState({ loading: true });
      const response = await fetchApi.fetchGet(`/api/user/${this.props.match.params.handle}`, { 'Content-Type': 'application/json' });
      let json;

      if (response.status === 200) {
        json = await response.json();

        console.log('user: ', json);
        const { email, handle, fullName, yipCount, profileImage, landscapeImage, locationCity, locationState, employer, occupation, dateJoined } = json;
        this.setState({ email, handle, fullName, yipCount, profileImage, landscapeImage, locationCity, locationState, employer, occupation, dateJoined });
      } else if (response.status === 404) {
        // user not found in our system, show 404 page
        this.setState({ userNotFound: true });
      } else {
        alert('Error retrieving user profile info. Please try again later.');
        window.location.href = '/';
      }
    } catch (err) {
      console.error('Something bad happened: ', err);
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      this.state.userNotFound ? <NotFound /> : 
        (
        <div>
          <section style={{paddingBottom:'1rem'}}>
            <ProfileLandscape landscapeImage={this.state.landscapeImage} />
            <ProfileInfo {...this.state}>
              <ProfileImage noUpload profileImage={this.state.profileImage || constants.DEFAULT_USER_IMAGE} />
            </ProfileInfo>
          </section>
        
          {/* <Container style={{borderTop:'1px solid #fff', marginTop:'1rem', paddingTop:'2rem'}}>
            <Row>
              <Col sm={12}>
                <EditProfile updateInput={this.updateInput} doProfileUpdate={this.doProfileUpdate} {...this.state} />
              </Col>
            </Row>
          </Container> */}

          {this.state.loading && <LoadingSpinner />}
        </div>
      )
    );
  }
}
