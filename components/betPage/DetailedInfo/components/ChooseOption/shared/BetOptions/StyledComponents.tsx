// Utils
import { DropDown, Modal } from 'components/shared/SelectButton/StyledComponents'
import styled from 'styled-components'
import { alto, semiGray, confirmGreen, monza, mirage } from 'styles/colors'

interface BoxI {
  selected?: boolean
  isBetOpen?: boolean
}

interface CircleI extends BoxI {
  color: string
}


export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`

export const ButtonWrapper = styled.div`
  position: relative;
  background-color: ${semiGray};
  height: 6rem;
  padding: 1rem 1.6rem;
  border-radius: 1.2rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`

export const Box = styled.button<BoxI>`
  height: 5rem;
  width: 100%;
  background: ${props => props.selected ? confirmGreen : 'transparent'};
  border-radius: 0.5rem;
  padding: 1.2rem 1.6rem;
  transition: all 0.4s ease-out;
  display: flex;
  align-items: center;
  cursor: ${props => props.selected ? 'default' : 'pointer'};
  margin: 1rem 0;

  &:hover{
      background-color: ${props =>
    (props.selected) ? confirmGreen : 'rgba(45, 200, 91, 0.2)'
  };
  }
`

export const SelectedBox = styled(Box)`
  height: 5rem;
  width: calc(100% - 3.1rem);
  margin: 0;
  background-color: transparent;
  cursor: pointer;

  &:hover{
      background-color: transparent;
  }
`

export const OptionsDropDown = styled(DropDown)`
  right: 2.3rem;
  transform: scale(1.5);
`

export const Circle = styled.div<CircleI>`
  width: 1.2rem;
  min-width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  margin-right: 1.2rem;
  background: ${props => (props.selected) ? 'white' : props.color};
  transition: all 0.4s ease-out;
`

export const Number = styled.p`
  color: white;
  width: 2rem;
  margin-right: 1rem;
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 2.4rem;
  font-family: 'Poppins';
`

export const Description = styled.p`
  color: white;
  font-family: 'Poppins';
  font-size: 1.6rem;
  line-height: 2.4rem;
  overflow-wrap: anywhere;
`

export const ModalWrapper = styled(Modal)`
  top: 7rem;
  background-color: ${semiGray};
  padding: 1.6rem;
`

export const Text = styled.p`
  font-size: 1.6rem;
  color: ${alto};
`