import React from 'react';
import styled from 'styled-components';
import ImageUploader from 'react-images-upload';

const ImageContainer = styled.div`
  position: relative;

`;

const imageUploaderStyles = {
  position: 'absolute',
  zIndex: 2,
  bottom: 0,
  left: 0,
  width: '100%',
  border: 'none',
  margin: 0,
  padding: 0,
  borderRadius: 10,
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  fontSize: '1.25rem'
}

const Image = styled.img`
  border-radius: 10px;
  z-index: 1;
  position: relative;
`;
const ProfileImage = props => {
  console.log('props: ', props);
  const imageT = 'https://lh3.googleusercontent.com/-_ZC3oNfwBHA/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcv3ad4_B22__TjYsyyY0zQAvBELg.CMID/s96-c/photo.jpg';

  return (
    <ImageContainer>
      <ImageUploader 
        fileContainerStyle={{background:'transparent', height:'35%', ...imageUploaderStyles}} 
        buttonStyles={{background: 'rgba(0, 0, 0, 0.6)', height:'100%', display:'flex', justifyContent:'space-around', ...imageUploaderStyles}} 
        withLabel={false} 
        withIcon={false} 
        singleImage={true} 
        buttonClassName="fa fa-edit"
        buttonText='' 
        onChange={props.doProfileImageUpload} 
        imgExtension={['.jpg', '.png', '.jpeg']} 
        maxFileSize={3000000} />

      {/* <Image src={props.profileImage} alt="User Profile Image" /> */}
      <Image src={imageT} alt="User Profile Image" />
    </ImageContainer>
  );
};

export default ProfileImage;