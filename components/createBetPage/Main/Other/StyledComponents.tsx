// Utils
import styled from 'styled-components'
import { ConfirmButton } from 'components/createBetPage/Main/StyledComponents'
import { brightGray, supernova } from 'styles/colors'

interface CheckBoxI {
  checked: boolean
}

export const Container = styled.section`
  width: 35rem;
  height: fit-content;
  margin-top: 5rem;
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
  background: ${props => props.checked ? supernova : brightGray};
  border: none;
  border-radius: 3px;
  transition: all 150ms;

  ${Icon} {
    visibility: ${props => props.checked ? 'visible' : 'hidden'}
  }
`

export const CheckboxSubContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 1rem;
`

export const Text = styled.p`
  color: white;
  font-size: 1.4rem;
  font-family: 'Poppins';
`

export const Span = styled.span`
  color: ${supernova};
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

export const ButtonText = styled.p`

`