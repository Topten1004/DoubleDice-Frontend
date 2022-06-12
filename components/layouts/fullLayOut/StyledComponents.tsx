import styled from 'styled-components'
import { ebonyClay } from 'styles/colors'


export const FullLayoutContainer = styled.div`
  position: relative;
  background-color: ${ebonyClay};
  height: 100vh;
  display: flex;
  justify-content: center;

  & * {
    font-family: 'Russo One';
    font-weight: 400;
  }
`

export const BackgroundImage = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/mock/gameBackground2.png");
  background-size: cover;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  filter: blur(5px);
`

export const Main = styled.main`
  position: relative;
  margin-top: 10rem;
  height: calc(100% - 10rem);
  width: calc(100%);
  z-index: 10;
  overflow-y: overlay;
  overflow-x: hidden;

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: rgba(206, 206, 206, 0.3);
  }
  
  &::-webkit-scrollbar-thumb{
    background-color: rgba(206, 206, 206, 0.8);
    border-radius: 2px;
  }
`

export const SubMain = styled.div`
  height: fit-content;
  max-width: 1440px;
  margin: 0 auto;
`

export const Content = styled.div`
  position: relative;
  height: 100%;
  width: fit-content;
  z-index: 1;
  width: 101rem;
  transition: all 0.4s ease-out;
  padding: 0 3rem 2rem;

  @media only screen and (max-width: 1300px) {
    width: 86rem;
  }

  @media only screen and (max-width: 1200px) {
    width: 76rem;
  }

  @media only screen and (max-width: 1000px) {
    width: 66rem;
  }

  @media only screen and (max-width: 900px) {
    width: 56rem;
  }
`
