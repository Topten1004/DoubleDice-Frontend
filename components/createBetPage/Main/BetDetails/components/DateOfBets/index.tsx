// Utils
import * as S from "./StyledComponents"
import * as SC from '../../StyledComponents'

// Components
import DateAndTimeInput from './DateAndTimeInput'

interface PropsI {
  setTOpen: React.Dispatch<React.SetStateAction<number>>
  setTClose: React.Dispatch<React.SetStateAction<number>>
  setTResolve: React.Dispatch<React.SetStateAction<number>>
  tOpen: number
  tClose: number
  tResolve: number
}

const Main = ({ setTOpen, setTClose, setTResolve, tOpen, tClose, tResolve, }: PropsI) => {
  return (
    <section>
      <SC.Title>Date of bets <S.Span>(Local timezone)</S.Span></SC.Title>
      <S.InputContainer>
        <SC.SubTitle>
          Bet start<SC.Required>*</SC.Required>
        </SC.SubTitle>
        <DateAndTimeInput setTimestamp={setTOpen} value={tOpen} />
      </S.InputContainer>
      <S.InputContainer>
        <SC.SubTitle>
          Bet end<SC.Required>*</SC.Required>
        </SC.SubTitle>
        <DateAndTimeInput setTimestamp={setTClose} value={tClose} />
      </S.InputContainer>
      <S.InputContainer>
        <SC.SubTitle>
          End of the event<SC.Required>*</SC.Required>
        </SC.SubTitle>
        <DateAndTimeInput setTimestamp={setTResolve} value={tResolve} />
      </S.InputContainer>
    </section>
  );
};

export default Main;
