import React, { Component } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import MiniProfile from './MiniProfile';
import { fetchApi } from '../../util';
import { Flex } from '../styled';
import styled from 'styled-components';

const ExploreSection = styled.section`
  border-top: 1px solid #fff;
`;

export default class Explore extends Component {
  constructor(props) {
    super(props);

    this.state = { session: JSON.parse(localStorage.getItem('usersession')), loading: false };
  }

  async componentDidMount() {
    console.log('Explore componentDidMount()');
    try {
      this.setState({ loading: true });
      const headers = {
        'Content-Type': 'application/json',
      };

      if (this.state.session.token) {
        headers['Authorization'] = `Token ${this.state.session.token}`;
      }

      const response = await fetchApi.fetchGet('/api/user/explore', headers);
      let users;

      if (response.status === 200) {
        users = await response.json();

        console.log('users: ', users);
        this.setState({ users: users.users });
      } else {
        alert('Error retrieving data for this page. Please reload this page.');
      }
    } catch (err) {
      console.error('Something bad happened: ', err);
    } finally {
      this.setState({ loading: false });
    }
  }

  doFollow = async (isUnfollow, handle) => {
    this.setState({ loading: true });
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Token ${this.state.session.token}`
    };
    const response = await fetchApi.fetchPost(`/api/user/${isUnfollow ? 'un' : ''}follow/${handle}`, headers, null);
    const json = await response.json();

    // todo eric: need to update just the one user in the this.state.users array..
    const newUserState = this.state.users;
    // newUserState.followerCount = json.followerCount;
    // newUserState.isFollowing = !isUnfollow;
    this.setState({ loading: false, users: newUserState });
  }

  render() {
    return (
      <ExploreSection>
        <Flex style={{justifyContent:'space-between'}}>
          {this.state.users ? this.state.users.map((user, i) => <div style={{width:'45%', margin:'1rem'}}><MiniProfile key={`${i}-${user.handle}`} doFollow={this.doFollow} user={user} token={this.state.session ? this.state.session.token : ''} /></div>) : ''}
        </Flex>

        {this.state.loading && <LoadingSpinner />}
      </ExploreSection>
    )
  }
}