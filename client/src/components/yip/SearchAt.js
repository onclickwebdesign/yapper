import React from 'react';
import styled from 'styled-components';
import UserListItem from './UserListItem';

const Container = styled.section`
  position: absolute;
  top: 50%;
  left: 20px;
  box-shadow: 0 0 3px 5px #fff;
`;

const SearchAt = props => {
  return (
    <Container>
      <ul>
        {props.atUserList.map(user => (
          <UserListItem {...user} />
        ))}
      </ul>
    </Container>
  )
};

export default SearchAt;