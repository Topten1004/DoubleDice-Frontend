// Utils
import styled, { keyframes } from 'styled-components'
import { boulder, mirage } from 'styles/colors';

export const rotate = keyframes`
  from{ transform: rotate(-360deg); }
  to{ transform: rotate(360deg); }
`;

export const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: calc(100%);
  height: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${mirage};
  z-index: 100000;
`

export const Main = styled.main`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1440px;
  padding: 0 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const ImageContainer = styled.div`
  position: relative; 
  width: 96px;
  height: 60px;
`

export const NavButtonsContainer = styled.div`
  position: absolute;
  left: 47%;
  top: 50%;
  transform: translate(-50%, -50%);
`

export const NavButtonsSubContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const NavButton = styled.button`
  color: white;
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;

  & g{
      transition: all 0.4s ease-out;
      transform-origin: center;
    }

  &:hover p{
      color: white;
    }

  &:hover g{
      animation: ${rotate} 5s infinite linear;
      opacity: 1;
    }

  &:hover path{
      opacity: 1;
    }
`

export const ButtonText = styled.p`
  white-space: nowrap;
  transition: all 0.4s ease-out;
  color: ${boulder};
  font-size: 1.5rem;
  font-family: 'Russo One';
`

export const NavbarButtonImage = styled.div`
  margin-right: 1rem;
`

export const Button = styled.button`
  color: white;
  display: flex;
  align-items: center;
  padding: 1.5rem 2rem;

  & g{
      transition: all 0.4s ease-out;
      transform-origin: center;
    }

  &:hover p{
      color: white;
    }

  &:hover g{
      animation: ${rotate} 5s infinite linear;
      opacity: 1;
    }

  &:hover path{
      opacity: 1;
    }
`