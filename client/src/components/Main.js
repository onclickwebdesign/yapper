import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Logo from './Logo';

const MainSection = styled.main`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.75rem;
`;

const SubTitle = styled.h4`
  font-size: 1.2rem;
  margin-top: 2rem;
`;

const Section = styled.section`
  padding: 0 4rem;
`;

const Main = props => {
  return (
    <MainSection>
      <Section className="no-auth">
        <ul>
          <li><span className="fa fa-hashtag"></span> Explore trending topics and interesting discussions.</li>
          <li><span className="fa fa-bookmark"></span> Save that intriguing topic for later review with a bookmark.</li> 
          <li><span className="fa fa-at"></span> Share with your friends with the "at username" functionality.</li> 
        </ul>
      </Section>

      <Section className="no-auth">
        <div>
          <Logo>Y</Logo>
          <Title>See what people are Yappin' about</Title>
          <SubTitle>Join Yapper today.</SubTitle>
          <Link to="/register" style={{width:'100%', marginBottom: '1rem'}} className="btn btn-primary yapper-btn-primary">Register</Link>
          
          <Link to="/login" style={{width:'100%'}} className="btn btn-primary yapper-btn-primary">Log in</Link>
        </div>
      </Section>
    </MainSection>
  );
};

export default Main;