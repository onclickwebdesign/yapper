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

    const yips = [
      {
        _id: 'asdf234asdf',
        handle: 'AlexanderTheGreat', 
        userImage: 'https://lh3.googleusercontent.com/-_ZC3oNfwBHA/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcv3ad4_B22__TjYsyyY0zQAvBELg.CMID/s96-c/photo.jpg',
        body: 'Just yippin and yappin over here.',
        bodyImage: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.aljazeera.com%2Fmritems%2FImages%2F2017%2F12%2F29%2F379c6043f5b2496cbb17eb8e2c29eb32_8.jpg&f=1&nofb=1',
        timeStamp: '4h',
        replyCount: 10,
        yipBackCount: 25,
        likeCount: 2502,
        shareCount: 45
      }
    ];
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