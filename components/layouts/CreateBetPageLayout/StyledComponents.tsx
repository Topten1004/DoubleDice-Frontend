// Utils
import styled from 'styled-components'
import { boulder, mirage } from 'styles/colors';


export const Layout = styled.div`
  height: 100vh;
`

export const Main = styled.main`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  height: 100%;
`;

export const Button = styled.button`
  position: absolute;
  top: 4rem;
  right: 4rem;
  width: 4.5rem;
  height: 4.5rem;
  border: 1px solid ${boulder};
  border-radius: 50%;
`;

export const IconLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  
  & svg{
    transition: all 0.2s ease-out;
  }

  &:hover svg{
    transform: scale(1.02);
  }
`;

export const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  z-index: 10;
  margin-top: 10rem;
`;

export const BackgroundImage = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  filter: blur(5px) brightness(0.4);
`;

export const LeftButton = styled.button`
  position: absolute;
  top: 50%;
  left: 3rem;
  transform: translateY(-50%);
  width: 5.5rem;
  height: 5.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${boulder};
  border-radius: 50%;
  z-index: 1000;
  background-color: ${mirage};

  &:hover svg{
    transition: all 0.1s ease-out;
    transform: scale(1.05);
  }
`;