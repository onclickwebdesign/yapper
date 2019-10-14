import React, { Component } from 'react';
import Alert from '../Alert';
import LoadingSpinner from '../LoadingSpinner';

// import SearchHashTag from './SearchHashTag';
// import SearchAt from './SearchAt';
import PreviewImagesContainer from './PreviewImagesContainer';
import SearchGifs from './SearchGifs';
import YipBodyGif from './YipBodyGif';

import styled from 'styled-components';
import { constants, yipApi, imgProcessor } from '../../util';
import { Avatar, AvatarLink } from '../styled';

const ComposeContainer = styled.section`
  padding: 1rem 1rem 0.75rem;
`;

const FlexContainer = styled.div`
  display: flex;
  position: relative;
`;

const TextAreaContainer = styled.div`
  background: transparent;
  flex-grow: 1;
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

const BodyImageContainer = styled.div`
  margin-top: 1rem;
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
  &:disabled {
    background: transparent;
    opacity: 0.4;
  }
`;

const LabelButton = styled.label`
  background: transparent;
  border: none;
  font-size: 1.75rem;
  color: #fff;
  font-weight: 300;
  line-height: 1;
  padding: 0.5rem 0.4rem;
  width: 40px;
  height: 40px;
  margin: 0;
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 123, 255, 0.35);
  }
  &.disabled {
    background: transparent;
    opacity: 0.4;
    cursor: default;
  }
