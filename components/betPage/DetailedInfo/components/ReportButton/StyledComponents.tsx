// Utils
import styled from 'styled-components'
import { boulder, charade, ebonyClay, mirage, monza } from 'styles/colors'
import { ModalContainer } from 'styles/GlobalStyledComponents'

interface CheckBoxI {
  checked: boolean
}

export const Container = styled.div`
  position: relative;
  margin-top: 2rem;
  padding: 0 2rem;
  z-index: 100;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export const SubContainer = styled.div`
  position: relative;
  width: fit-content;
`

export const Modal = styled(ModalContainer)`
  position: absolute;
  right: 0;
  bottom: 3rem;
  width: 30rem;
  z-index: 100;
  padding: 2rem;
  background-color: ${charade};
  border: 1px ${mirage} solid;
`

export const ConfirmButton = styled.button`
  border-radius: 1rem;
  color: white;
  height: 4rem;
  width: 100%;
  background-color: ${monza};
  margin-top: 1rem;
`

export const CheckboxContainer = styled.div`
  margin: 2rem 0;
`

export const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  border: 0;
  clip: rect(0 0 0 0);
  clippath: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
  width: 1px;
`

export const Icon = styled.svg`
  fill: none;
  stroke: white;
  stroke-width: 2px;
`

export const StyledCheckbox = styled.div<CheckBoxI>`
  display: inline-block;
  width: 16px;
  height: 16px;
  background: ${props => props.checked ? 'salmon' : boulder};
  border: none;
  border-radius: 3px;
  transition: all 150ms;

  ${HiddenCheckbox}:focus + & {
    box-shadow: 0 0 0 3px pink;
  }

  ${Icon} {
    visibility: ${props => props.checked ? 'visible' : 'hidden'}
  }
`

export const CheckboxSubContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`

export const Span = styled.span`
  color: white;
  font-size: 1.2rem;
  font-family: 'Poppins';
`

export const Title = styled.h3`
  color: white;
  margin-bottom: 1rem;
  font-size: 1.4rem;
`

export const Label = styled.label`
  display: flex;
  cursor: pointer;
`

export const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  height: 10rem;
  border-radius: 1rem;
  outline: none;
  padding: 1rem;
  font-family: 'Poppins';
`

export const IconButton = styled.button`
  display: flex;
  align-items: center;
`