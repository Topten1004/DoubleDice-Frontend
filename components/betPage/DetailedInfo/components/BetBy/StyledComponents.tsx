// Utils
import styled from 'styled-components'
import { doveGray } from 'styles/colors'

export const Wrapper = styled.div`

`

export const Title = styled.h1`
  font-size: 2rem;
  color: white;
  margin-bottom: 0.5rem;
`

export const Description = styled(Title)`
  font-size: 1.5rem;
  color: ${doveGray};
  text-transform: uppercase;
  margin-bottom: 0.5rem;
`
