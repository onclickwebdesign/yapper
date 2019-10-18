import React, { Component } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import ProfileImage from './ProfileImage';
import ProfileLandscape from './ProfileLandscape';
import ProfileInfo from './ProfileInfo';
import AuthNotFound from '../AuthNotFound';
import { constants, fetchApi } from '../../util';

export default class PublicProfile extends Component {
  constructor(props) {
    super(props);
    const session = JSON.parse(localStorage.getItem('usersession'));
    
    this.state = {
      session,
      user: {},
      // handle: '',
      // email: '',
      // profileImage: '',
      // landscapeImage: '',
      // followerCount: 0,
      // followingCount: 0,
      // dateJoined: '',
      // locationCity: '',
      // locationState: '',
      // occupation: '',
      // employer: '',
      loading: false
    };
  }

  async componentDidMount() {
    console.log('componentDidMount: ', this.props.match.params.handle);
    try {
      this.setState({ loading: true });
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Token ${this.state.session.token}`
      };
      const response = await fetchApi.fetchGet(`/api/user/${this.props.match.params.handle}`, headers);
      let user;

      if (response.status === 200) {
        user = await response.json();

        console.log('user: ', user);
        this.setState({ user });
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

  doFollow = async isUnfollow => {
    this.setState({ loading: true });
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.state.session.token}`
    };
    const response = await fetchApi.fetchPost(`/api/user/${isUnfollow ? 'un' : ''}follow/${this.state.user.handle}`, headers, null);
    const json = await response.json();
    const newUserState = this.state.user;
    newUserState.followerCount = json.followerCount;
    newUserState.isFollowing = !isUnfollow;
    this.setState({ loading: false, user: newUserState });
  }

  render() {
    return (
      this.state.userNotFound ? <AuthNotFound /> : 
        (
        <div>
          <section style={{paddingBottom:'1rem'}}>
            <ProfileLandscape landscapeImage={this.state.user.landscapeImage} />
            <ProfileInfo {...this.state.user} doFollow={this.doFollow} token={this.state.session.token} publicProfile>
              <ProfileImage noUpload profileImage={this.state.user.profileImage || constants.DEFAULT_USER_IMAGE} />
            </ProfileInfo>
          </section>

          {this.state.loading && <LoadingSpinner />}
        </div>
      )
    );
  }
}
