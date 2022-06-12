import { useState, useLayoutEffect } from "react"

// Redux
import { useAppDispatch, useAppSelector } from "components/hooks/reduxHooks"
import { setFormData } from "components/createBetPage/ducks";

// Utils
import { toast } from "react-toastify"
import moment from 'moment-timezone'

// Components
import DateOfBets from "./components/DateOfBets"
import SizeOfBets from "./components/SizeOfBets"
import Multiplier from "./components/Multiplier"
import * as S from "./StyledComponents"
import * as SC from 'components/createBetPage/Main/StyledComponents'

interface PropsI {
  nextStep: () => void;
}

const BetDetails = ({ nextStep }: PropsI) => {
  const [tOpen, setTOpen] = useState<number>(0)
  const [tClose, setTClose] = useState<number>(0)
  const [tResolve, setTResolve] = useState<number>(0)
  const [minimumBet, setMinimumBet] = useState<string>("")
  const [maximumBet, setMaximumBet] = useState<string>("")
  const [rake, setRake] = useState<string>("")
  const [multiplier, setMultiplier] = useState<string>("")

  const createBetForm = useAppSelector((state) => state.createBetReducer)
  const dispatch = useAppDispatch()

  const toggleNextStep = () => {

    const currentTime = Math.floor(moment().unix());

    if (tOpen < currentTime) {
      toast.error("Bet start time is in the past");
      return;
    }

    if (tClose < currentTime) {
      toast.error("Bet close time is in the past");
      return;
    }

    if (tResolve < currentTime) {
      toast.error("Bet resolve time is in the past");
      return;
    }

    if (tOpen === 0) {
      toast.error("Bet start time is required");
      return;
    }

    if (tClose === 0) {
      toast.error("Bet close time is required");
      return;
    }

    if (tClose < tOpen) {
      toast.error("Bet close time must be after the bet start time");
      return;
    }

    if (tResolve === 0) {
      toast.error("Bet resolve time is required");
      return;
    }
    
    if (tResolve < tClose) {
      toast.error("Bet resolve time should not be before the bet close time");
      return;
    }

    if (minimumBet && Number(minimumBet) < 0) {
      toast.error("Minimum bet amount can not be negative");
      return;
    }

    if (maximumBet && Number(maximumBet) < 0) {
      toast.error("Maximum bet amount can not be negative");
      return;
    }

    if (Number(minimumBet) !== 0 && Number(maximumBet) !== 0) {
      if (Number(minimumBet) > Number(maximumBet)) {
        toast.error("Minimum bet amount can not be more than maximum bet");
        return;
      }
    }

    if (Number(rake) < 1 || Number(rake) > 20) {
      toast.error("Rake must be between 1 and 20");
      return;
    }

    if (Number(multiplier) < 2 || Number(multiplier) > 99) {
      toast.error("Multiplier must be between 2 and 99");
      return;
    }

    
    dispatch(
      setFormData({
        tOpen: moment(moment(moment.unix(tOpen)).utc().format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD HH:mm:ss').unix(),
        tClose: moment(moment(moment.unix(tClose)).utc().format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD HH:mm:ss').unix(),
        tResolve: moment(moment(moment.unix(tResolve)).utc().format('YYYY-MM-DD HH:mm:ss'), 'YYYY-MM-DD HH:mm:ss').unix(),
        minimumBet,
        maximumBet,
        rake,
        multiplier,
      })
    );
    nextStep()
  };

  useLayoutEffect(() => {
    const currentTime = Math.floor(moment().unix());
    if (createBetForm) {
      if (createBetForm.tOpen) {
        let localTOpen
        localTOpen = moment.utc(moment.unix(createBetForm.tOpen).format('YYYY-MM-DD HH:mm:ss')).tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss')
        localTOpen = moment(localTOpen, 'YYYY-MM-DD HH:mm:ss').unix()
        setTOpen(localTOpen)
      }
      if (createBetForm.tClose) {
        let localTClose
        localTClose = moment.utc(moment.unix(createBetForm.tClose).format('YYYY-MM-DD HH:mm:ss')).tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss')
        localTClose = moment(localTClose, 'YYYY-MM-DD HH:mm:ss').unix()
        setTClose(localTClose)
      }
      if (createBetForm.tResolve) {
        let localTResolve
        localTResolve = moment.utc(moment.unix(createBetForm.tResolve).format('YYYY-MM-DD HH:mm:ss')).tz(moment.tz.guess()).format('YYYY-MM-DD HH:mm:ss')
        localTResolve = moment(localTResolve, 'YYYY-MM-DD HH:mm:ss').unix()
        setTResolve(localTResolve)
      }
      if (createBetForm.minimumBet) setMinimumBet(createBetForm.minimumBet)
      if (createBetForm.maximumBet) setMaximumBet(createBetForm.maximumBet)
      if (createBetForm.rake) setRake(createBetForm.rake)
      if (createBetForm.multiplier) setMultiplier(createBetForm.multiplier)
    }
    if (!createBetForm.tOpen) setTOpen(moment.unix(currentTime).add(1, 'day').unix());
    if (!createBetForm.tClose) setTClose(moment.unix(currentTime).add(1, 'month').unix());
    if (!createBetForm.tResolve) setTResolve(moment.unix(currentTime).add(2, 'month').unix());

  }, [createBetForm])

  return (
    <S.Container>
      <DateOfBets
        setTOpen={setTOpen}
        setTClose={setTClose}
        setTResolve={setTResolve}
        tOpen={tOpen}
        tClose={tClose}
        tResolve={tResolve}
      />
      <SizeOfBets
        setMinimumBet={setMinimumBet}
        setMaximumBet={setMaximumBet}
        setRake={setRake}
        minimumBet={minimumBet}
        maximumBet={maximumBet}
        rake={rake}
      />
      <Multiplier setMultiplier={setMultiplier} multiplier={multiplier} />
      <SC.ConfirmButton onClick={toggleNextStep}>Next Step</SC.ConfirmButton>
    </S.Container>
  );
};

export default BetDetails;
