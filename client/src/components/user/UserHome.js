import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LeftNav from './LeftNav';
import ComposeYip from '../yip/ComposeYip';
import Timeline from './Timeline';
import Explore from '../explore/Explore';
import Notifications from '../notifications/Notifications';
import Messages from '../messages/Messages';
import Favorites from '../favorites/Favorites';
import Profile from './Profile';
import PublicProfile from './PublicProfile';
import styled from 'styled-components';

const HomeSection = styled.div`
  max-width: 1150px;
  padding-bottom: 2rem;
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
        <LeftNav doSignOut={props.doSignOut} />

        <MainSection>
          <div style={{width:'95%', border:'1px solid #fff'}}>
            <ComposeYip {...props} />
            <Switch>
              <Route exact path="/" component={() => <Timeline {...props} />} />
              <Route exact path="/explore" component={Explore} />
              <Route exact path="/notifications" component={Notifications} />
              <Route exact path="/messages" component={Messages} />
              <Route exact path="/favorites" component={Favorites} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/:handle" component={PublicProfile} />
            </Switch>
          </div>
        </MainSection>

      </HomeSection>
    </section>
  );
  
}

export default UserHome;