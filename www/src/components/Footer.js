import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.5rem 0;
  text-align: center;
  width: 100%;
  border-top: 1px solid #fff;
`;

const FooterLinks = styled.ul`
  display: flex;
  justify-content: space-around;
`;

const FooterLink = styled(Link)`
  font-size: 0.75rem;
  color: #fff;
  opacity: 0.75;
  &:hover {
    color: #fff;
    opacity: 1;
  }
`;

const ButtonLink = styled.button`
  font-size: 0.75rem;
  color: #fff;
  opacity: 0.75;
  background: transparent;
  border: none;
  &:hover {
    opacity: 1;
  }
`;

const Footer = props => {
  return (
    <FooterContainer>
      <FooterLinks>
        <li><FooterLink to="/about">About</FooterLink></li>
        <li><FooterLink to="/terms-of-service">Terms</FooterLink></li>
        <li><FooterLink to="/jobs">Jobs</FooterLink></li>
        <li><FooterLink to="/cookies">Cookies</FooterLink></li>
        <li><FooterLink to="/advertise">Advertise</FooterLink></li>
        <li><FooterLink to="/developers">Developers</FooterLink></li>
        <li><ButtonLink onClick={props.toggleDarkMode}>{props.isDark ? `Light Mode` : `Dark Mode`}</ButtonLink></li>
        <li><ButtonLink>&copy; 2019 Yapper</ButtonLink></li>
      </FooterLinks>
    </FooterContainer>
  );
};

export default Footer;