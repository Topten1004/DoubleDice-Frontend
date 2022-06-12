// Utils
import * as S from "./StyledComponents"
import * as SC from "../../StyledComponents"
import * as STC from 'components/createBetPage/Main/StyledComponents'
import InfoModal from "components/shared/infoModal";

interface PropsI {
  setMinimumBet: React.Dispatch<React.SetStateAction<string>>
  setMaximumBet: React.Dispatch<React.SetStateAction<string>>
  setRake: React.Dispatch<React.SetStateAction<string>>
  minimumBet: string
  maximumBet: string
  rake: string
}

const Main = ({ setMinimumBet, setMaximumBet, setRake, minimumBet, maximumBet, rake }: PropsI) => {

  return (
    <>
    <STC.SectionWrapper>
      <SC.Title>The size of the bets (Optional)</SC.Title>
      <SC.InputContainer>
        <S.InputSubContainer marginRight="2rem">
          <S.SubTitleContainer>
            <SC.SubTitle marginBottom={0}>Minimum bet</SC.SubTitle>
            <InfoModal description="If Minimum bet is left unspecified (by passing no value or the value 0), the effective minimum commitment (that will be enforced as a lower limit during commitment) will be 1 (e.g. 1 wei if the currency is ETH, or 0.000001 USDC if USDC)." />
          </S.SubTitleContainer>
          <SC.NumberInput
            type="number"
            min="0"
            placeholder="Any"
            onChange={(e) => setMinimumBet(e.target.value)}
            value={minimumBet}
          />
        </S.InputSubContainer>
        <S.InputSubContainer>
          <S.SubTitleContainer>
            <SC.SubTitle marginBottom={0}>Maximum bet</SC.SubTitle>
            <InfoModal description="If Maximum bet is left unspecified (by passing no value or the value 0), the effective maximum commitment will be infinite (essentially, no limit)" />
          </S.SubTitleContainer>
          <SC.NumberInput
            type="number"
            min="0"
            placeholder="Any"
            onChange={(e) => setMaximumBet(e.target.value)}
            value={maximumBet}
          />
        </S.InputSubContainer>
      </SC.InputContainer>

    </STC.SectionWrapper>
    <STC.SectionWrapper>
      <SC.Title>
        Rake (%)<SC.Required>*</SC.Required>
      </SC.Title>
      <SC.InputContainer>
        <S.InputSubContainer>
          <SC.NumberInput
            type="number"
            min="1"
            max="20"
            placeholder="1-20"
            onChange={(e) => setRake(e.target.value)}
            value={rake}
          />
        </S.InputSubContainer>
      </SC.InputContainer>
    </STC.SectionWrapper>
    
    </>
  );
};

export default Main;
