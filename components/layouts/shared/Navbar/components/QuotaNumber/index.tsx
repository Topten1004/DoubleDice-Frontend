import { useEffect, useState } from "react"

// Utils
import client from "config/apolloConfig";
import networkConfig from "config/networkConfig";
import { IoMdLock } from "react-icons/io";

// GraphQL
import { USER_QUOTA_INFO } from "graphql/queries";
import { gql } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";

// Components
import * as S from "./StyledComponents"

const QuotaNumber = () => {
  const { account, chainId } = useWeb3React();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [quota, setQuota] = useState({ maxQuota: "0", currentQuota: "0" });


  const checkUserQuota = async (connectedAccount: string) => {
    const query = await client.query({
      query: USER_QUOTA_INFO,
      variables: {
        id: connectedAccount.toLowerCase(),
      },
    });
    if (query.data && query.data.users[0]) {
      const quotaInfo = query.data.users[0];
      return {
        maxQuota: quotaInfo.maxConcurrentVirtualFloors,
        currentQuota: quotaInfo.concurrentVirtualFloors,
      };
    }
    return { maxQuota: "0", currentQuota: "0", };
  };

  useEffect(() => {
    (async () => {
      if (account && chainId == networkConfig.networkId) {
        const quota = await checkUserQuota(account);
        setQuota({
          maxQuota: quota.maxQuota,
          currentQuota: quota.currentQuota,
        });
      }
    })();
  }, [chainId, account]);

  const availableQuota = Number(quota.maxQuota) - Number(quota.currentQuota);


  return (
    <>
      <S.Wrapper
        onMouseOver={() => setIsModalOpen(true)}
        onMouseLeave={() => setIsModalOpen(false)}
        isLocked={!(account && chainId == networkConfig.networkId)}
      >
        {account &&
        chainId == networkConfig.networkId ? (
          <>
            <S.Text>{availableQuota}</S.Text>
            {isModalOpen && (
              <S.ModalWrapper>
                <S.ModalMain>
                  {availableQuota !== 0 ? (
                    <>
                      <S.ModalTitle>Bet/game hosting allowance: </S.ModalTitle>
                      <S.ModalText>Max: {quota.maxQuota}</S.ModalText>
                      <S.ModalText>Active: {quota.currentQuota} </S.ModalText>
                      <S.ModalText>Available: {availableQuota}</S.ModalText>
                    </>
                  ) : (
                    <S.ModalLink href="https://token.doubledice.com">
                      Stake DODI to host your own bets/games and earn big
                    </S.ModalLink>
                  )}
                </S.ModalMain>
              </S.ModalWrapper>
            )}
          </>
        ) : (
          <>
            <IoMdLock size={20} color="white" />
            {isModalOpen && !account && (
              <S.ModalWrapper>
                <S.ModalMain>
                  <S.ModalText>
                    Please connect your wallet to see your quota
                  </S.ModalText>
                </S.ModalMain>
              </S.ModalWrapper>
            )}
          </>
        )}
      </S.Wrapper>
    </>
  );
};

export default QuotaNumber;
