import Honeybadger from '@honeybadger-io/js'
// Components
import { useWeb3React } from "@web3-react/core"
import InfoModal from 'components/shared/infoModal'
import SelectButton from "components/shared/SelectButton"
import StepComponent from "components/shared/StepComponent"
// GraphQL
import client from "config/apolloConfig"
import networkConfig from "config/networkConfig"
import { injected } from "connectors"
import { PAYMENT_TOKEN } from "graphql/queries"
import { VirtualFloor } from "lib/graph"
import { useEffect, useLayoutEffect, useState } from "react"
// Utils
import { IoMdClose } from "react-icons/io"
import { toast } from "react-toastify"
import { boulder } from "styles/colors"
import { BASE10, convertNumToBigInt, showError, SIX_DECIMAL } from "utils/helpers"
import { challengeSetResult } from "web3Api/platformContract"
import { getUserBalance, increaseAllowanceIfNecessary } from "web3Api/tokenContract"
import ConfirmButton from '../../ConfirmButton'
import * as S from "./StyledComponents"

const CHALLENGE_BOND_USD_AMOUNT = 100;

interface PropsI {
  virtualFloor: VirtualFloor;
}

const ChallengeResultsBox = ({ virtualFloor }: PropsI) => {
  const { active, account, activate, library, chainId } = useWeb3React();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [outcomeData, setOutcomeData] = useState<string[]>([]);
  const [outcomeIndexes, setOutcomeIndexes] = useState<number[]>([]);
  const [option, setOption] = useState<string | null>(null);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const titles = []
    const indexes = []

    if (virtualFloor.winningOutcome && virtualFloor.winningOutcome.index) {
      for (let i = 0; i < virtualFloor.outcomes.length; i++) {
        const outcome = virtualFloor.outcomes[i];
        if (outcome.index !== virtualFloor.winningOutcome.index) {
          titles.push(outcome.title);
          indexes.push(outcome.index);
        }
      }
      setOutcomeData(titles);
      setOutcomeIndexes(indexes);
    }
  }, [virtualFloor]);

  useLayoutEffect(() => {
    if (!active) {
      setStep(1);
    }
    if (active && chainId !== networkConfig.networkId) {
      setStep(2);
    }
  }, [active]);

  function handleCloseBox(e: React.MouseEvent) {
    e.stopPropagation();
    setIsOpen(false);
  }

  const getUSDAddress = async () => {
    const query = await client.query({
      query: PAYMENT_TOKEN,
    });
    const options = query.data.paymentTokens;
    let currencyAddress = "";
    for (let i = 0; i < options.length; i++) {
      const currency = options[i];
      if (currency?.symbol == "USDC") {
        currencyAddress = currency.address
      }
    }
    return currencyAddress;
  }

  const challenge = async (): Promise<void> => {
    try {
      if (!option) {
        toast.error("Please select an outcome")
        return;
      }

      if (!active) {
        await activate(injected);
        setStep(2);
        return;
      }
      if (library && account) {
        const accountSigner = library.getSigner();
        const amount = convertNumToBigInt(BASE10, SIX_DECIMAL, CHALLENGE_BOND_USD_AMOUNT); // ToDo: Do not hardcode 6, but read it from somewhere
        
        const USDAddress = await getUSDAddress();
        
        const balance = await getUserBalance(accountSigner, USDAddress, account);
        
        if (amount.gt(balance)) {
          toast.error("Insufficient USDC balance");
          return;
        }
        setIsLoading(true)
        
        setStep(2);
        await increaseAllowanceIfNecessary({
          signer: accountSigner,
          minAllowanceRequired: amount,
          tokenAddress: USDAddress
        });

        setStep(3);
        const chosenIndex = outcomeIndexes[outcomeData.indexOf(option)];

        const makeChallenge = await challengeSetResult(
          accountSigner,
          virtualFloor.id,
          chosenIndex
        );

        if (makeChallenge) {
          setStep(4);
          setIsLoading(false);
          toast.success("Challenge successful");
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
    <S.WrapperButton onClick={() => !isOpen && setIsOpen(true)} isOpen={isOpen}>
      <S.Header>
        The result is incorrect?
        {isOpen && (
          <S.CloseButton onClick={handleCloseBox}>
            <IoMdClose size={20} color={boulder} />
          </S.CloseButton>
        )}
      </S.Header>
      {isOpen && (
        <main>
          <S.SelectWrapper>
            <S.TextContainer>
              <S.Title>Select outcome</S.Title>
              <InfoModal
                description='The bet creator has set the result.
               If you disagree with this result, please suggest the correct result below.'
              />
            </S.TextContainer>
            <S.SelectSubWrapper>
              <SelectButton
                options={outcomeData}
                setOption={setOption}
                selectedOption={option}
              />
            </S.SelectSubWrapper>
          </S.SelectWrapper>
          <S.TextWrapper>
            <S.Text>
              <S.WarningSign>&#42;</S.WarningSign>Note: Challenging the result costs 100 USD
            </S.Text>
          </S.TextWrapper>
          <S.ButtonWrapper>
            <ConfirmButton
              onClick={challenge}
              disabled={isLoading}
              isLoading={isLoading}
              active={active}
              title='Challenge'
              backgroundColor='red'
            />
          </S.ButtonWrapper>
          <StepComponent step={step} title='Challenge' />
        </main>
      )}
    </S.WrapperButton>
  );
};

export default ChallengeResultsBox;
