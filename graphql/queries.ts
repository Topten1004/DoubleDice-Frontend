import { gql } from "@apollo/client";

export const ALL_PUBLIC_VIRTUAL_FLOORS = gql`
  query AllVirtualFloors ($skip: Int, $first: Int) {
    virtualFloors( first: $first, skip: $skip, orderBy: tCreated, orderDirection: desc, where: {isListed: true} ) {
      id
      subcategory {
        slug
        category {
          slug
        }
      }
      title
      description
      isListed
      paymentToken {
        symbol
        decimals
        address
      }
      creationFeeRate
      platformFeeRate
      tCreated
      tOpen
      tClose
      tResultSetMin
      tResultSetMax
      tResultChallengeMax
      state
      discordChannelId
      bonusAmount
      minCommitmentAmount
      maxCommitmentAmount
      winningOutcome {
        id
        index
      }
      totalSupply
      betaOpen
      owner {
        id
      }
      opponents {
        id
        title
        image
      }
      outcomes {
        index
        totalSupply
        totalWeightedSupply
        title
        outcomeTimeslots {
          timeslot
          totalSupply
        }
        virtualFloor{
          id
          state
          tClose
          tResultSetMin
          tResultSetMax
          tResultChallengeMax
          tOpen
          betaOpen
          bonusAmount
          minCommitmentAmount
          maxCommitmentAmount
          paymentToken {
            symbol
            decimals
            address
          }
        }
      }
      resultSources {
        id
        title
        url
      }
    }

  }
`;

// ToDo: Use virtualFloor(id: $id) directly, and get the VF directly or get `null`
export const VIRTUAL_FLOORS = gql`
  query VirtualFloors ($vfId: String) {
    virtualFloors( where: {id: $vfId} ) {
      id
      subcategory {
        slug
        category {
          slug
        }
      }
      title
      description
      isListed
      paymentToken {
        symbol
        decimals
        address
      }
      creationFeeRate
      platformFeeRate
      tCreated
      tOpen
      tClose
      tResultSetMin
      tResultSetMax
      tResultChallengeMax
      state
      discordChannelId
      bonusAmount
      minCommitmentAmount
      maxCommitmentAmount
      winningOutcome {
        id
        index
      }
      totalSupply
      betaOpen
      owner {
        id
      }
      opponents {
        id
        title
        image
      }
      outcomes {
        index
        totalSupply
        totalWeightedSupply
        title
        outcomeTimeslots {
          timeslot
          totalSupply
        }
        virtualFloor{
          id
          state
          tClose
          tResultSetMin
          tResultSetMax
          tResultChallengeMax
          tOpen
          betaOpen
          bonusAmount
          minCommitmentAmount
          maxCommitmentAmount
          paymentToken {
            symbol
            decimals
            address
          }
        }
      }
      resultSources {
        id
        title
        url
      }
    }

  }
`;

export const USER_SPECIFIC_VIRTUAL_FLOOR = gql`
  # See https://www.apollographql.com/docs/react/data/fragments/
  fragment CommonOutcomeFields on Outcome {
    index
    title
    totalSupply
    totalWeightedSupply
    userOutcomes(where: {user: $userId, totalBalance_gt: 0}) {
      totalBalance
      totalWeightedBalance
      userOutcomeTimeslots(where: {balance_gt: 0}) {
        balance
        outcomeTimeslot {
          beta
          timeslot
          tokenId
        }
      }
    }
  }

  query($vfId: ID!, $userId: String) {
    virtualFloor(id: $vfId) {
      state
      outcomes {
        ...CommonOutcomeFields
      }
      winningOutcome {
        ...CommonOutcomeFields
      }
      winnerProfits
    }
  }
`;

export const USER_QUOTA_INFO = gql`
  query($id: String) {
    users( where: {id: $id} ) {
      id
      maxConcurrentVirtualFloors
      concurrentVirtualFloors
      ownedVirtualFloors{
        id
      }
    }
  }
`;

export const VIRTUALFLOOR_POOL_AMOUNT = gql`
  query VirtualFloors ($id: String) {
    virtualFloors( where: {id: $id} ) {
      id
      totalSupply
    }
  }
`;

export const PAYMENT_TOKEN = gql`
  query {
    paymentTokens {
      id
      address
      name
      symbol
      decimals
    }
  }
`;


