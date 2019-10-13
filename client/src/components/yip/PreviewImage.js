import React from 'react';
import { Thumbnail, RemoveIcon } from '../styled';

const PreviewImage = props => {
  const dimensions = { height: props.height, width: props.width };
  return (
    <Thumbnail data-file-name={props.name} style={{backgroundImage: `url(${props.url})`, ...dimensions}}>

      <RemoveIcon onClick={() => props.removeImage(props.name)}>&times;</RemoveIcon>
      <img style={{display:'none'}} src={props.url} title={props.name} alt="Yip Body" />
    </Thumbnail>
  );
};

export default PreviewImage;