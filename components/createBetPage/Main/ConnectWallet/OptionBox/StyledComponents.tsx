// Utils
import styled from 'styled-components'
import { confirmGreen, ebonyClay } from 'styles/colors'

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 20.4rem;
  height: 14.8rem;
  background-color: white;
  border-radius: 2rem;
  margin: 1rem;
  border: 0.4rem solid ${ebonyClay};
  
  &:hover{
    transition: all 0.1s ease-out;
    outline: 3px rgba(255, 255, 255, 0.3) solid;
  }

  &:focus{
    transition: all 0.1s ease-out;
    outline: 3px ${confirmGreen} solid;
  }
`

export const Title = styled.p`
  margin-top: 3rem;
  font-size: 1.6rem;
  text-transform: uppercase;
  font-weight: 600;
  font-family: 'Poppins';
`