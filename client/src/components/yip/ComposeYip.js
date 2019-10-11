import React, { Component } from 'react';
// import SearchHashTag from './SearchHashTag';
// import SearchAt from './SearchAt';
import styled from 'styled-components';
import constants from '../../util/constants';

const ComposeContainer = styled.section`
  padding: 1rem 1rem 0.75rem;
`;

const FlexContainer = styled.div`
  display: flex;
  position: relative;
`;

const Avatar = styled.img`
  border-radius: 30px;
  width: 40px;
  height: 40px;
  margin-right: 1rem;
`;

const TextAreaContainer = styled.div`
  background: transparent;
  width: 90%;
  position: relative;
`;

const Placeholder = styled.div`
  position: absolute;
  left: 0;
  top: 5px;
  width: 100%;
  z-index: 1;
  font-size: 1.25rem;
  opacity: 0.4;
`;

const TextArea = styled.div`
  z-index: 2;
  position: relative;
  font-size: 1.25rem;
  top: 5px;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.75rem;
  color: #fff;
  font-weight: 300;
  line-height: 1;
  padding: 0.5rem 0.4rem;
  width: 40px;
  height: 40px;
  border-radius: 30px;
  &:hover {
    background-color: rgba(0, 123, 255, 0.35);
  }
`;

const GifIcon = styled.span`
  color: #fff;
  border: 2px solid #fff;
  border-radius: 5px;
  padding: 0.25rem;
  display: inline-block;
  letter-spacing: 1px;
  font-size: 0.6rem;
`;

class ComposeYip extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      yipBody: '',
      user: props
    };
  }

  async componentDidMount() {
    
  }

  postYip = async () => {
    const yip = {
      body: this.state.yipBody,
      yipBackCount: 0,
      replyIds: []
    };

    const response = await fetch('/api/yip/', { 
      method: 'POST', 
      headers: {
        'Authorization': `Token ${this.props.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(yip)
    });

    console.log('compose yip response: ', response);
    if (response.success) {
      this.setState({yipBody: ''});
    }
  }

  searchYipBody = () => {
    if (this.state.yipBody.indexOf('#') > -1) {
      
    }
  }

  handleInputChange = event => {
    this.setState({yipBody: event.target.innerHTML});
  }

  handleImage = event => {
    console.log('handle image..');
  }

  handleGif = event => {
    console.log('handle gif..');
  }

  handleEmoji = event => {
    console.log('handle emoji..');
  }

  render() {
    return (
      <ComposeContainer>
        <FlexContainer style={{marginBottom:20}}>
          <Avatar src={this.state.user.userImage ? this.state.user.userImage : constants.DEFAULT_USER_IMAGE} />
          <TextAreaContainer>
            <TextArea contentEditable onKeyUp={this.handleInputChange}></TextArea>
            <input type="hidden" name="yipBody" value={this.state.yipBody} />
            {!this.state.yipBody ? <Placeholder>What's Yappin?</Placeholder> : ''}
          </TextAreaContainer>
        </FlexContainer>
        
        <FlexContainer style={{justifyContent:'space-between'}}>
          <FlexContainer style={{alignItems:'center'}}>
            <IconButton onClick={this.handleImage}><span className="far fa-image" style={{verticalAlign:'bottom'}}></span></IconButton>
            <IconButton style={{display:'flex'}} onClick={this.handleGif}><GifIcon>GIF</GifIcon></IconButton>
            <IconButton onClick={this.handleEmoji} style={{fontSize:'1.5rem'}}><span className="far fa-smile" style={{verticalAlign:'bottom'}}></span></IconButton>
          </FlexContainer>
          <button style={{height:40}} onClick={this.postYip} className="yapper-btn-primary btn btn-primary">Yip</button>
        </FlexContainer>
        
      </ComposeContainer>
    );
  }
}

export default ComposeYip;