`;

const FileButton = styled.input`
  display: none;
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

    const session = JSON.parse(localStorage.getItem('usersession'));
    
    this.state = {
      yipBody: '',
      bodyImages: [],
      bodyGif: '',
      searchGifs: false,
      user: session,
      loading: false,
      errors: []
    };

    this.fileBuffer = [];
    this.validTypes = ['jpg', 'image/jpg', 'jpeg', 'image/jpeg', 'png', 'image/png'];
  }

  async componentDidMount() {
    
  }

  postYip = async () => {
    if (!this.state.yipBody) {
      this.setState({ errors: ['Your yip is empty!'] });
      setTimeout(() => this.setState({errors: []}), 5000);
    } else {
      this.setState({ loading: true });
      let yip, url;
      const headers = {
        'Authorization': `Token ${this.state.user.token}`,
      };

      if (!this.fileBuffer.length) { // no media attached
        yip = JSON.stringify({ body: this.state.yipBody, gif: this.state.bodyGif });
        url = '/api/yip';
        headers['Content-Type'] = 'application/json';
      } else {
        yip = new FormData();
        for (let i = 0; i < this.fileBuffer.length; ++i) {
          yip.append('images', this.fileBuffer[i]);
        }

        yip.set('yipBody', this.state.yipBody);
        url = `/api/yip/images/${this.fileBuffer.length}`;
      }

      const response = await yipApi.postYip(yip, url, headers);
      const result = await response.json();

      console.log('compose yip response: ', result);
      if (result.success) {
        document.getElementById('yip-text-area').innerHTML = '';
        this.setState({ yipBody: '', bodyImages: [], bodyGif: '' });
        this.fileBuffer = [];
      }
    }

    this.setState({ loading: false });
  }

  searchYipBody = () => {
    if (this.state.yipBody.indexOf('#') > -1) {
      
    }
  }

  handleInputChange = event => {
    this.setState({yipBody: event.target.innerHTML});
  }

  handleImages = event => {
    const images = event.target.files;
    
    Array.prototype.push.apply(this.fileBuffer, images);
    const errors = [];
    if (this.fileBuffer.length > 4) {
      this.fileBuffer.length = 4;
      errors.push('Please select one gif, or up to four images total.');
    }
      
    const filesArray = [];
    
    for (let i = 0; i < this.fileBuffer.length; ++i) {
      const file = this.fileBuffer[i];
      if (!file.type.match('image') || this.validTypes.indexOf(file.type) === -1) {
        errors.push('Please select jpg or png images only.');
        continue;
      }

      if (file.size > 3000000) {
        errors.push('Please select images less than 3MB in size.');
        continue;
      }

      filesArray.push(file);
    }

    if (!this.state.errors.length) {
      this.setState({ errors });
      setTimeout(() => this.setState({errors: []}), 5000);
    }

    imgProcessor.readMultipleImages(filesArray).then(results => this.setState({ bodyImages: results }));
  }

  removeImage = name => {
    const tempBodyImages = this.state.bodyImages;

    for (let i = 0; i < this.fileBuffer.length; ++i) {
      if (this.fileBuffer[i].name === name) {
        this.fileBuffer.splice(i, 1);
        tempBodyImages.splice(i, 1);
        this.setState({ bodyImages: tempBodyImages });
      }
    }
  }

  handleGif = () => {
    if (this.state.bodyImages.length) {
      this.setState({ errors: ['Please select either one gif, or up to four images total.'] })
    } else {
      this.setState({ searchGifs: true });
    }
  }

  selectGif = gif => this.setState({ bodyGif: gif });
  removeBodyGif = () => this.setState({ bodyGif: '' });
  closeGifsSearch = () => this.setState({ searchGifs: false });

  handleEmoji = event => {
    console.log('handle emoji..');
  }

  render() {
    return (
      <ComposeContainer>
        <FlexContainer style={{marginBottom:20}}>
          <AvatarLink to={`/${this.state.user.handle}`} style={{background:`url(${this.state.user.profileImage || constants.DEFAULT_USER_IMAGE}) center center no-repeat`}}>
            <Avatar style={{display:'none'}} src={this.state.user.profileImage || constants.DEFAULT_USER_IMAGE} alt="Yapper User" />
          </AvatarLink>

          <TextAreaContainer>
            <TextArea id="yip-text-area" contentEditable onKeyUp={this.handleInputChange}></TextArea>
            <input type="hidden" name="yipBody" value={this.state.yipBody} />
            {!this.state.yipBody ? <Placeholder>What's Yappin?</Placeholder> : ''}
            <BodyImageContainer>
              {this.state.bodyGif ? 
                <YipBodyGif gif={this.state.bodyGif} removeBodyGif={this.removeBodyGif} /> : 
                <PreviewImagesContainer images={this.state.bodyImages} removeImage={this.removeImage} />}
            </BodyImageContainer>
          </TextAreaContainer>
        </FlexContainer>
        
        <FlexContainer style={{justifyContent:'space-between'}}>
          <FlexContainer style={{alignItems:'center'}}>
            <LabelButton className={this.state.bodyGif ? 'disabled' : ''} style={{margin:0}}>
              <span className="far fa-image" style={{verticalAlign:'bottom'}}></span>
              <FileButton disabled={this.state.bodyGif ? true : false} id="yip-image-upload" onChange={this.handleImages} type="file" name="bodyImages" multiple />
            </LabelButton>
            
            <IconButton disabled={this.state.bodyGif ? true : false} style={{display:'flex'}} onClick={this.handleGif}><GifIcon>GIF</GifIcon></IconButton>
            <IconButton onClick={this.handleEmoji} style={{fontSize:'1.5rem'}}><span className="far fa-smile" style={{verticalAlign:'bottom'}}></span></IconButton>
          </FlexContainer>
          <button style={{height:40}} onClick={this.postYip} className="yapper-btn-primary btn btn-primary">Yip</button>
        </FlexContainer>
        
        {this.state.searchGifs && <SearchGifs selectGif={this.selectGif} closeGifsSearch={this.closeGifsSearch} />}
        {this.state.errors.map((error, i) => <Alert key={`yip-error-${i}`} type="danger" message={error} />)}
        {this.state.loading && <LoadingSpinner />}
      </ComposeContainer>
    );
  }
}

export default ComposeYip;