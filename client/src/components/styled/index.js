import styled from 'styled-components';

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
  border-bottom: 1px solid #ccc;
  color: #ddd !important;
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
  opacity: 0.35;
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
  max-height: 415px;
`;