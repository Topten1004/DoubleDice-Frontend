// Utils
import * as S from "./StyledComponents"
import * as SC from 'components/createBetPage/Main/StyledComponents'
import React from "react";

export interface HTMLInputEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}

interface PropsI {
  handleChange: React.Dispatch<React.SetStateAction<string>>
  startingPot: string
}

const StartingPot = ({ handleChange, startingPot }: PropsI) => {
  return (
    <SC.SectionWrapper>
      <SC.InputContainer>
        <SC.Title>Starting pot (optional)</SC.Title>
        <S.InputContainer>
          <S.PriceInput
            type="number"
            min="0"
            placeholder="0.0"
            onChange={(e) => handleChange(e.target.value)}
            value={startingPot}
          />
          <S.Prefix>$</S.Prefix>
        </S.InputContainer>
      </SC.InputContainer>
    </SC.SectionWrapper>
  );
};

export default StartingPot;
