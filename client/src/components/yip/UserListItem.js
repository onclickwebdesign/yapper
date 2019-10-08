import React from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
  border-top: 1px solid #fff;
  opacity: 0.75;
  padding: 1rem;
  display: flex;

  &:hover {
    opacity: 1;
  }
`;

const UserListItem = props => {
  return (
    <ListItem>
      <img style={{width:40,height:40,borderRadius:35}} src={props.userImage} alt="At User" />
      <div style={{width:'90%'}}>
        <strong style={{display:'block',marginBottom:5}}>{props.userFullName}</strong>
        <div style={{opacity:'0.85'}}>{props.handle}</div>
      </div>
    </ListItem>
  )
};

export default UserListItem;