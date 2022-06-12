// Utils
import styled from 'styled-components'
import { Input } from 'components/createBetPage/Main/StyledComponents'

interface InputSubContainerI {
  marginRight?: string
}

export const InputSubContainer = styled.div<InputSubContainerI>`
  margin-right: ${props => props.marginRight ? props.marginRight : '0'};
  width: 100%;
`

export const Rake = styled.div`
  padding-top: 3rem;
`  

export const SubTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;