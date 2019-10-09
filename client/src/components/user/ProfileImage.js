import React from 'react';
import styled from 'styled-components';
import ImageUploader from 'react-images-upload';

const ImageContainer = styled.div`
  position: relative;

`;

const imageUploaderStyles = {
  position: 'absolute',
  zIndex: 2,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  border: 'none',
  display: 'block',
  margin: 0,
  borderRadius: 10
}

const Image = styled.img`
  border-radius: 10px;
  z-index: 3;
  position: relative;
`;
const ProfileImage = props => {
  console.log('props: ', props);
  const imageT = 'https://lh3.googleusercontent.com/-_ZC3oNfwBHA/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcv3ad4_B22__TjYsyyY0zQAvBELg.CMID/s96-c/photo.jpg';

  return (
    <ImageContainer>
      <ImageUploader fileContainerStyle={{background:'transparent', ...imageUploaderStyles}} buttonStyles={{background: 'rgba(0, 0, 0, 0.6)', ...imageUploaderStyles}} withLabel={false} withIcon={false} singleImage={true} buttonText='+' onChange={props.doProfileImageUpload} imgExtension={['.jpg', '.png', '.jpeg']} maxFileSize={3000000} />
      {/* <Image src={props.profileImage} alt="User Profile Image" /> */}
      <Image src={imageT} alt="User Profile Image" />
    </ImageContainer>
  );
};

export default ProfileImage;