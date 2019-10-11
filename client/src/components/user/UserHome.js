import React from 'react';
import { Route } from 'react-router-dom';
import LeftNav from './LeftNav';
import ComposeYip from '../yip/ComposeYip';
import Timeline from './Timeline';
import Profile from './Profile';
import styled from 'styled-components';

const HomeSection = styled.div`
  max-width: 1150px;
  margin: 0 auto;
  position: relative;
`;

const MainSection = styled.main`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-left: 200px;
`;

const UserHome = props => {
  return (
    <section style={{background:'#3C3C3B'}}>
      <HomeSection>
        <LeftNav />

        <MainSection>
          <div style={{width:'95%', border:'1px solid #fff'}}>
            <ComposeYip {...props} />
            <Route exact path="/" component={() => <Timeline {...props} />} />
            <Route exact path="/profile" component={Profile} />
          </div>
        </MainSection>

      </HomeSection>
    </section>
  );
  
}

export default UserHome;