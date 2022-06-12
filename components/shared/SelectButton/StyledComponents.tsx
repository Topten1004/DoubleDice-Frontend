// Utils
import styled from 'styled-components'
import { brightGray, mirage, supernova } from 'styles/colors'
import { ModalContainer } from 'styles/GlobalStyledComponents'

export const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`

export const Select = styled.button`
  position: relative;
  background-color: ${brightGray};
  color: white;
  height: 5rem;
  width: 100%;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  padding: 1.5rem 2.5rem;
`

export const Text = styled.p`
  font-size: 1.4rem;
`

export const DropDown = styled.div`
  position: absolute;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Modal = styled(ModalContainer)`
  position: absolute;
  left: 0;
  top: 6rem;
  width: 100%;
  padding: 2rem 0;
  max-height: 28rem;
  border: 1px ${mirage} solid;
  background-color:  ${brightGray};
  z-index: 100;
`

export const ModalButton = styled.button`
  color: white;
  padding: 2rem 2.5rem;
  width: 100%;
  text-align: left;
  transition: all 0.2s ease-out;
  background-color: ${brightGray};

  &:hover {
    background-color: #515277;
  }
`