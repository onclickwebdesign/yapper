import React from 'react';
import Yip from '../yip/Yip';

const Feed = props => {
  return (
    props.yips.map(yip => <Yip {...yip} />)
  );
};

export default Feed;