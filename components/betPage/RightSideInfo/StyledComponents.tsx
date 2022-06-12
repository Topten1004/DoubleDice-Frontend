// Utils
import styled from 'styled-components'
import { boulder, confirmGreen } from 'styles/colors'

export const Wrapper = styled.aside``


export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 3rem;
  text-align: right;  
`

export const SubContainer = styled.div`
  margin-bottom: 2.5rem;
`

export const Title = styled.h1`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 0.5rem;
`

export const Description = styled(Title)`
  font-size: 2rem;
  color: white;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`

export const ResultDescription = styled(Description)`
  color: white;
  opacity: 0.6;
  font-family: 'Poppins';
  font-size: 1.8rem;
`

export const Span = styled.span`
  color: ${confirmGreen};
`

export const SubTitle = styled.p`
  color: white;
  opacity: 0.6;
  font-family: 'Poppins';
  font-size: 1.4rem;
`

export const MultiplierDescription = styled(Description)`
  color: ${confirmGreen};
`