// Utils
import styled from "styled-components";
import { confirmGreen } from "styles/colors";

export const ButtonWrapper = styled.div`
  width: fit-content;
`;

export const ConfirmButton = styled.button`
  width: 12rem;
  height: 4rem;
  border-radius: 0.5rem;
  background-color: ${confirmGreen};
  transition: all 0.4s ease-out;
  color: white;
  font-size: 1.1rem;
  font-family: "Poppins";
  font-weight: bold;
  text-transform: uppercase;
  z-index: 20;
`;