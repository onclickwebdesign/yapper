import React from 'react';
import ComposeYip from '../yip/ComposeYip';
import Feed from './Feed';

class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yips: []
    };
  }

  componentDidMount() {
    // pull user's Yips from API...
    const yips = [
      {
        handle: 'AlexanderTheGreat', 
        userImage: 'https://lh3.googleusercontent.com/-_ZC3oNfwBHA/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcv3ad4_B22__TjYsyyY0zQAvBELg.CMID/s96-c/photo.jpg',
        body: 'Just yippin and yappin over here.',
        bodyImage: 'https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.aljazeera.com%2Fmritems%2FImages%2F2017%2F12%2F29%2F379c6043f5b2496cbb17eb8e2c29eb32_8.jpg&f=1&nofb=1',
        timeStamp: '4h',
        replyCount: 10,
        yipBackCount: 25,
        likeCount: 2502,
        shareCount: 45
      },
      {
        handle: 'AlexanderTheGreat', 
        userImage: 'https://lh3.googleusercontent.com/-_ZC3oNfwBHA/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcv3ad4_B22__TjYsyyY0zQAvBELg.CMID/s96-c/photo.jpg',
        body: 'Well what do you know, I am actually taking the time to basically rebuild this application to further cement my development skills.',
        bodyImage: 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.explicit.bing.net%2Fth%3Fid%3DOIP.sY6n8tXJKs-2tnZNSrFr2gHaE8%26pid%3DApi&f=1',
        timeStamp: '4h',
        replyCount: 120,
        yipBackCount: 425,
        likeCount: 25024,
        shareCount: 85
      }
    ];
    this.setState({yips});
  }

  render() {
    return (
      <div>
        <ComposeYip />
        <Feed yips={this.state.yips} />
      </div>
    );
  }
}

export default Timeline;