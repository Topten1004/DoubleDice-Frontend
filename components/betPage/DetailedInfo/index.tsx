import Honeybadger from "@honeybadger-io/js"
import { useWeb3React } from "@web3-react/core"
import client from "config/apolloConfig"
import { USER_SPECIFIC_VIRTUAL_FLOOR } from "graphql/queries"
// GraphQl
import {
  PreparedClaim,
  prepareVirtualFloorClaim,
  VirtualFloor as VirtualFloorEntity,
  VirtualFloorClaimType
} from "lib/graph"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
// Utils
import { BetState, handleSetBetState, isRunning } from "utils/betState"
import { showError } from "utils/helpers"
// Types
import { Bet } from "utils/types"
import { claimPayouts, claimRefunds } from "web3Api/platformContract"
import AdminChoosesResultButton from "./components/ChooseOption/AdminChoosesResultButton"
// Components
import Analysis from "./components/Analysis"
import BetBy from './components/BetBy'
import BettingBox from "./components/ChooseOption/BettingBox"
import ChallengeResultsBox from "./components/ChooseOption/ChallengeResultsBox"
import ReportButton from "./components/ReportButton"
import ShareButtons from "./components/ShareButtons"
import TimeRemaining from "./components/TimeRemaining"
import UserConfirmsResultButton from "./components/UserConfirmsResultButton"
import * as S from "./StyledComponents"

interface PropsI {
  virtualFloor: VirtualFloorEntity;
}

const colors = [
  "Red",
  "Green",
  "Yellow",
  "Blue",
  "Orange",
  "Purple",
  "Cyan",
  "Magenta",
  "Lime",
  "Pink",
  "Teal",
  "Lavender",
  "Brown",
  "Beige",
  "Maroon",
  "Mint",
];

