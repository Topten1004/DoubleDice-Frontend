import styled from 'styled-components'


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
