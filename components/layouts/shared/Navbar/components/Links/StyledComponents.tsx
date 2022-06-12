// Utils
import styled, { keyframes } from 'styled-components'
import { boulder } from 'styles/colors';

export const rotate = keyframes`
  from{ transform: rotate(-360deg); }
  to{ transform: rotate(360deg); }
`;

export const Main = styled.div`
  position: absolute;
  left: 20rem;
  top: 50%;
  transform: translate(0, -50%);
`

export const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`

export const Text = styled.p`
  white-space: nowrap;
  transition: all 0.4s ease-out;
  color: ${boulder};
  font-size: 1.5rem;
  font-family: 'Russo One';
  text-transform: uppercase;
`

export const ImageContainer = styled.div`
  margin-right: 1rem;
`