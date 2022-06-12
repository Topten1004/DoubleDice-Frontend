// Utils
import styled from "styled-components";
import { lav2 } from "styles/colors";


interface WrapperI {
  isLocked: boolean
}

export const Wrapper = styled.div<WrapperI>`
  position: absolute;
  right: 17rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  min-width: 4rem;
  padding: 0.5rem;
  height: 4rem;
  background-color: ${lav2};
  border-radius: 0.5rem;
  color: white;
  cursor: ${props => props.isLocked ? 'not-allowed' : 'help'};
`;

export const Text = styled.p`
  font-size: 1.5rem;
`;

export const ModalWrapper = styled.div`
  position: absolute;
  top: 4rem;
  left: 0;
  width: 22rem;
  z-index: 100;
  padding-top: 1rem;
`;

export const ModalMain = styled.main`
  position: relative;
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  width: 100%;
`;

export const ModalLink = styled.a`
  font-size: 1.2rem;
  color: black;
  font-family: "Poppins";
  padding-bottom: 0.5rem;
  font-weight: 600;
`;

export const ModalTitle = styled.h3`
  font-size: 1.2rem;
  color: black;
  font-family: 'Poppins' !important;
  padding-bottom: 0.5rem;
  font-weight: 700 !important;
`;

export const ModalText = styled.p`
  font-size: 1.2rem;
  color: black;
  font-family: 'Poppins' !important;
  font-weight: 400;
`