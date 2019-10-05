import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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
  const bodyImage = props.bodyImage ? 
    <img src={props.bodyImage} alt={props.bodyImageAlt} /> :
    '';

  return (
    <YipContainer>
      <YipBody>
        <Link to={`/${props.handle}`} style={{width:50,borderRadius:30,overFlow:'hidden'}}>
          <img style={{width:'100%'}} src={props.userImage} alt="Yapper User" />
        </Link>
      
        <div style={{width:'100%',paddingLeft:'0.5rem'}}>
          <Link to={`/${props.handle}`}>{props.handle}</Link>
          <YipTimeStamp>{props.timeStamp}</YipTimeStamp>
        
          <YipParagraph>{props.body}</YipParagraph>
          {bodyImage}
        </div>
      </YipBody>
      <YipFooter className="no-margin">
        <LiStyled><YipFooterButton><span className="fa fa-comment"></span> {props.replyCount}</YipFooterButton></LiStyled>
        <LiStyled><YipFooterButton><span className="fas fa-bullhorn"></span> {props.yipBackCount}</YipFooterButton></LiStyled>
        <LiStyled><YipFooterButton><span className="fa fa-heart"></span> {props.likeCount}</YipFooterButton></LiStyled>
        <LiStyled><YipFooterButton><span className="fa fa-share"></span> {props.shareCount}</YipFooterButton></LiStyled>
      </YipFooter>
    </YipContainer>
  );
};

export default Yip;