// Utils
import styled from 'styled-components'
import { mirage } from 'styles/colors'

export const SideBarContainer = styled.aside`
  position: fixed;
  right: 0;
  top: 0;
  width: 8rem;
  height: 100%;
  border-left: 1px rgba(255, 255, 255, 0.2) solid;
  background-color: ${mirage};
  z-index: 2000;
`

export const ProfileImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  border-bottom: 1px rgba(255, 255, 255, 0.2) solid;
`

export const GameImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding: 2rem;
  display: flex;
  justify-content: center;
  width: 100%;
  height: 8rem;
`

export const Image = styled.img`
  object-fit: contain;
`;