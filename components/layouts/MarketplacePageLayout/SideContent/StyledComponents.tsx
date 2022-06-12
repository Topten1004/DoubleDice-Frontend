// Utils
import styled from 'styled-components'


export const AsideWrapper = styled.div`
  position: sticky;
  right: 0;
  top: 0;
  z-index: 1;
  padding: 0 3rem;
`;

export const AsideSubWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const DiscordWidget = styled.div`
  position: absolute;
  right: 0rem;
  top: 27rem;
  width: 10rem;
  transition: all 0.4s ease-out;


  @media only screen and (max-width: 1400px) {
   width: 25rem;
  }

  @media only screen and (max-width: 1000px) {
  width: 20rem;
  }

  @media only screen and (min-width: 1400px) {
   width: 35rem;
  }
`;