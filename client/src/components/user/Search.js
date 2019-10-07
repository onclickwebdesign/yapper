import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  border-radius: 20px;
  padding: 0.2rem 0.5rem;
  border: 1px solid #fff;
  background: transparent;
  color: #fff;
`;

const Search = props => {
  return (
    <div>
      <SearchContainer>
        <span class="fa fa-search"></span>
        <input type="text" placeholder="Search Yapper" />
      </SearchContainer>
    </div>
  );
};

export default Search;