import { useEffect, useRef } from "react"

// Redux
import { useAppDispatch, useAppSelector } from "components/hooks/reduxHooks"
import { setStep } from "./ducks";

// Components
import CreateBetPageLayout from "components/layouts/CreateBetPageLayout"
import Header from "components/createBetPage/Header"
import * as S from './StyledComponents'
import ConnectWallet from './Main/ConnectWallet'
import ChooseCategory from './Main/ChooseCategory'
import EventInformation from './Main/EventInformation'
import BetDetails from './Main/BetDetails'
import BetOptionDetails from './Main/BetOptionDetails'
import Other from './Main/Other'

const CreateBet = () => {
  const { step } = useAppSelector((state) => state.createBetReducer)
  const dispatch = useAppDispatch()

  const mainRef = useRef<HTMLDivElement>(null)

  let renderContent = <></>;
  switch (step) {
    case 0:
      renderContent = <ConnectWallet nextStep={() => dispatch(setStep(1))} />;
      break;
    case 1:
      renderContent = (
        <ChooseCategory nextStep={() => dispatch(setStep(2))} />
      );
      break;
    case 2:
      renderContent = (
        <EventInformation nextStep={() => dispatch(setStep(3))} />
      );
      break;
    case 3:
      renderContent = (
        <BetOptionDetails nextStep={() => dispatch(setStep(4))} />
      );
      break;
    case 4:
      renderContent = (
        <BetDetails nextStep={() => dispatch(setStep(5))} />
      );
      break;
    case 5:
      renderContent = <Other />;
      break;
    default:
      break;
  }

  useEffect(() => {
    if (mainRef.current && step) mainRef.current.scrollTo(0, 0);
  }, [step])

  return (
    <CreateBetPageLayout>
      <>
        <S.Header>
          <Header />
        </S.Header>
        <S.Main ref={mainRef}>
          {renderContent}
        </S.Main>
      </>
    </CreateBetPageLayout>
  );
};

export default CreateBet;
