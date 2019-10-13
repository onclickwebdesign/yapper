import React from 'react';
import PreviewImage from './PreviewImage';
import { YipImagesContainer } from '../styled';

const PreviewImagesContainer = props => {
  const getPreviewImages = images => {
    if (images.length === 1) {
      return [<PreviewImage key="bodyImage-0" {...images[0]} width={'100%'} height={415} removeImage={props.removeImage} />];
    } else if(images.length === 2) {
      return images.map((image, i) => 
        <PreviewImage key={`${i}-${image.name}`} {...image} width={'49%'} height={415} removeImage={props.removeImage} />)
    } else if (images.length === 3) {
      return (
        [<PreviewImage key="bodyImage-0" {...images[0]} width={'49%'} height={415} removeImage={props.removeImage} />,
        <div key="bodyImage-1" style={{width:'49%'}}>
          <PreviewImage key={`1-${images[1].name}`} {...images[1]} width={'100%'} height={200} removeImage={props.removeImage} />
          <PreviewImage key={`2-${images[2].name}`} {...images[2]} width={'100%'} height={200} removeImage={props.removeImage} />
        </div>]
      );
    } else {
      return (
        [
          <div key="bodyImage-0" style={{width:'49%'}}>
            <PreviewImage key={`0-${images[0].name}`} {...images[0]} width={'100%'} height={200} removeImage={props.removeImage} />
            <PreviewImage key={`1-${images[1].name}`} {...images[1]} width={'100%'} height={200} removeImage={props.removeImage} />
          </div>,
          <div key="bodyImage-1" style={{width:'49%'}}>
            <PreviewImage key={`2-${images[2].name}`} {...images[2]} width={'100%'} height={200} removeImage={props.removeImage} />
            <PreviewImage key={`3-${images[3].name}`} {...images[3]} width={'100%'} height={200} removeImage={props.removeImage} />
          </div>
        ]
      );
    }
  }

  return (
    <YipImagesContainer>
      {props.images.length > 0 ? getPreviewImages(props.images).map(image => image) : ''}
    </YipImagesContainer>
  );
};

export default PreviewImagesContainer;
