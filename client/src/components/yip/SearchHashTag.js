import React from 'react';
import styled from 'styled-components';

const Container = styled.section`
  position: absolute;
  top: 50%;
  left: 20px;
  box-shadow: 0 0 3px 5px #fff;
`;

const HashTagItem = styled.li`
  border-top: 1px solid #fff;
  opacity: 0.75;
  padding: 1rem;

  &:hover {
    opacity: 1;
  }
`;

const SearchHashTag = props => {
  return (
    <Container>
      <ul>
        {props.hashTagList.map(hashTag => (
          <HashTagItem>#{hashTag}</HashTagItem>
        ))}
      </ul>
    </Container>
  )
};

export default SearchHashTag;