import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import LeftNav from './LeftNav';
import Search from './Search';
import Timeline from './Timeline';
import styled from 'styled-components';

const HomeSection = styled.section`
  padding: 1rem 1.5rem 0 1rem;
  display: flex;
  justify-content: space-between;
`;

class UserHome extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      
    };
  }

  async componentDidMount() {
    
  }

  render() {
    return (
      <HomeSection>
        <LeftNav />

        <main style={{width:'50%',border:'1px solid #fff'}}>
          <Route path="/" component={Timeline} />
          
        </main>

        <Search />
      </HomeSection>
    );
  }
}

export default UserHome;