// Utils
import styled from 'styled-components'
import { confirmGreen } from 'styles/colors'

interface ConfirmButtonI {
  backgroundColor?: string
  isDisabled?: boolean
}

export const Button = styled.button<ConfirmButtonI>`
  width: 100%;
  height: 6rem;
  border-radius: 0.5rem;
  background-color: ${props => props.backgroundColor ? props.backgroundColor : confirmGreen};
  transition: all 0.4s ease-out;
  color: white;
  font-size: 1.6rem;
  font-family: 'Poppins';
  font-weight: bold;
  text-transform: uppercase;
  z-index: 20;
  cursor: ${props => props.isDisabled ? 'default' : 'pointer'};
  padding: 0 2rem;
`

export const TextWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`