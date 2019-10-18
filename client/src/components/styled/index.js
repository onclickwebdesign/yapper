import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const MainSection = styled.main`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 200px;
`;

export const MaterialInput = styled.input`
  display: block;
  width: 100%;
  height: calc(1.5em + .75rem + 2px);
  padding: .375rem .75rem .375rem 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;  
  background: transparent !important;
  border: none;
  border-bottom: 2px solid #ccc;
  color: #ddd !important;
  border-radius: 0;
  &:focus {
    box-shadow: none;
    border-color: #007bff;
  }
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active,
  &:-internal-autofill-selected,
  &:-internal-autofill-selected:hover,
  &:-internal-autofill-selected:focus,
  &:-internal-autofill-selected:active {
    -webkit-text-fill-color: #ddd;
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export const LightenedText = styled.span`
  opacity: 0.5;
`;

export const AvatarLink = styled(Link)`
  width: 50px;
  height: 50px;
  background-size: cover !important;
  border-radius: 30px;
  margin-right: 1rem;
  flex-shrink: 0;
`;

export const Avatar = styled.img`
  border-radius: 30px;
  width: 50px;
  height: 50px;
`;

export const Thumbnail = styled.div`
  position: relative;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  border-radius: 10px;
  margin-bottom: 15px;
`;

export const RemoveIcon = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 1.75rem;
  cursor: pointer;
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.6);
  font-weight: 300;
  padding-bottom: 4px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  &:hover {
    rgba(0, 0, 0, 0.9);
  }
`;

export const YipImagesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

export const BackgroundFade = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9;
`;

export const AuthForm = styled.form`
  position: relative;
  top: 4rem;
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  padding: 0.5rem 2rem 2rem;
  border-radius: 5px;
  background: #333;
  box-shadow: 0 2px 10px 0px #222;
`;