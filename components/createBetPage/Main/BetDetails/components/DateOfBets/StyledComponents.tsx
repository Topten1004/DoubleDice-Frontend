// Utils
import styled from 'styled-components'
import { Input } from 'components/createBetPage/Main/StyledComponents'

interface InputSubContainerI {
  marginRight?: string
}

interface SubTitleI {
  marginBottom?: number
}

export const InputContainer = styled.div`
  margin: 2rem 0;
`

export const InputSubContainer = styled.div<InputSubContainerI>`
  margin-right: ${props => props.marginRight ? props.marginRight : '0'};
`

export const Title = styled.h3`
  color: white;
  font-weight: 600;
  font-size: 1.6rem;
  line-height: 2rem;
`

export const SubTitle = styled.h6<SubTitleI>`
  color: white;
  font-weight: 600;
  font-size: 1.2rem;
  line-height: 2rem;
  margin-bottom: ${props => (props.marginBottom || props.marginBottom === 0) ? props.marginBottom : '1rem'} ;
`

export const DateInput = styled(Input)`
  font-size: 1.4rem;
  width: calc(100% - 13.6rem);
  text-transform: uppercase;
  &::-webkit-datetime-edit-text {     
    font-family: 'Poppins';
    font-size: 1.4rem;
  }
  &::-webkit-datetime-edit-month-field {
    font-family: 'Poppins';    
    font-size: 1.4rem;
   }
  &::-webkit-datetime-edit-day-field {
    font-family: 'Poppins';    
    font-size: 1.4rem;
   }
  &::-webkit-datetime-edit-year-field { 
    font-family: 'Poppins';    
    font-size: 1.4rem;
  }
  &::-webkit-inner-spin-button { display: none; }
  &::-webkit-calendar-picker-indicator { 
    filter: invert(0.8);
    cursor: pointer;
   }
`

export const TimeInput = styled(Input)`
  width: 11.6rem;
  font-size: 1.4rem;
  padding: 0;
  text-align: center;
  text-transform: uppercase;
  &::-webkit-calendar-picker-indicator {
    display: none;
  }
  &::-webkit-clear-button {
    display: none;
  }
  &::-webkit-inner-spin-button {
    display: none;
  }
`

export const DateAndTimeInputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Span = styled.span`
  
`