import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';
import { WalletLinkConnector } from '@web3-react/walletlink-connector';
import { convertNumToHexdecimal } from 'utils/helpers';
import networkConfig from 'config/networkConfig';

const supportedChainIds = [1, 4, 3, 5, 1337, 137, 80001, 42, 56, 97, 31337];


export const RPC_URLS: { [chainId: number]: string } = {
  80001: "https://rpc-mumbai.maticvigil.com",
  137: "https://polygon-rpc.com",
  1337: "http://localhost:8545",
}

export enum ConnectorNames {
  Injected = 'Injected',
  WalletConnect = 'WalletConnect',
  WalletLink = 'WalletLink',
}


export const injected = new InjectedConnector({
  supportedChainIds,
})

export const walletconnect = new WalletConnectConnector({
  rpc: {
    80001: RPC_URLS[networkConfig.networkId],
    137: RPC_URLS[networkConfig.networkId]
  },
  qrcode: true
})

export const walletlink = new WalletLinkConnector({
  url: RPC_URLS[networkConfig.networkId],
  appName: 'DoubleDice App',
  supportedChainIds
})

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
  [ConnectorNames.WalletLink]: walletlink
}

export const switchNetwork = async () => {
  // await addNetwork(networkConfig.networkId);
  // @ts-ignore
  typeof window.ethereum !== "undefined" &&
    // @ts-ignore
    (await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [
        {
          chainId: `0x${convertNumToHexdecimal(
            networkConfig.networkId
          )}`,
        },
      ],
    }));
}

export const addNetwork = async (id: number) => {

  let networkData;

  switch (id) {

    //polygonTestnet
    case 80001:

      networkData = [{
        chainId: `0x${convertNumToHexdecimal(80001)}`,
        chainName: "MATICTESTNET",
        rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
        nativeCurrency: {
          name: "MATIC COIN",
          symbol: "MATIC",
          decimals: 18,
        },
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],

      }];

      break;

    //polygonMainet
    case 137:
      networkData = [{

        chainId: `0x${convertNumToHexdecimal(137)}`,
        chainName: "MATICMAINET",
        rpcUrls: ["https://polygon-rpc.com"],
        nativeCurrency: {
          name: "MATIC COIN",
          symbol: "MATIC",
          decimals: 18,
        },
        blockExplorerUrls: ["https://polygonscan.com/"],

      }];

      break;

    default:

      break;

  }

  // @ts-ignore
  return typeof window.ethereum !== 'undefined' && window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: networkData,
  });

}

