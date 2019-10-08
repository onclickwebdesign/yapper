import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  border-radius: 20px;
  padding: 0.2rem 0.5rem;
  border: 1px solid #fff;
  background: transparent;
  color: #fff;
  margin-top: 1rem;
  width: 200px;
`;

const Search = props => {
  return (
    <SearchContainer>
      <span className="fa fa-search"></span>
      <input type="text" placeholder="Search Yapper" />
    </SearchContainer>
  );
};

export default Search;