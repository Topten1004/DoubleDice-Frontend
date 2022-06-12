// Utils
import styled from 'styled-components'
import { brightGray, supernova } from 'styles/colors'

interface ConfirmButtonI {
  isDisabled?: boolean
}

interface SecondaryButtonI {
  isDisabled?: boolean
}

export const Container = styled.main`
  display: flex;
  justify-content: center;
  width: 90rem;
  height: calc(100vh - 22.5rem);
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0;  /* Remove scrollbar space */
    background: transparent;  /* Optional: just make scrollbar invisible */
  }
`
export const Required = styled.span`
  color: #db3131;
  filter: brightness(1.2);
  display: inline;
`;

export const SectionWrapper = styled.div`
  margin-top: 3rem;
`

export const InputContainer = styled.div`
  width: 100%;
  margin-bottom: 3rem;
`

export const Title = styled.h5`
  color: white;
  font-size: 1.6rem;
  margin-bottom: 1rem;
`
export const Input = styled.input`
  color: white;
  height: 5rem;
  width: 100%;
  background-color: ${brightGray};
  border: none;
  border-radius: 0.5rem;
  padding: 1.5rem 2.5rem;
  font-size: 1.4rem;

  &::placeholder {
    color: white;
    opacity: 0.3;
  }
  
  &::-webkit-outer-spin-button,::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }

  &[type=number] {
      -moz-appearance:textfield; /* Firefox */
  }
`

export const ConfirmButton = styled.button<ConfirmButtonI>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  width: 100%;
  background-color:  ${supernova};
  border: none;
  border-radius: 0.5rem;
  font-size: 1.4rem;
  text-transform: uppercase;
  font-weight: 600;
  margin: 3.3rem 0 5rem;
  cursor: ${props => props.isDisabled ? 'default' : 'pointer'};
`

export const SecondaryButton = styled(ConfirmButton)<SecondaryButtonI>`
  background-color: transparent;
  border: 1px solid ${supernova};
  color: ${supernova};
  margin-top: 1.5rem;
  opacity: ${props => props.isDisabled ? 0.2 : 1};
  cursor: ${props => props.isDisabled ? 'default' : 'pointer'};
`

export const AddInputButton = styled.button`
  background-color: transparent;
  border: 0.2rem dashed white;
  opacity: 0.2;
  color: white;
  height: 5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  margin-top: 1rem;
`

export const Textarea = styled.textarea`
  color: white;
  height: 11.5rem;
  width: 100%;
  background-color:  ${brightGray};
  border: none;
  border-radius: 0.5rem;
  resize: none;
  padding: 1.5rem 2.5rem;
  font-size: 1.4rem;

  &::placeholder {
    color: white;
    opacity: 0.3;
  }
`
