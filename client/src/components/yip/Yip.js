import React from 'react';
import styled from 'styled-components';
import YipImage from './YipImage';
import YipBodyGif from './YipBodyGif';
import { Link } from 'react-router-dom';
import { LightenedText, Avatar, AvatarLink, YipImagesContainer } from '../styled';
import { constants } from '../../util';

const YipContainer = styled.div`
  padding: 1rem 1rem 0;
  border-top: 1px solid #fff;
  &:first-child {
    border-top: none;
  }
`;

const YipBody = styled.div`
  display: flex;
  justify-content: space-between;
`;

const YipTimeStamp = styled.span`
  margin-left: 10px;
  padding-left: 10px;
  border-left: 2px solid #fff;
  line-height: 0.15;
  display: inline-block;
`;

const YipParagraph = styled.p`
  color: #fff;
`;

const YipFooter = styled.ul`
  display: flex;
  justify-content: space-around;
  padding: 0.25rem;
`;

const YipFooterButton = styled.button`
  color: #fff;
  background: transparent;
  border: none;
  &:hover {
    box-shadow: 0 0 5px 0 #007bff;
  }
`;

const LiStyled = styled.li`
  margin: 0.5rem 0;
`;

const Yip = props => {
  const getYipImages = images => {
    if (images.length === 1) {
      return [<YipImage key="yipBodyImage-0" url={images[0]} width={'100%'} height="auto" showFullSizeMedia={props.showFullSizeMedia} />];
    } else if(images.length === 2) {
      return images.map((image, i) => 
        <YipImage key={`${i}-${image}`} url={image} width={'49%'} height="auto" showFullSizeMedia={props.showFullSizeMedia} />)
    } else if (images.length === 3) {
      return (
        [<YipImage key="yipBodyImage-0" url={images[0]} width={'49%'} height="auto" showFullSizeMedia={props.showFullSizeMedia} />,
        <div key="yipBodyImage-1" style={{width:'49%'}}>
          <YipImage key={`1-${images[1]}`} url={images[1]} width={'100%'} height="auto" showFullSizeMedia={props.showFullSizeMedia} />
          <YipImage key={`2-${images[2]}`} url={images[2]} width={'100%'} height="auto" showFullSizeMedia={props.showFullSizeMedia} />
        </div>]
      );
    } else {
      return (
        [
          <div key="yipBodyImage-0" style={{width:'49%'}}>
            <YipImage key={`0-${images[0]}`} url={images[0]} width={'100%'} height="49%" showFullSizeMedia={props.showFullSizeMedia} />
            <YipImage key={`1-${images[1]}`} url={images[1]} width={'100%'} height="49%" showFullSizeMedia={props.showFullSizeMedia} />
          </div>,
          <div key="yipBodyImage-1" style={{width:'49%'}}>
            <YipImage key={`2-${images[2]}`} url={images[2]} width={'100%'} height="49%" showFullSizeMedia={props.showFullSizeMedia} />
            <YipImage key={`3-${images[3]}`} url={images[3]} width={'100%'} height="49%" showFullSizeMedia={props.showFullSizeMedia} />
          </div>
        ]
      );
    }
  }

  return (
    <YipContainer>
      <YipBody>
        <AvatarLink to={`/${props.userId.handle}`} style={{background:`url(${props.userId.profileImage || constants.DEFAULT_USER_IMAGE}) center center no-repeat`}}>
          <Avatar style={{display:'none'}} src={props.userId.profileImage || constants.DEFAULT_USER_IMAGE} alt="Yapper User" />
        </AvatarLink>
      
        <div style={{flexGrow:1}}>
          <Link style={{color:'#fff'}} to={`/${props.userId.handle}`}><strong>{props.userId.fullName}</strong> <LightenedText>@{props.userId.handle}</LightenedText></Link>
          <YipTimeStamp>{props.timeStamp}</YipTimeStamp>
        
          <YipParagraph>{props.body}</YipParagraph>
          <YipImagesContainer>
            {props.images.length > 0 ? getYipImages(props.images).map(image => image) : ''}
          </YipImagesContainer>
          {props.gif.url ? <YipBodyGif noRemove gif={props.gif} /> : ''}
        </div>
      </YipBody>
      <YipFooter className="no-margin">
        <LiStyled><YipFooterButton><span className="fa fa-comment"></span> {props.replyIds.length}</YipFooterButton></LiStyled>
        <LiStyled><YipFooterButton><span className="fas fa-bullhorn"></span> {props.yipBackIds.length}</YipFooterButton></LiStyled>
        <LiStyled><YipFooterButton><span className="fa fa-heart"></span> {props.likeIds.length}</YipFooterButton></LiStyled>
        <LiStyled><YipFooterButton><span className="fa fa-share"></span></YipFooterButton></LiStyled>
      </YipFooter>
    </YipContainer>
  );
};

export default Yip;