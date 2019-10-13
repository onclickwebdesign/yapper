import React from 'react';
import { Thumbnail } from '../styled';


const YipImage = props => {
  const dimensions = { height: props.height, width: props.width };
  return (
    <Thumbnail style={{cursor: 'pointer', backgroundImage: `url(${props.url})`, ...dimensions}} onClick={() => props.showFullSizeMedia(props.url)}>
      <img style={{display:'none'}} src={props.url} alt="Yip Body" />
    </Thumbnail>
  );
};

export default YipImage;