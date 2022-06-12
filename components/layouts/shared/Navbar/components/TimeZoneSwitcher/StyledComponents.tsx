// Utils
import styled from 'styled-components'

export const Main = styled.div`
  display: flex;
  position: absolute;
  right: 20rem;
  top: 50%;
  transform: translateY(-50%);
`;

export const ButtonContainer = styled.button`
  position: relative;
`

export const Button = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border-radius: 6px;
  width: 15rem;
  height: 4rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  padding: 1rem 0 1rem 1.5rem;
`

export const Text = styled.h3`
  color: white;
  margin-right: 0.5rem;
  font-size: 1.2rem;
  font-family: 'Poppins';
`

export const TextSpan = styled.span`
  opacity: 0.5;
  font-family: 'Poppins';
`

export const DropDown = styled.div``

export const SearchContainer = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  border-radius: 6px;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;

  & svg{
    transition: all 0.2s ease-out;
  }

  &:hover svg{
    transform: scale(1.1);
  }
`