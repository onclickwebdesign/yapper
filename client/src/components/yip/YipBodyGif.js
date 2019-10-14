import React from 'react';
import { RemoveIcon } from '../styled';

const YipBodyGif = props => {
  return (
    <div style={{position:'relative'}}>
      {props.noRemove ? '' : <RemoveIcon onClick={props.removeBodyGif} style={{left:15, zIndex:10, background:'rgba(0,0,0,1)'}}>&times;</RemoveIcon>}
    
      <video 
        autoPlay muted controls 
        height={props.gif.height} 
        loop={true} 
        playsInline={true}  
        width={props.gif.width} 
        style={{objectFit: 'fill'}}>
        <source src={props.gif.url} type="video/mp4" />
      </video>
    </div>
  )
}

export default YipBodyGif;