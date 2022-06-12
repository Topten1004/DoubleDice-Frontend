// Utils
import styled from 'styled-components'
import { alto, confirmGreen, ebonyClay, steelGray } from 'styles/colors'

interface InputI {
    inputLength: number
}

export const Container = styled.div`
  background: ${steelGray};
  border-radius: 1.7rem;
  padding: 2.5rem;
  max-width: fit-content;
  margin: 5rem auto 0;
  width: 60rem;
  min-width: 60rem;
  transition: all 0.4s ease-out;

  @media only screen and (max-width: 1000px) {
    width: 57rem;
    min-width: 57rem;
  }

  @media only screen and (max-width: 900px) {
    width: 47rem;
    min-width: 47rem;
  }
`

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.5rem;
`

export const Main = styled.main`

`

export const InputContainer = styled.div`
  margin-bottom: 2.5rem;
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
`

export const Title = styled.h1`
  font-size: 2.1rem;
  margin-right: 1rem;
`

export const Text = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  font-family: 'Poppins';
  color: white;
`

export const MessageWrapper = styled.div`
  margin-top: 1rem;
`

export const ATag = styled.a`
  color: white !important;
`