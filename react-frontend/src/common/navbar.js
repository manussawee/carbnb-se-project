import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Container from './container';
import logo from './carbnb.svg';
import NavbarBackground from '../assets/navbar-background.jpg';

const Bar = {
  Background: styled.div`
    background-color: ${props => props.theme.translucentBlack};
    background-image: url(${NavbarBackground});
    background-position: 50% 30%;
    background-repeat: no-repeat;
    background-size: cover;
    background-blend-mode: multiply;
    
  `,
  Container: styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 1160px;
    @media screen and (max-width: 1160px) {
      padding: 0 16px;
      width: auto;
    }
  `,
};

const NavMenu = styled.ul`
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const Expansion = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;
  padding-bottom: 3rem;
  @media screen and (max-width: 600px) {
    padding: 0;
  }
`;

const Clickable = styled.span`
  color: ${props => props.theme.green};
  cursor: pointer;
`;

const MenuButton = styled.img`
  display: none;
  width: 32px;
  height: 20px;
  cursor: pointer;
  @media screen and (max-width: 600px) {
    display: block;
  }
`;

const Navbar = ({ items, children, toggleMenu }) => (
  <Bar.Background>
    <Bar.Container>
      <Link to="/"><Clickable><img src={logo} alt="carbnb" width="150px" height="60px" /></Clickable></Link>
      <div>
        <NavMenu>
          { items }
        </NavMenu>
        <MenuButton onClick={toggleMenu} src="/asset/image/menu@2x.png" />
      </div>
    </Bar.Container>
    { children && (
      <Expansion>
        { children }
      </Expansion>
    )}
  </Bar.Background>
);

export default Navbar;
