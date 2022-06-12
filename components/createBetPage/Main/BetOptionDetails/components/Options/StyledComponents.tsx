// Utils
import styled from 'styled-components'
import { brightGray } from 'styles/colors'
import { ConfirmButton } from 'components/createBetPage/Main/StyledComponents'

export const Container = styled.section`
  margin-bottom: 2rem;
`

export const Options = styled.div``

export const Option = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 5rem;
  width: 100%;
  background-color: ${brightGray};
  border: none;
  border-radius: 0.5rem;
  padding: 1.5rem 2.5rem;
  font-size: 1.4rem;  
  margin-bottom: 1rem;
`

export const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const InputSubContainer = styled.div`
  width: calc(100% - 7rem);
`

export const AddButtonContainer = styled.div`
  width: 6rem;
`

export const AddButton = styled(ConfirmButton)`
  margin: 0 !important;
`

export const RemoveButton = styled.button`
  display: flex;
  align-items: center;
`

export const Text = styled.p`
  color: white;
`