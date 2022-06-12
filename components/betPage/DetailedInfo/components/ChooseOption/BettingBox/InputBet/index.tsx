import { useRef, useState } from "react";

// Components
import * as S from "./StyledComponents";
import * as SC from "../../shared/StyledComponents";
import InfoModal from 'components/shared/infoModal'

// Utils
import { calculateBeta, validateAmountPrecision } from "utils/helpers";
import { Bet } from "utils/types";
import { VirtualFloor } from "lib/graph";

interface PropsI {
  chosenBet: Bet | null
  virtualFloor: VirtualFloor
  inputValue: string
  setInputValue: React.Dispatch<React.SetStateAction<string>>
}

const InputBet = ({ chosenBet, virtualFloor, setInputValue, inputValue }: PropsI) => {
  const inputRef = useRef<HTMLInputElement>(null);

  let beta;
  if (chosenBet) {
    beta = calculateBeta(
      Number(chosenBet.virtualFloor.tOpen),
      Number(chosenBet.virtualFloor.tClose),
      chosenBet.virtualFloor.betaOpen
    );
  }

  const handleInputChange = (e: any) => {
    const correctInputValue = validateAmountPrecision(e.target.value, virtualFloor.paymentToken.decimals);
    setInputValue(correctInputValue);
  }


  return (
    <S.Container>
      <S.TitleContainer>
        <SC.Title>
          {virtualFloor.paymentToken.symbol}
        </SC.Title>
      </S.TitleContainer>
      <S.SubContainer onClick={() => inputRef.current?.focus()}>
        <S.InputBox>
          <S.Input
            ref={inputRef}
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            placeholder='0'
            min='0'
          />
        </S.InputBox>
        <S.Ratio>
          <S.RatioText>{beta ? beta.toFixed(2) : 0}X</S.RatioText>
          <InfoModal
            description='This is the early betting advantage you have in terms of
                        the relative returns compared to the last bet taking place.
                        The earlier you bet the higher your return (when correct).'
          />
        </S.Ratio>
      </S.SubContainer>
    </S.Container>
  );
};

export default InputBet;
