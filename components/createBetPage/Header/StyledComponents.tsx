// Utils
import styled from 'styled-components'
import { barberry } from 'styles/colors'

interface StepI {
  isActive: boolean
  isSemiActive: boolean
}

interface TitleI {
  isActive: boolean
  clickable?: boolean
}

export const Container = styled.header`
  width: 110rem;
  margin-bottom: 3rem;
  
  @media only screen and (max-width: 1100px) {
    max-width: 100%;
  }
`

export const Title = styled.h1<TitleI>`
  color: white;
  font-size: ${props => props.isActive ? '2.5rem' : '1.5rem'};
  font-weight: bold;
  text-transform: uppercase;
  opacity: ${props => props.isActive ? 1 : 0.5};
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.clickable ? 'pointer' : 'default'};
`

export const StepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 23rem;
  margin: 3rem auto 0;
`

export const Step = styled.div<StepI>`
  transition: all 0.4s ease-out;
  opacity: ${props => props.isActive ? 1 : 0.2} ;
  width: 4rem;
  background-color: white;
  height: 0.5rem;
  background-color: ${props => (props.isActive || props.isSemiActive) ? barberry : ''};
`