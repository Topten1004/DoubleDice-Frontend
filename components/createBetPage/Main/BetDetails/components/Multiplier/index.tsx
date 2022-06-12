// Utils
import * as S from "./StyledComponents"
import * as SC from '../../StyledComponents'
import * as STC from 'components/createBetPage/Main/StyledComponents'

// Components
import InfoModal from 'components/shared/infoModal'

interface PropsI {
  setMultiplier: React.Dispatch<React.SetStateAction<string>>;
  multiplier: string;
}

const Multiplier = ({ setMultiplier, multiplier }: PropsI) => {
  return (
    <STC.SectionWrapper>
      <S.TitleContainer>
        <SC.Title>
          Multiplier<SC.Required>*</SC.Required>
        </SC.Title>
        <InfoModal
          description="Include here the time incentive for
          early bets. Integer input between 2 and 99. Higher value
          incentivizes early bets."
        />
      </S.TitleContainer>
      <SC.InputContainer>
        <SC.NumberInput
          type="number"
          min="2"
          max="99"
          placeholder="2-99"
          onChange={(e) => setMultiplier(e.target.value)}
          value={multiplier}
        />
      </SC.InputContainer>
    </STC.SectionWrapper>
  );
};

export default Multiplier;
