import React, { Component } from 'react';
import ImageUploader from 'react-images-upload';

import { FilePond, File, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';



// import SearchHashTag from './SearchHashTag';
// import SearchAt from './SearchAt';
import styled from 'styled-components';
import { constants, yipApi } from '../../util';
import { Avatar } from '../styled';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ComposeContainer = styled.section`
  padding: 1rem 1rem 0.75rem;
`;

const FlexContainer = styled.div`
  display: flex;
  position: relative;
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

const BodyImageContainer = styled.div`
  display: flex;
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

const ImageUploaderStyles = {
  background: 'transparent',
  border: 'none',
  fontSize: '1.75rem',
  color: '#fff',
  fontWeight: '300',
  lineHeight: 1,
  padding: '0.5rem 0.4rem',
  margin: 0,
  width: 40,
  height: 40,
  borderRadius: 30
}

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
      bodyImages: [],
      user: props,
    };
  }

  async componentDidMount() {
    
  }

  postYip = async () => {
    const yip = {
      body: this.state.yipBody
    };

    const response = await yipApi.postYip(yip, this.props.token);
    const result = await response.json();

    console.log('compose yip response: ', result);
    if (result.success) {
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

  handleImages = images => {
    console.log('handle image..', images);
    //this.state.bodyImages  <-- update this with image thumbnails
    this.setState({
      bodyImages: images.map(img => img.file)
    });
  }

  handleGif = event => {
    console.log('handle gif..');
  }

  handleEmoji = event => {
    console.log('handle emoji..');
  }

  handleInit = () => {
    console.log('FilePond instance has initialised', this.pond);
  }

  render() {
    return (
      <ComposeContainer>
        <FlexContainer style={{marginBottom:20}}>
          <Avatar style={{marginRight:'1rem'}} src={this.state.user.userImage ? this.state.user.userImage : constants.DEFAULT_USER_IMAGE} />
          <TextAreaContainer>
            <TextArea contentEditable onKeyUp={this.handleInputChange}></TextArea>
            <input type="hidden" name="yipBody" value={this.state.yipBody} />
            {!this.state.yipBody ? <Placeholder>What's Yappin?</Placeholder> : ''}
            <BodyImageContainer>
              <FilePond ref={ref => this.pond = ref}
                files={this.state.bodyImages}
                allowMultiple={true}
                maxFiles={4}
                server="/api"
                allowDrop="false"
                allowPaste="false"
                instantUpload="false"
                labelInvalidField="Select jpg or png images only"
                labelFileLoading="Hmm loading"
                labelIdle=""
                oninit={() => this.handleInit() }
                onupdatefiles={(fileItems) => this.handleImages(fileItems)} />
              
            </BodyImageContainer>
          </TextAreaContainer>
        </FlexContainer>
        
        <FlexContainer style={{justifyContent:'space-between'}}>
          <FlexContainer style={{alignItems:'center'}}>

          
        
            {/* <ImageUploader 
              fileContainerStyle={{height:0, margin:0, padding:0}} 
              buttonStyles={ImageUploaderStyles} 
              withLabel={false} 
              withIcon={false} 
              singleImage={false} 
              buttonClassName="far fa-image compose-yip-image-upload"
              buttonText='' 
              name='bodyImages'
              onChange={this.handleImages} 
              imgExtension={['.jpg', '.png', '.jpeg']} 
              maxFileSize={3000000} /> */}

            <IconButton className="filepond--label-action"><span className="far fa-image" style={{verticalAlign:'bottom'}}></span></IconButton>
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