import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Container from './container';
import logo from '../assets/logo/logo.png';
import logo2x from '../assets/logo/logo@2x.png';
import logo3x from '../assets/logo/logo@3x.png';

const Background = styled.footer`
  background-color: ${props => props.theme.black};
`;

const FooterContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1rem;
`;

const Brand = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  color: ${props => props.theme.white};
  font-size: 14px;
  font-weight: 500;

  p {
    margin-left: 0.375rem;
  }
`;

const Links = {
  Container: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 360px;    

    @media screen and (max-width: 600px) {
      width: 100%;
    }
  `,
  Column: styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 0.5rem;
  `,
  Header: styled.h6`
    color: ${props => props.theme.white};
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 0.25rem;
  `,
  Content: styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  `,
  Item: styled.li`
    margin-bottom: 0.25rem;
    color: ${props => props.theme.white};
    font-size: 14px;
    font-weight: 300;

    & + &:before {
      content: '•';
      margin-left: 0.5rem;
      margin-right: 0.5rem;
    }
  `,
};

const Footer = () => (
  <Background>
    <FooterContainer>
      <Brand>
        <img
          src={logo}
          srcSet={`${logo2x} 2x, ${logo3x} 3x`}
          alt="logo"
        />
        <p>© carbnb, Inc.</p>
      </Brand>
      <Links.Container>
        <Links.Column>
          <Links.Header>Location</Links.Header>
        </Links.Column>
        <Links.Column>
          <Links.Content>
            <Links.Item><Link to="/search/location=Bangkok">Bangkok</Link></Links.Item>
            <Links.Item><Link to="/search/location=Pattaya">Pattaya</Link></Links.Item>
            <Links.Item><Link to="/search/location=Chiang Mai">Chiang Mai</Link></Links.Item>
          </Links.Content>
        </Links.Column>
      </Links.Container>
      <Links.Container>
        <Links.Column>
          <Links.Header>Vehicle Type</Links.Header>
        </Links.Column>
        <Links.Column>
          <Links.Content>
            <Links.Item><Link to="/search/type=Car">Car</Link></Links.Item>
            <Links.Item><Link to="/search/type=Van">Van</Link></Links.Item>
            <Links.Item><Link to="/search/type=Motorcycle">Motorcycle</Link></Links.Item>
          </Links.Content>
        </Links.Column>
      </Links.Container>
    </FooterContainer>
  </Background>
);

export default Footer;
