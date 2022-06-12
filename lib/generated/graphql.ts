import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: string;
  BigInt: string;
  Bytes: any;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['ID'];
  slug: Scalars['String'];
  subcategories: Array<Subcategory>;
};

export type Opponent = {
  __typename?: 'Opponent';
  id: Scalars['ID'];
  image: Scalars['String'];
  title: Scalars['String'];
  virtualFloor: VirtualFloor;
};

export type Outcome = {
  __typename?: 'Outcome';
  id: Scalars['ID'];
  index: Scalars['Int'];
  outcomeTimeslots: Array<OutcomeTimeslot>;
  title: Scalars['String'];
  totalSupply: Scalars['BigDecimal'];
  totalWeightedSupply: Scalars['BigDecimal'];
  userOutcomeTimeslots: Array<UserOutcomeTimeslot>;
  userOutcomes: Array<UserOutcome>;
  virtualFloor: VirtualFloor;
};

export type OutcomeTimeslot = {
  __typename?: 'OutcomeTimeslot';
  beta: Scalars['BigDecimal'];
  id: Scalars['ID'];
  outcome: Outcome;
  outcomeTimeslotTransfers: Array<OutcomeTimeslotTransfer>;
  timeslot: Scalars['BigInt'];
  tokenId: Scalars['BigInt'];
  totalSupply: Scalars['BigDecimal'];
  userOutcomeTimeslots: Array<UserOutcomeTimeslot>;
};

export type OutcomeTimeslotTransfer = {
  __typename?: 'OutcomeTimeslotTransfer';
  amount: Scalars['BigDecimal'];
  from: User;
  id: Scalars['ID'];
  outcomeTimeslot: OutcomeTimeslot;
  timestamp: Scalars['BigInt'];
  to: User;
};

export type PaymentToken = {
  __typename?: 'PaymentToken';
  address: Scalars['Bytes'];
  decimals: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  symbol: Scalars['String'];
};

export type ResultSource = {
  __typename?: 'ResultSource';
  id: Scalars['ID'];
  title: Scalars['String'];
  url: Scalars['String'];
  virtualFloor: VirtualFloor;
};

export type Subcategory = {
  __typename?: 'Subcategory';
  category: Category;
  id: Scalars['ID'];
  slug: Scalars['String'];
  virtualFloors: Array<VirtualFloor>;
};

export type User = {
  __typename?: 'User';
  challengedVirtualFloors: Array<VirtualFloor>;
  concurrentVirtualFloors: Scalars['BigInt'];
  id: Scalars['ID'];
  maxConcurrentVirtualFloors: Scalars['BigInt'];
  outcomeTimeslotTransfersFrom: Array<OutcomeTimeslotTransfer>;
  outcomeTimeslotTransfersTo: Array<OutcomeTimeslotTransfer>;
  ownedVirtualFloors: Array<VirtualFloor>;
  userOutcomeTimeslots: Array<UserOutcomeTimeslot>;
  userOutcomes: Array<UserOutcome>;
};

export type UserOutcome = {
  __typename?: 'UserOutcome';
  id: Scalars['ID'];
  outcome: Outcome;
  totalBalance: Scalars['BigDecimal'];
  totalWeightedBalance: Scalars['BigDecimal'];
  user: User;
  userOutcomeTimeslots: Array<UserOutcomeTimeslot>;
};

export type UserOutcomeTimeslot = {
  __typename?: 'UserOutcomeTimeslot';
  balance: Scalars['BigDecimal'];
  id: Scalars['ID'];
  outcome: Outcome;
  outcomeTimeslot: OutcomeTimeslot;
  timeslot: Scalars['BigInt'];
  user: User;
  userOutcome: UserOutcome;
};

export type VirtualFloor = {
  __typename?: 'VirtualFloor';
  betaOpen: Scalars['BigDecimal'];
  bonusAmount: Scalars['BigDecimal'];
  /** Only set if the result set by the creator has been challenged */
  challenger?: Maybe<User>;
  creationFeeRate: Scalars['BigDecimal'];
  description: Scalars['String'];
  discordChannelId: Scalars['String'];
  flaggingReason?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  intId: Scalars['BigInt'];
  isListed: Scalars['Boolean'];
  maxCommitmentAmount: Scalars['BigDecimal'];
  minCommitmentAmount: Scalars['BigDecimal'];
  opponents: Array<Opponent>;
  outcomes: Array<Outcome>;
  owner: User;
  paymentToken: PaymentToken;
  platformFeeRate: Scalars['BigDecimal'];
  resultSources: Array<ResultSource>;
  state: VirtualFloorState;
  subcategory: Subcategory;
  tClose: Scalars['BigInt'];
  tCreated: Scalars['BigInt'];
  tOpen: Scalars['BigInt'];
  tResolve: Scalars['BigInt'];
  tResultChallengeMax?: Maybe<Scalars['BigInt']>;
  tResultSetMax: Scalars['BigInt'];
  tResultSetMin: Scalars['BigInt'];
  title: Scalars['String'];
  totalSupply: Scalars['BigDecimal'];
  winnerProfits?: Maybe<Scalars['BigDecimal']>;
  winningOutcome?: Maybe<Outcome>;
};

export enum VirtualFloorState {
  Active_ResultChallenged = 'Active_ResultChallenged',
  Active_ResultNone = 'Active_ResultNone',
  Active_ResultSet = 'Active_ResultSet',
  Claimable_Payouts = 'Claimable_Payouts',
  Claimable_Refunds_Flagged = 'Claimable_Refunds_Flagged',
  Claimable_Refunds_ResolvableNever = 'Claimable_Refunds_ResolvableNever',
  Claimable_Refunds_ResolvedNoWinners = 'Claimable_Refunds_ResolvedNoWinners'
}

export type VirtualFloorsAggregate = {
  __typename?: 'VirtualFloorsAggregate';
  id: Scalars['ID'];
  /** The total number of VFs ever created. */
  totalVirtualFloorsCreated: Scalars['Int'];
};
