import assert from "assert";
import {
  VirtualFloor as VirtualFloorEntity,
  VirtualFloorState as VirtualFloorEntityState
} from "lib/graph";
import { currentUnixTime } from "./helpers";

export const isRunning = (virtualFloor: VirtualFloorEntity): boolean => {
  return (
    virtualFloor.state === VirtualFloorEntityState.Active_ResultNone &&
    currentUnixTime() < Number(virtualFloor.tClose)
  );
};

export const isClosed = (virtualFloor: VirtualFloorEntity): boolean => {
  return (
    virtualFloor.state === VirtualFloorEntityState.Active_ResultNone &&
    currentUnixTime() >= Number(virtualFloor.tClose)
  );
};

// ToDo: Consider converting to an enum
export const BetState = {
  Active_Open: "Active_Open",
  Active_Closed_ResolvableLater: "Active_Closed_ResolvableLater",
  Active_Closed_ResolvableNow_ResultNone_CreatorMaySetResult: "Active_Closed_ResolvableNow_ResultNone_CreatorMaySetResult",
  Active_Closed_ResolvableNow_ResultNone_AdminMayFinalizeUnsetResult: "Active_Closed_ResolvableNow_ResultNone_AdminMayFinalizeUnsetResult",
  Active_Closed_ResolvableNow_ResultSet_SomeoneMayChallengeSetResult: "Active_Closed_ResolvableNow_ResultSet_SomeoneMayChallengeSetResult",
  Active_Closed_ResolvableNow_ResultSet_SomeoneMayConfirmUnchallengedResult: "Active_Closed_ResolvableNow_ResultSet_SomeoneMayConfirmUnchallengedResult",
  Active_Closed_ResolvableNow_ResultChallenged: "Active_Closed_ResolvableNow_ResultChallenged",
  Claimable: "Claimable",
}

export const handleSetBetState = (virtualFloor: VirtualFloorEntity) => {

  let resp: { uiState: string, reason: string, status: string };
  const t = currentUnixTime();

  const tClose = Number(virtualFloor.tClose);
  const tResultSetMin = Number(virtualFloor.tResultSetMin);
  const tResultSetMax = Number(virtualFloor.tResultSetMax);

  switch (virtualFloor.state) {
    case VirtualFloorEntityState.Active_ResultNone:
      // Assert our knowledge about the timeline
      assert(tClose < tResultSetMin && tResultSetMin < tResultSetMax, 'Broken assumption "tClose < tResultSetMin < tResultSetMax"');
      if (t < tClose) {
        resp = { uiState: BetState.Active_Open, reason: "Bet is open", status: "Open" };
      } else if (t >= tClose && t < tResultSetMin) {
        resp = { uiState: BetState.Active_Closed_ResolvableLater, reason: "The betting period has ended. Bet creator will input result at shown Result time.", status: "Closed" };
      } else if (t >= tResultSetMin && t <= tResultSetMax) {
        resp = { uiState: BetState.Active_Closed_ResolvableNow_ResultNone_CreatorMaySetResult, reason: "Betting is closed. Waiting for the Bet creator to input result.", status: "Unresolved" };
      } else /* if (t > tResultSetMax) */ {
        resp = { uiState: BetState.Active_Closed_ResolvableNow_ResultNone_AdminMayFinalizeUnsetResult, reason: "Betting is closed. Bet creator did not input the result within 60 minutes of the scheduled Result time. Admin will set the result soon.", status: "Unresolved" };
      }
      break;
    case VirtualFloorEntityState.Active_ResultSet: {
      assert(virtualFloor.tResultChallengeMax);
      const tResultChallengeMax = Number(virtualFloor.tResultChallengeMax);
      // Assert our knowledge about the timeline
      assert(tResultSetMin < tResultChallengeMax, `Broken assumption "tResultSetMin = ${tResultSetMin} < tResultChallengeMax = ${tResultChallengeMax}"`);
      if (t <= tResultChallengeMax) {
        resp = { uiState: BetState.Active_Closed_ResolvableNow_ResultSet_SomeoneMayChallengeSetResult, reason: "Result set by Bet creator. Check if you agree, or raise a challenge.", status: "Unresolved" };
      } else {
        resp = { uiState: BetState.Active_Closed_ResolvableNow_ResultSet_SomeoneMayConfirmUnchallengedResult, reason: "Complaint period has expired", status: "Resolved" };
      }
      break;
    }
    case VirtualFloorEntityState.Active_ResultChallenged:
      resp = { uiState: BetState.Active_Closed_ResolvableNow_ResultChallenged, reason: "Result has been challenged by a participant. Under admin review.", status: "Unresolved" };
      break;
    case VirtualFloorEntityState.Claimable_Refunds_Flagged:
      resp = { uiState: BetState.Claimable, reason: "Bet was cancelled because it was flagged", status: "Cancelled" };
      break;
    case VirtualFloorEntityState.Claimable_Refunds_ResolvedNoWinners:
      resp = { uiState: BetState.Claimable, reason: "Bet was cancelled because there were no winners", status: "Cancelled" };
      break;
    case VirtualFloorEntityState.Claimable_Refunds_ResolvableNever:
      // Possible scenarios:
      // 1. bets on 0 outcomes && bonusAmount == 0
      // 2. bets on 0 outcomes && bonusAmount > 0
      // 3. bets on 1 outcomes && bonusAmount == 0
      // Technically "all bets were made on a single outcome" message is only correct for case (3)
      resp = { uiState: BetState.Claimable, reason: "Bet was cancelled because all bets were made on a single outcome", status: "Cancelled" };
      break;
    case VirtualFloorEntityState.Claimable_Payouts:
      resp = { uiState: BetState.Claimable, reason: "Bet was resolved", status: "Resolved" };
      break;
    default:
      resp = { uiState: BetState.Active_Open, reason: "Bet is open", status: "Open" };
      break;
  }
  return resp;
}
