import React from 'react';
import { Route } from 'react-router-dom';
import LeftNav from './LeftNav';
import ComposeYip from '../yip/ComposeYip';
import Timeline from './Timeline';
import styled from 'styled-components';

const HomeSection = styled.div`
  max-width: 1150px;
  margin: 0 auto;
  position: relative;
`;

const UserHome = props => {
  return (
    <section style={{background:'#3C3C3B'}}>
      <HomeSection>
        <LeftNav />

        <main>
          <div style={{width:'60%', border:'1px solid #fff'}}>
            <ComposeYip {...props} />
            <Route path="/" component={() => <Timeline {...props} />} />
          </div>
        </main>

      </HomeSection>
    </section>
  );
  
}

export default UserHome;