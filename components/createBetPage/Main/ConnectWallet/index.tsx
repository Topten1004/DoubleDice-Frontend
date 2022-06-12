import { useEffect } from "react";

// Components
import OptionBox from "./OptionBox";
import * as S from "./StyledComponents";
import { addNetwork, injected, switchNetwork, walletconnect, walletlink } from "connectors";
import { useWeb3React } from "@web3-react/core";
import networkConfig from "config/networkConfig";
// @ts-ignore
import swal from "@sweetalert/with-react";


// Utils
import { toast } from "react-toastify";
import { getNetwork, ZERO } from "utils/helpers";
import client from "config/apolloConfig";
import { USER_QUOTA_INFO } from "graphql/queries";
import { gql } from "@apollo/client";
import { BigNumber as BigInteger } from "ethers";

interface PropsI {
  nextStep: () => void;
}

enum ConnectorNames {
  Injected = "Injected",
  WalletConnect = "WalletConnect",
  WalletLink = "WalletLink",
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.WalletLink]: walletlink,
};

const ConnectWallet = ({ nextStep }: PropsI) => {
  const { account, active, chainId, activate } = useWeb3React();


  const quotaErrorMsg = () => {
    return swal(
      <div>
        <p>
          You do not seem to have an allowance for creating a bet with this
          wallet. Ensure you are using the correct wallet. If it is a mistake,
          please contact the site admin at{" "}
          <a href="mailto: info@doubledice.com" style={{ color: "blue" }}>
            info@doubledice.com
          </a>
          . If you would like to get an allowance,{" "}
          <a
            href="https://token.doubledice.com"
            style={{ color: "blue" }}
            target={"_blank"}
          >
            stake DODI
          </a>
          .
        </p>
      </div>
    );
  };

  const checkUserQuota = async (connectedAccount: string) => {
    if (account) {
      const query = await client.query({
        query: USER_QUOTA_INFO,
        variables: {
          id: connectedAccount.toLowerCase(),
        },
      });
      const quotaInfo = query.data.users[0];
      if (quotaInfo) {
        const currentQuota = quotaInfo.maxConcurrentVirtualFloors - quotaInfo.concurrentVirtualFloors
        if (BigInteger.from(currentQuota).gt(ZERO)) {
          return true;
        }
      }
      return false;
    }
  };

  useEffect(() => {
    (async () => {
      if (active && chainId !== networkConfig.networkId) {
        toast.warning(`Switch your network to ${getNetwork(networkConfig.networkId).name}`);
        await addNetwork(networkConfig.networkId);
        await switchNetwork();
      }
      if (active && account && chainId === networkConfig.networkId) {
        const quota = await checkUserQuota(account);
        if (quota) {
          nextStep();
        } else {
          quotaErrorMsg();
        }
      }
    })();
  }, [chainId]);

  const connectWallet = async (wallet: string) => {
    if (active && chainId !== networkConfig.networkId) {
      toast.error(`Switch network to ${getNetwork(networkConfig.networkId).name}`);
      await addNetwork(networkConfig.networkId);
      await switchNetwork();
      return;
    }
    if (active && account && chainId === networkConfig.networkId) {
      const quota = await checkUserQuota(account);
      if (quota) {
        nextStep();
      } else {
        quotaErrorMsg();
        return;
      }
    }
    if (!active) {
      if (wallet === "metamask") {
        await activate(injected);
      }
      if (wallet === "walletconnect") {
        await activate(connectorsByName.WalletConnect);
      }
      if (wallet === "more") {
        await activate(connectorsByName.WalletLink);
      }
    }

    // @ts-ignore
    if (typeof window.ethereum == "undefined" || typeof window.web3 == "undefined") {
      toast.error("Please install Metamask wallet");
    }
  };

  return (
    <S.Container>
      <S.SubContainer>
        <OptionBox
          onClick={() => connectWallet("walletconnect")}
          imgSrc="/mock/walletConnect.png"
          title="Wallet Connect"
        />
        <OptionBox
          onClick={() => connectWallet("metamask")}
          imgSrc="/mock/metamask.png"
          title="MetaMask"
        />
        <OptionBox
          onClick={() => connectWallet("more")}
          imgSrc="/mock/trustwallet.png"
          title="More Wallets"
        />
      </S.SubContainer>
    </S.Container>
  );
};

export default ConnectWallet;
