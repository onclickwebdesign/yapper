import React from 'react';
import Logo from '../Logo';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Search from './Search';

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
`;

const faStyles = {
  marginRight: 10
};

const active = {
  color: '#007bff'
};

const LeftNav = props => {
  return (
    <nav style={{width:200, position:'fixed'}}>
      <ul>
        <li>
          <LeftNavLink style={{padding:'0 0.85rem', margin:'0.5rem 0 0 0.65rem', borderRadius:35}} to="/">
            <Logo fontSize="2.25rem" />
          </LeftNavLink>
        </li>
        <li>
          <LeftNavLink activeStyle={active} exact to="/">
            <span style={faStyles} className="fa fa-home"></span> Home
          </LeftNavLink>
        </li>
        <li><LeftNavLink activeStyle={active} to="/explore"><span style={faStyles} className="fa fa-hashtag"></span> Explore</LeftNavLink></li>
        <li><LeftNavLink activeStyle={active} to="/notifications"><span style={faStyles} className="fa fa-bell"></span> Notifications</LeftNavLink></li>
        <li><LeftNavLink activeStyle={active} to="/messages"><span style={faStyles} className="fa fa-envelope"></span> Messages</LeftNavLink></li>
        <li><LeftNavLink activeStyle={active} to="/favorites"><span style={faStyles} className="fa fa-bookmark"></span> Favorites</LeftNavLink></li>
        <li>
          <LeftNavLink activeStyle={active} to="/profile">
            <span style={faStyles} className="fa fa-user"></span> Profile
          </LeftNavLink>
        </li>
      </ul>

      <Search />
    </nav>
  );
};

export default LeftNav;