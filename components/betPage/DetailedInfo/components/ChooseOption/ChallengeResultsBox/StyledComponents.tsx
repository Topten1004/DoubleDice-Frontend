// Utils
import styled from 'styled-components'
import { monza } from 'styles/colors'

interface WrapperButtonI {
  isOpen: boolean
}

export const WrapperButton = styled.button<WrapperButtonI>`
  position: relative;
  background: #1F202E;
  border-radius: 1.7rem;
  padding: 2.5rem;
  margin: 5rem auto 0;
  width: 60rem;
  cursor: ${props => props.isOpen ? 'default' : 'pointer'};
  display: block;
  text-align: left;
`

export const Header = styled.header`
  position: relative;
  width: 100%;
  text-align: center;
  font-size: 1.7rem;
  color: white;
`

export const CloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
`

export const Title = styled.h6`
  color: white;
  font-size: 1.5rem;
`

export const Text = styled.p`
    color: white;
    font-size: 1.2rem;
    margin-top: 1rem;
    margin-left: 1rem;
`

export const TextArea = styled.textarea`
  resize: none;
  padding: 2rem;
  width: 100%;
  height: calc(100% - 11rem);
  margin-top: 2rem;
  border-radius: 1rem;
  font-family: "Poppins";
`

export const ButtonWrapper = styled.div`
  button{
    height: 5rem !important;
  }
`

export const TextContainer = styled.div`
  position: relative;
  display: flex;
`

export const SelectWrapper = styled.div`
  position: relative;
  margin-top: 3rem;
`

export const SelectSubWrapper = styled.div`
  position: relative;
  margin: 2rem 0;
`

export const TextWrapper = styled.div`
  position: relative;
  margin: 4rem 0 1rem;
`

export const WarningSign = styled.p`
  color: #db3131;
  filter: brightness(1.2);
  position: absolute;
  left: 0;
  top: -0.2rem;
`