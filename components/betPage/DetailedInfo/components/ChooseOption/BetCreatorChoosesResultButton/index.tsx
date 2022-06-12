import { useState } from "react"

// Components
import * as S from "./StyledComponents"
import * as SC from "../shared/StyledComponents"
import MessageBox from "components/shared/messageBox";
import StepComponent from "components/shared/StepComponent";
import BetOptions from "../shared/BetOptions";

// Utils
import { useWeb3React } from "@web3-react/core"
import { injected } from "connectors"
import { setResult } from "web3Api/platformContract"
import { toast } from "react-toastify"
import { Bet } from "utils/types"
import ConfirmButton from '../../ConfirmButton'
import { showError } from "utils/helpers"
import Honeybadger from '@honeybadger-io/js'
import { VirtualFloor } from "lib/graph";

interface PropsI {
  chosenBet: Bet | null
  setChosenBet: React.Dispatch<React.SetStateAction<Bet | null>>;
  betData: Bet[];
  virtualFloor: VirtualFloor
}

const BetCreatorChoosesResultButton = ({ chosenBet, setChosenBet, betData, virtualFloor }: PropsI) => {
  const { account, active, activate, library } = useWeb3React();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const setWinner = async (): Promise<void> => {
    try {
      if (!active) {
        await activate(injected);
        return;
      }

      if (!chosenBet) {
        toast.error("Please select an outcome");
        return;
      }

      
      if (library && account) {
        const accountSigner = library.getSigner();
        if (account.toLowerCase() !== virtualFloor.owner.id) {
          toast.error("You are not the bet creator");
          return;
        }
        setIsLoading(true);
        const setWinner = await setResult(
          accountSigner,
          chosenBet.virtualFloor.id,
          chosenBet.index
        );

        if (setWinner) {
          setIsLoading(false);
          toast.success("The bet winner has been set successfully");
        }
      }
    } catch (error: any) {
      setIsLoading(false);
      const { shortMessage } = showError(error);
      toast.error(shortMessage);
      Honeybadger.notify(error)
    }
  };

  return (
    <SC.Container>
      <S.Header>
        <SC.Title>
          {!account && "Please connect your wallet"}
          {account && account.toLowerCase() == virtualFloor.owner.id && "Please pick the outcome of the bet."}
        </SC.Title>
        {account &&
          <S.BetOptionsWrapper>
            <BetOptions
              chosenBet={chosenBet}
              setChosenBet={setChosenBet}
              betData={betData}
            />
          </S.BetOptionsWrapper>
        }
      </S.Header>
      <SC.Main>
        <ConfirmButton
          onClick={setWinner}
          title='Confirm the winning option'
          isLoading={isLoading}
          active={active}
        />
        {/* <StepComponent step={step} title="Make bet" /> */}
        {/* {statusMessage.show && (
            <SC.MessageWrapper>
              <MessageBox
                type={statusMessage.type}
                message={statusMessage.message}
              />
            </SC.MessageWrapper>
          )} */}
      </SC.Main>
    </SC.Container>
  );
};

export default BetCreatorChoosesResultButton
