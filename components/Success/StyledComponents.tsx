// Utils
import styled from 'styled-components'
import { ConfirmButton, Input, SecondaryButton } from 'components/createBetPage/Main/StyledComponents'
import { brightGray } from 'styles/colors'

export const Wrapper = styled.section`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
  overflow-x: hidden;


  @media only screen and (max-height: 500px) {
    align-items: flex-start;
  }
`

export const SubWrapper = styled.div`
  position: relative;
  color: white;
  width: 40rem;
  text-align: center;

  @media only screen and (max-height: 500px) {
    margin: 5rem 0;
  }
`

export const LinksWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 2.5rem;
`

export const Emoji = styled.h1`
  font-size: 5rem;;
`

export const Title = styled.h1`
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 2.2rem;
  text-transform: uppercase;
  line-height: 40px;
  letter-spacing: 0.15rem;
`

export const Description = styled.h6`
  font-weight: 600;
  font-size: 1.2rem;
  margin-bottom: 4rem;
`

export const ShareTitle = styled.h6`
  font-weight: 600;
  font-size: 1.2rem;
  margin-top: 3rem;
  margin-bottom: 1rem;
`

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

export const ReadOnlyInput = styled(Input)`
  border-radius: 0.5rem 0 0 0.5rem;
  width: calc(100% - 5rem);
  padding-right: 0;
`

export const CopyButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;  
  background-color: ${brightGray};
  border-radius: 0 0.5rem 0.5rem 0;
  width: 5rem;
  height: 5rem;
`

export const IconsContainer = styled.div`
  display: flex;
  margin: 1rem 0;

`

export const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin: 0 1rem;
`

export const ATag = styled.a`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LinkToRoomButton = styled(ConfirmButton)`
  margin-bottom: 0rem;
`

export const LinkToMainButton = styled(SecondaryButton)`
  margin-bottom: 0rem;
`