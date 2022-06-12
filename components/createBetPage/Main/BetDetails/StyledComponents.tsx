// Utils
import styled from 'styled-components'
import { Input } from 'components/createBetPage/Main/StyledComponents'

interface InputSubContainerI {
  marginRight?: string
}

interface SubTitleI {
  marginBottom?: number
}

export const Container = styled.section`
  width: 35rem;
  height: fit-content;
  margin-top: 5rem;
  height: fit-content;
`

export const Required = styled.span`
  color: #db3131;
  filter: brightness(1.2);
  display: inline;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2rem 0;
  width: 100%;
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

export const NumberInput = styled(Input)`
  width: 100%;
  font-size: 1.4rem;
`

export const Text = styled.p`
  color: white;
  font-size: 1.2rem;
  opacity: 0.6;
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`