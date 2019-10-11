import React from 'react';
import styled from 'styled-components';
import { MaterialInput } from '../styled';

const SearchContainer = styled.div`
  border-radius: 20px;
  padding: 0.2rem 0.5rem;
  background: transparent;
  color: #fff;
  margin-top: 1rem;
  width: 200px;
  position: relative;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 10px;
  top: 18px;
  font-size: 0.85rem;
`;

const Search = props => {
  return (
    <SearchContainer>
      <SearchIcon className="fa fa-search"></SearchIcon>
      <MaterialInput style={{paddingLeft:'1.5rem'}} type="text" placeholder="Search Yapper" />
    </SearchContainer>
  );
};

export default Search;