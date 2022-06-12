import { useEffect } from "react";

// Components
import * as S from "./StyledComponents";

// Utils
import { useWeb3React } from "@web3-react/core";
import { addNetwork, connectorsByName, injected, switchNetwork } from "connectors";
import { toast } from "react-toastify";
import { getNetwork, shortenAddress } from "utils/helpers";
import networkConfig from "config/networkConfig";
import Honeybadger from '@honeybadger-io/js'


const ConnectWallet = () => {
  const { active, account, chainId, activate } = useWeb3React();

  useEffect(() => {
    (async () => {
      if (active && chainId !== networkConfig.networkId) {
        

        toast.error(
          `Please switch to ${getNetwork(networkConfig.networkId).name}`
        );
        await addNetwork(networkConfig.networkId);
        await switchNetwork();
      }
    })();
  }, [chainId]);

  const connectWallet = async (wallet: string) => {
    console.log("ID::::::::::::::::::::::::::", chainId, networkConfig.networkId);

    try {
      if (active && chainId !== networkConfig.networkId) {
        toast.error(
          `Please switch to ${getNetwork(networkConfig.networkId).name}`
        );
        return;
      }
      if (wallet === "metamask") {
        await activate(injected);
      }
      if (wallet === "walletconnect") {
        await activate(connectorsByName.WalletConnect);
      }
      if (wallet === "more") {
        await activate(connectorsByName.WalletLink);
      }
    } catch (error: any) {
      if (error instanceof Error) {
        Honeybadger.notify(error)
        toast.error(error?.message);
      }
    }
  };

  return (
    <S.ButtonWrapper>
      <S.ConfirmButton
        type="button"
        onClick={() => connectWallet("metamask")}
      >
        {account && chainId === networkConfig.networkId ? shortenAddress(account) : "Connect wallet"}
      </S.ConfirmButton>
    </S.ButtonWrapper>
  );
};

export default ConnectWallet;
