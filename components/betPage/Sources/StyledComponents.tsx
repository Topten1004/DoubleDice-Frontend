// Utils
import styled from 'styled-components'
import { charade, mirage } from 'styles/colors'


export const Wrapper = styled.section`
  width: 100%;
  margin: 5rem auto;
  height: fit-content;
  background-color: ${mirage};
  border-radius: 1.2rem;
  padding: 2rem 3rem;
`

export const Title = styled.h2`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 4rem;
`

export const SourceWrapper = styled.div`
  border-radius: 0.5rem;
  margin: 2rem 0;
  width: 100%;
  background-color: ${charade};
  padding: 2rem;
`

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
`

export const Link = styled.a`
  color: white;
  font-size: 1.6rem;
  font-family: 'Poppins';
  overflow-wrap: anywhere;
`

export const TitleText = styled.p`
  color: white;
  font-size: 1.6rem;
  font-family: 'Poppins';
`

export const Text = styled.p`
  color: white;
  font-size: 1.8rem;
  font-family: 'Poppins';
  margin-right: 2rem;
`