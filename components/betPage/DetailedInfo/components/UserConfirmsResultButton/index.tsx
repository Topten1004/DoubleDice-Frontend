import { useState } from "react"

// Utils
import { useWeb3React } from "@web3-react/core"
import { injected } from "connectors"
import { confirmUnchallengedResult } from "web3Api/platformContract"
import { VirtualFloor } from "lib/graph"
import { toast } from "react-toastify"
import ConfirmButton from '../ConfirmButton'
import { showError } from "utils/helpers"
import Honeybadger from '@honeybadger-io/js'

// Components
import * as S from "./StyledComponents"


interface PropsI {
  virtualFloor: VirtualFloor
}

const UserConfirmsResultButton = ({ virtualFloor }: PropsI) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { active, activate, library } = useWeb3React();

  const agree = async (): Promise<void> => {
    try {
    
      if (!active) {
        await activate(injected);
        return;
      }
      if (library) {
        const accountSigner = library.getSigner();
        setIsLoading(true);
       
        const res = await confirmUnchallengedResult(
          accountSigner,
          virtualFloor.id,
        );

        if (res) {
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
    <S.ButtonWrapper>
      <ConfirmButton
        onClick={agree}
        title='Confirm the winning option'
        isLoading={isLoading}
        active={active}
      />
    </S.ButtonWrapper>
  );
};

export default UserConfirmsResultButton;
