import React from 'react';
import Modal from '../Modal';
import Yip from '../yip/Yip';
import LoadingSpinner from '../LoadingSpinner';
import { constants, userApi, yipApi } from '../../util';
import styled from 'styled-components';

const TimelineContainer = styled.section`
  border-top: 1px solid #fff;
`;

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    const session = JSON.parse(localStorage.getItem('usersession'));
    this.state = {
      yips: [],
      profileImage: session ? session.profileImage : constants.DEFAULT_USER_IMAGE,
      handle: session ? session.handle : '',
      fullName: '',
      fullSizeMedia: '',
      loading: false
    };
  }

  async componentDidMount() {
    try {
      this.setState({ loading: true });
      const userPromise = await userApi.getUserWithSession(this.props.token);
      const user = await userPromise.json();
      const response = await yipApi.getAuthUserYips(this.props.token);
      const result = await response.json();
      console.log('yips: ', result);

      this.setState({ fullName: user.fullName, yips: result.yips });
    } catch (e) {
      console.error('Error: ', e);
    } finally {
      this.setState({ loading: false });
    }
  }

  showFullSizeMedia = url => {
    this.setState({ fullSizeMedia: url });
  }

  closeFullSizeMedia = e => {
    if (e.target.id !== 'modalContainer' && e.target.id !== 'modalBody' && e.target.id !== 'modalBodyImage') {
      this.setState({ fullSizeMedia: '' });
    }
  }

  render() {
    return (
      <TimelineContainer>
        {this.state.yips.map(yip => <Yip {...yip} showFullSizeMedia={this.showFullSizeMedia} key={yip._id} />)}
        {this.state.fullSizeMedia ? <Modal body={<img id="modalBodyImage" src={this.state.fullSizeMedia} style={{width:'100%'}} alt="Yip Body Full Size" />} closeModal={this.closeFullSizeMedia} /> : ''}
        {this.state.loading && <LoadingSpinner />}
      </TimelineContainer>
    );
  }
}

export default Timeline;