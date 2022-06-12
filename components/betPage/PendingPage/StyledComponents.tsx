// Utils
import styled from 'styled-components'
import { mirage } from 'styles/colors'


export const Wrapper = styled.section`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-bottom: 10rem;
  height: fit-content;
  background-color: ${mirage};
  border-radius: 1.2rem;
  padding: 2rem 4rem;
  display: flex;
  align-items: center;
  width: fit-content;
`

export const Text = styled.h3`
  color: white;
  font-size: 2.5rem;
  margin-right: 2rem;
`