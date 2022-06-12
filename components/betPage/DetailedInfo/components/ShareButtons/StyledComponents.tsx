// Utils
import styled from 'styled-components'
import { brightGray, doveGray, steelGray } from 'styles/colors'


export const Wrapper = styled.div`
  position: relative;
  background: ${steelGray};
  border-radius: 1.7rem;
  padding: 1rem;
  margin: 0 auto;
  width: 60rem;
  text-align: center;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 0.5rem;
  overflow: hidden;
  padding: 0.5rem;
`

export const CopyButton = styled(Button)`
  border-radius: 0;
  overflow: visible;
`

export const Title = styled.h6`
  color: white;
  font-size: 1.5rem;
  margin-bottom: 1rem;
`

export const Modal = styled.div`
  position: absolute;
  top: 4rem;
  left: 4rem;
  background-color: white;
  padding: 1rem;
  width: 10rem;
  border-radius: 0.5rem;
  z-index: 100;
`

export const ModalText = styled.p`
  font-size: 1.2rem;
  color: black;
  font-family: 'Poppins';
`