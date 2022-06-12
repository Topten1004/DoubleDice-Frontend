import { useEffect, useLayoutEffect, useState } from "react";

// Components
import * as S from "../shared/StyledComponents";
import * as SC from "./InputBet/StyledComponents";
import { useWeb3React } from "@web3-react/core";
import MessageBox from "components/shared/messageBox";
import StepComponent from "components/shared/StepComponent";
import InputBet from "./InputBet";
import { toast } from "react-toastify";
import ConfirmButton from "../../ConfirmButton";
import BetOptions from "../shared/BetOptions";


// Utils
import { calculateBeta, convertNumToBigInt, getNetwork, showError, UNSPECIFIED_ZERO, ZERO } from "utils/helpers";
import { addNetwork, injected, switchNetwork } from "connectors";
import { getUserBalance, increaseAllowanceIfNecessary } from "web3Api/tokenContract";
import { commitToVirtualFloor } from "web3Api/platformContract";
import { BigNumber as BigDecimal } from "bignumber.js";
import networkConfig from "config/networkConfig";
import Honeybadger from '@honeybadger-io/js'

// Types
import { Bet, StatusMessage } from "utils/types";
import { VirtualFloor } from "lib/graph";

interface PropsI {
  setChosenBet: React.Dispatch<React.SetStateAction<Bet | null>>;
  chosenBet: Bet | null;
  virtualFloor: VirtualFloor;
  betData: Bet[];
  isBetOpen: boolean;
}

const BettingBox = ({ chosenBet, virtualFloor, setChosenBet, betData, isBetOpen }: PropsI) => {
  const { active, account, activate, library, chainId } = useWeb3React();
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [step, setStep] = useState<number>(0);

  const [statusMessage, setStatusMessage] = useState<StatusMessage>({
    show: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    (async () => {
      if (active && chainId !== networkConfig.networkId) {
        await addNetwork(networkConfig.networkId);
        await switchNetwork();
      }
    })();
  }, [chainId]);

  useLayoutEffect(() => {
    if (!active) {
      setStep(1);
    }
    if (active && chainId !== networkConfig.networkId) {
      setStep(2);
    }
  }, [active]);

  const makeBetSuccessMsg = (hash: string) => {
    return setStatusMessage({
      show: true,
      type: "success",
      message: (
        <h1>
          Commitment successful.{" "}
          <S.ATag
            target='_blank'
            href={`${getNetwork(networkConfig.networkId).explorerLink
              }/tx/${hash}`}
            style={{ color: "blue" }}
          >
            Transaction hash
          </S.ATag>
        </h1>
      ),
    });
  };

  const makeBet = async (): Promise<void> => {
    try {
      if (!active) {
        await activate(injected);
        setStep(2);
        return;
      }

      if (!chosenBet) {
        toast.error("Please select a betting option");
        return;
      }

      if (inputValue == "") {
        toast.error("Please enter your betting amount");
        return;
      }

      const bigDecimalAmount = new BigDecimal(inputValue);

      if (bigDecimalAmount.lt(chosenBet.virtualFloor.minCommitmentAmount)) {
        toast.error(
          `Minimum bet amount must be equal to or greater than ${chosenBet.virtualFloor.minCommitmentAmount}`
        );
        return;
      }

      if (bigDecimalAmount.gt(chosenBet.virtualFloor.maxCommitmentAmount)) {
        toast.error(
          `Maximum bet amount must be equal to or less than ${chosenBet.virtualFloor.maxCommitmentAmount}`
        );
        return;
      }

      if (library && chosenBet && account) {
        const accountSigner = library.getSigner();

        const amount = convertNumToBigInt(
          10,
          chosenBet.virtualFloor.paymentToken.decimals,
          inputValue
        );

        if (amount.lte(ZERO)) {
          toast.error("Please add an amount");
          return;
        }

        const balance = await getUserBalance(accountSigner,  chosenBet.virtualFloor.paymentToken.address, account);

        if (amount.gt(balance)) {
          toast.error(
            `Insufficient ${chosenBet.virtualFloor.paymentToken.symbol} balance`
          );
          return;
        }

        setIsLoading(true);

        setStep(2);
        await increaseAllowanceIfNecessary({
          signer: accountSigner,
          minAllowanceRequired: amount,
          tokenAddress: chosenBet.virtualFloor.paymentToken.address
        });

        const chosenBetIndex = Number(chosenBet.index) - 1;
        setStep(3);
        const hash = await commitToVirtualFloor(
          accountSigner,
          amount,
          chosenBet.virtualFloor.id,
          chosenBetIndex,
          UNSPECIFIED_ZERO
        );

        if (hash) {
          setStep(4);
          setIsLoading(false);
          toast.success("Commitment succesful");
          setInputValue("");
          setChosenBet(null);
          makeBetSuccessMsg(hash);
          setStep(1);
        }
      }
    } catch (error: any) {
      const { shortMessage, longMessage } = showError(error);
      setStatusMessage({ show: true, type: "error", message: shortMessage });
      setIsLoading(false);
      Honeybadger.notify(error)
    }
  };

  let beta;
  if (chosenBet) {
    beta = calculateBeta(
      Number(chosenBet.virtualFloor.tOpen),
      Number(chosenBet.virtualFloor.tClose),
      chosenBet.virtualFloor.betaOpen
    );
  }

  return (
    <S.Container>
      <S.Header>
        <SC.TitleContainer>
          <S.Title>Bet on</S.Title>
        </SC.TitleContainer>
        <BetOptions
          chosenBet={chosenBet}
          setChosenBet={setChosenBet}
          betData={betData}
          isBetOpen={isBetOpen}
        />
      </S.Header>
      <S.Main>
        <S.InputContainer>
          <InputBet
            virtualFloor={virtualFloor}
            chosenBet={chosenBet}
            setInputValue={setInputValue}
            inputValue={inputValue}
          />
        </S.InputContainer>
        <ConfirmButton
          disabled={isLoading}
          onClick={makeBet}
          title="Make a bet"
          isLoading={isLoading}
          active={active}
        />
        <StepComponent step={step} title="Make bet" />
        {statusMessage.show && (
          <S.MessageWrapper>
            <MessageBox
              type={statusMessage.type}
              message={statusMessage.message}
            />
          </S.MessageWrapper>
        )}
      </S.Main>
    </S.Container>
  );
};

export default BettingBox;
