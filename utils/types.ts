import { BigNumberish } from 'ethers';
import { RoomEventInfo } from "lib/contracts";
import {
  Outcome as OutcomeEntity,
  PaymentToken as PaymentTokenEntity,
  VirtualFloor as VirtualFloorEntity
} from "lib/graph";
import { ReactElement } from "react";

export interface NetworkResponse {
  name: string;
  explorerName: string;
  explorerLink: string;
  symbol: string;
}

export interface Order {
  makerAddress: string;
  takerAddress: string;
  feeRecipientAddress: string;
  senderAddress: string;
  makerAssetAmount: string;
  takerAssetAmount: string;
  makerFee: string;
  takerFee: string;
  expirationTimeSeconds: string;
  salt: string;
  makerAssetData: string;
  takerAssetData: string;
  makerFeeAssetData: string;
  takerFeeAssetData: string;
  signature?: string;
}

export enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
  WalletLink = 'WalletLink',
}

export interface VirtualFloorVars {
  virtualFloorId: string;
}

export interface VirtualFloorData {
  virtualFloors: VirtualFloorEntity[];
}

export interface OutcomeData extends OutcomeEntity {
  color?: string;
}

export interface StatusMessage {
  show: boolean;
  type: string;
  message: string | ReactElement
}

export interface Bet extends OutcomeEntity {
  color: string
}

export interface BetCreationForm {
  selectedPaymentToken: string;
  paymentTokens?: PaymentTokenEntity[];
  title: RoomEventInfo["title"];
  category: RoomEventInfo["category"];
  subCategory: RoomEventInfo["subcategory"];
  description: RoomEventInfo["description"];
  opponents: RoomEventInfo["opponents"];
  outcomes: RoomEventInfo["outcomes"];
  resultSources: RoomEventInfo["resultSources"];
  isListed: RoomEventInfo["isListed"];
  multiplier: number | string;
  rake: BigNumberish | string;
  minimumBet: BigNumberish | string;
  maximumBet: BigNumberish | string;
  startingPot: BigNumberish | string;
  tOpen: BigNumberish | string;
  tClose: BigNumberish | string;
  tResolve: BigNumberish | string;
}