// Utils
import styled from 'styled-components'
import { Input } from 'components/createBetPage/Main/StyledComponents'

export const Container = styled.section`
  width: 35rem;
  height: fit-content;
  margin-top: 5rem;
`

export const InputContainer = styled.div`
  position: relative;
`

export const PriceInput = styled(Input)`
  position: relative;
  padding-left: 3.5rem;
`

export const Prefix = styled.p`
  position: absolute;
  top: 50%;
  left: 2rem;
  transform: translateY(-50%);
  color: white;
  font-size: 1.4rem;
  opacity: 0.3;
`

export const ButtonContainer = styled.div`
  margin-bottom: 5rem;
`

export const ImageInputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const InputSubContainer = styled.div`
  width: 100%;
  margin: 2rem 0;
`