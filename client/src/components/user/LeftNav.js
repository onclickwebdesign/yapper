import React from 'react';
import Logo from '../Logo';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Search from './Search';

const LeftNavContainer = styled.nav`
  width: 200px;
  position: fixed;
  left: 5px;

  @media(max-width: 767px) {
    width: 80px;
  }
`;

const LeftNavLink = styled(NavLink)`
  font-size: 1.25rem;
  color: #fff;
  opacity: 0.85;
  display: inline-block;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  border: none;

  &:hover {
    background: rgba(0,0,0,0.5);
    color: #fff;
    box-shadow: 0 0 9px -2px #007bff;
    opacity: 1;
  }

  @media(max-width: 767px) {
    padding: 0;
    margin-left: 0.65rem;
    border-radius: 30px;
    font-size: 1.75rem;
    justify-content: space-around;
    display: flex;
    align-items: center;
    height: 55px;
    width: 55px;
  }
`;

const LeftNavText = styled.span`
  margin-left: 10px;

  @media(max-width: 767px) {
    display: none;
  }
`;

const active = {
  color: '#007bff'
};

const LeftNav = props => {
  return (
    <LeftNavContainer>
      <ul>
        <li>
          <LeftNavLink style={{lineHeight: 1, padding:'0.2rem 0.85rem', margin:'0.5rem 0 0 0.65rem', borderRadius:35}} to="/">
            <Logo fontSize="2.25rem" />
          </LeftNavLink>
        </li>
        <li>
          <LeftNavLink activeStyle={active} exact to="/">
            <span className="fa fa-home"></span> <LeftNavText>Home</LeftNavText>
          </LeftNavLink>
        </li>
        <li>
          <LeftNavLink activeStyle={active} to="/explore">
            <span className="fa fa-hashtag"></span> <LeftNavText>Explore</LeftNavText>
          </LeftNavLink>
        </li>
        <li>
          <LeftNavLink activeStyle={active} to="/notifications">
            <span className="fa fa-bell"></span> <LeftNavText>Notifications</LeftNavText>
          </LeftNavLink>
        </li>
        <li>
          <LeftNavLink activeStyle={active} to="/messages">
            <span className="fa fa-envelope"></span> <LeftNavText>Messages</LeftNavText>
          </LeftNavLink>
        </li>
        <li>
          <LeftNavLink activeStyle={active} to="/favorites">
            <span className="fa fa-bookmark"></span> <LeftNavText>Favorites</LeftNavText>
          </LeftNavLink>
        </li>
        <li>
          <LeftNavLink activeStyle={active} to="/profile">
            <span className="fa fa-user"></span> <LeftNavText>Profile</LeftNavText>
          </LeftNavLink>
        </li>
        <li>
          <LeftNavLink to="" onClick={props.doSignOut} title="Sign Out">
            <span className="fas fa-sign-out-alt"></span> <LeftNavText>Sign Out</LeftNavText>
          </LeftNavLink>
        </li>
      </ul>

      <Search />
    </LeftNavContainer>
  );
};

export default LeftNav;