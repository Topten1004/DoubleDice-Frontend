// Utils
import styled from 'styled-components'

interface InputSubContainerI {
  marginRight?: string
}

export const InputSubContainer = styled.div<InputSubContainerI>`
  margin-right: ${props => props.marginRight ? props.marginRight : '0'};
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`