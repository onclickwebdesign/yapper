import React from 'react';
import Yip from '../yip/Yip';
import { constants, userApi, yipApi } from '../../util';

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    const session = JSON.parse(localStorage.getItem('usersession'));
    this.state = {
      yips: [],
      profileImage: session ? session.profileImage : constants.DEFAULT_USER_IMAGE,
      handle: session ? session.handle : '',
      fullName: ''
    };
  }

  async componentDidMount() {
    const userPromise = await userApi.getUserWithSession(this.props.token);
    const user = await userPromise.json();
    const response = await yipApi.getAuthUserYips(this.props.token);
    const result = await response.json();
    console.log('yips: ', result);

    this.setState({fullName: user.fullName, yips: result.yips});
  }

  render() {
    return (
      this.state.yips.map(yip => {
        yip.profileImage = this.state.profileImage;
        yip.handle = this.state.handle;
        yip.fullName = this.state.fullName;
        return <Yip {...yip} key={yip._id} />;
      })
    );
  }
}

export default Timeline;