const BetPageComponent = ({ virtualFloor }: PropsI) => {
  const { account, library } = useWeb3React();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chosenBet, setChosenBet] = useState<Bet | null>(null);
  const [winningBet, setWinningBet] = useState<Bet | null>(null);
  const [userSpecificVirtualFloor, setUserSpecificVirtualFloor] = useState<VirtualFloorEntity | null>(null);
  const [data, setData] = useState<Bet[]>([]);
  const [betState, setBetState] = useState({ uiState: "", reason: "" });
  const [isClaimed, setIsClaimed] = useState<boolean>(false); // Todo: Find a proper way to refresh UI after claim


  function handleSetWinningBet(newData: Bet[]) {
    if (virtualFloor.winningOutcome) {
      setWinningBet(newData[virtualFloor.winningOutcome.index]);
    } else setWinningBet(null);
  }

  // TODO: index should not be added in the front end
  // A color is added to each data array
  useEffect(() => {
    if (virtualFloor) {
      const newData = virtualFloor.outcomes.map((d, i) => {
        const colorIndex = i % 16;
        return { ...d, color: colors[colorIndex], index: d.index + 1 };
      });
      setBetState(handleSetBetState(virtualFloor));
      setData(newData);
      handleSetWinningBet(newData);
      const newBetStateInterval = setInterval(function () {
        setBetState(handleSetBetState(virtualFloor));
      }, 1000);

      return () => clearInterval(newBetStateInterval);
    }
  }, [virtualFloor]);

  useEffect(() => {
    (async () => {
      if (account && virtualFloor && virtualFloor.id) {
        const queryResult = await client.query({
          query: USER_SPECIFIC_VIRTUAL_FLOOR,
          variables: {
            vfId: virtualFloor.id,
            userId: account.toLowerCase(),
          },
        });
        setUserSpecificVirtualFloor(queryResult.data.virtualFloor);
      }
    })();
  }, [virtualFloor, account]);

  const claimPayoutsOrRefunds = async (claim: PreparedClaim): Promise<void> => {
    try {
      setIsLoading(true);
      const accountSigner = library.getSigner();
      const { claimType, tokenIds } = claim;

      let hash: string | null = null;

      if (claimType === VirtualFloorClaimType.Payouts) {
        hash = await claimPayouts(accountSigner, virtualFloor.id, tokenIds);
      } else {
        hash = await claimRefunds(accountSigner, virtualFloor.id, tokenIds);
      }
      if (hash) {
        setIsClaimed(true);
        toast.success("Congratulations, you succesfully claimed your reward");
      }
      setIsLoading(false);
    } catch (error: any) {
      setIsLoading(false);
      const { shortMessage, longMessage } = showError(error);
      toast.error(shortMessage);
      Honeybadger.notify(error);
    }
  };

  let header;
  
  switch (betState.uiState) {
    case BetState.Active_Open:
      header = (
        <S.Header>
          <BetBy betClose={virtualFloor.tClose} />
          <TimeRemaining endTime={Number(virtualFloor.tClose)} />
        </S.Header>
      );
      break;
    case BetState.Active_Closed_ResolvableLater:
      header = (
        <S.HeaderTitle paddingTop="2rem">
          <S.Title>{betState.reason}</S.Title>
        </S.HeaderTitle>
      );
      break;
    case BetState.Active_Closed_ResolvableNow_ResultNone_CreatorMaySetResult:
      header = (
        <>
          <S.Header justifyContent='flex-end'>
            <TimeRemaining
              endTime={Number(virtualFloor.tResultSetMax)}
              startTime={Number(virtualFloor.tResultSetMin)}
            />
          </S.Header>
          <S.HeaderTitle>
            <S.Title>
              {account && account.toLowerCase() == virtualFloor.owner.id && "Please pick the outcome of the bet."}
              {account && account.toLowerCase() !== virtualFloor.owner.id && `${betState.reason}`}
              {!account && `${betState.reason}`}
            </S.Title>
          </S.HeaderTitle>
        </>
      );
      break;
    case BetState.Active_Closed_ResolvableNow_ResultNone_AdminMayFinalizeUnsetResult:
      header = (
        <S.HeaderTitle paddingTop="2rem">
          <S.Title>{betState.reason}</S.Title>
        </S.HeaderTitle>
      );
      break;
    case BetState.Active_Closed_ResolvableNow_ResultSet_SomeoneMayChallengeSetResult:
      header = (
        <>
          <S.Header justifyContent="flex-end">
            <TimeRemaining
              endTime={Number(virtualFloor.tResultSetMax)}
              startTime={Number(virtualFloor.tResultChallengeMax)}
            />
          </S.Header>
          <S.HeaderTitle>
            <S.Title>{betState.reason}</S.Title>
            {winningBet && (
              <S.Title>{`The outcome is: ${winningBet.title}`}</S.Title>
            )}
          </S.HeaderTitle>
        </>
      );
      break;
    case BetState.Active_Closed_ResolvableNow_ResultChallenged:
      header = (
        <S.HeaderTitle paddingTop='2rem'>
          <S.Title>{betState.reason}</S.Title>
        </S.HeaderTitle>
      );
      break;
    case BetState.Active_Closed_ResolvableNow_ResultSet_SomeoneMayConfirmUnchallengedResult:
      header = (
        <S.HeaderTitle paddingTop="2rem">
          <S.Title>{betState.reason}</S.Title>
        </S.HeaderTitle>
      );
      break;
    case BetState.Claimable: {
      // If virtualFloor.state has moved to a Claimable state,
      // but userSpecificVirtualFloor.state has not yet caught up because
      // HTTP response is still in transit,
      // prepareVirtualFloorClaim(userSpecificVirtualFloor) will return null.
      // So we cannot assert(claim), but we have to handle the possibility
      // of claim being null.
      const claim = userSpecificVirtualFloor
        ? prepareVirtualFloorClaim(userSpecificVirtualFloor)
        : null;

      header = (
        <S.HeaderTitle paddingTop="2rem">
          <S.Title>This bet is closed.</S.Title>
          {winningBet && winningBet.title && (
            <S.Title>
              {`The outcome is: ${winningBet.title}`}
            </S.Title>
          )}

          <S.Subtitle>{betState.reason}</S.Subtitle>

          {!claim && <S.Subtitle>Please connect your wallet</S.Subtitle>}

          {claim && !isClaimed && (() => {
            const { claimType, totalClaimAmount } = claim;
            const anythingToClaim = totalClaimAmount.gt(0);
            const claimDescription = claimType === VirtualFloorClaimType.Payouts ? 'payout' : 'refund';
            return (
              <>
                <S.Title>
                  {anythingToClaim
                    ? `You can claim a total ${claimDescription} of ${totalClaimAmount.toFixed(2)} ${virtualFloor.paymentToken.symbol}`
                    : `No ${claimDescription} to claim`}
                </S.Title>

                {anythingToClaim && (
                  <S.ClaimButton
                    disabled={isLoading}
                    isDisabled={isLoading}
                    onClick={() => claimPayoutsOrRefunds(claim)}
                  >
                    Claim
                  </S.ClaimButton>
                )}
              </>
            );
          })()}
        </S.HeaderTitle>
      );
      break;
    }
    default:
      header = <></>;
      break;
  }



  return (
    <S.Container>
      <S.Main>
        {header}
        <Analysis data={data} chosenBet={chosenBet} winningBet={winningBet} />
        {betState.uiState == BetState.Active_Closed_ResolvableNow_ResultSet_SomeoneMayChallengeSetResult && (
          <ChallengeResultsBox virtualFloor={virtualFloor} />
        )}
        {betState.uiState == BetState.Active_Open && (
          <BettingBox
            chosenBet={chosenBet}
            setChosenBet={setChosenBet}
            betData={data}
            isBetOpen={isRunning(virtualFloor)}
            virtualFloor={virtualFloor}
          />
        )}
        {betState.uiState == BetState.Active_Closed_ResolvableNow_ResultNone_CreatorMaySetResult &&
          <AdminChoosesResultButton
            chosenBet={chosenBet}
            setChosenBet={setChosenBet}
            virtualFloor={virtualFloor}
            betData={data}
          />
        }
        {betState.uiState ==
          BetState.Active_Closed_ResolvableNow_ResultSet_SomeoneMayConfirmUnchallengedResult && (
            <UserConfirmsResultButton virtualFloor={virtualFloor} />
          )}
      </S.Main>
      <S.Footer>
        <ShareButtons />
        <ReportButton virtualFloor={virtualFloor} />
      </S.Footer>
    </S.Container>
  );
};

export default BetPageComponent;
