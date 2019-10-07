import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  border-radius: 20px;
  padding: 0.2rem 0.5rem;
  border: 1px solid #fff;
  background: transparent;
  color: #fff;
  position: fixed;
  right: 1rem;
  top: 0;
  width: 200px;
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