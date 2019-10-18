import React from 'react';
import { RemoveIcon } from '../styled';

const YipBodyGif = props => {
  const gifStyle = { width: '100%', height: 'auto', maxWidth: +props.gif.width, objectFit: 'fill' };
  return (
    <div style={{position:'relative'}}>
      {props.noRemove ? '' : <RemoveIcon onClick={props.removeBodyGif} style={{left:15, zIndex:10, background:'rgba(0,0,0,1)'}}>&times;</RemoveIcon>}
    
      <video 
        autoPlay muted controls 
        loop={true} 
        playsInline={true}  
        style={gifStyle}>
        <source src={props.gif.url} type="video/mp4" />
      </video>
    </div>
  )
}

export default YipBodyGif;