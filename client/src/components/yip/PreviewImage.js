import React from 'react';
import styled from 'styled-components';

const Thumbnail = styled.div`
  position: relative;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 10px;
  margin-bottom: 15px;
`;

const RemoveIcon = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 1.75rem;
  cursor: pointer;
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.6);
  font-weight: 300;
  padding-bottom: 4px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  &:hover {
    rgba(0, 0, 0, 0.9);
  }
`;

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