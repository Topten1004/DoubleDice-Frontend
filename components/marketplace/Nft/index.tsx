// @ts-nocheck
// Above is for until when the data given here is not coming from backend
// Next
import type { NextPage } from "next";
import Image from "next/image"
// React
import { useEffect, useState } from "react";
// Utils
import { utcTime, hexToNumber, normalizeOrder } from "../../../utils/helpers";
import { supernova } from "styles/colors";
import { ImHammer2 } from "react-icons/im"
import { AiOutlineCheckCircle } from "react-icons/ai"
import getImageUrl from "../../../utils/getImageUrl";
import { NftSwap, NftSwapV4 } from "@traderxyz/nft-swap-sdk";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
// Components
import * as S from "./StyledComponents";

// GraphQL
import { NftItem } from '../../../lib/graph'
import Link from "next/link";
import { providers, Signer } from "ethers";
import { sign } from "crypto";
import { MdOutlineBatteryUnknown, MdOutlineVerifiedUser } from "react-icons/md";
import { TokenKind } from "graphql";
import networkConfig from "../../../config/networkConfig";
import { toast } from "react-toastify";

interface PropsI {
  NftItem: NftItem
}

const DODI_TOKEN_ADDRESS_MUMBAI = '0x4E08F03079c5CD3083eA331Ec61bCC87538B7665';

const NFT = ({ NftItem }: PropsI): NextPage => {

    const { account, library, chainId, activate, active} = useWeb3React();

    const [walletAddress, setWalletAddress] = useState("");
    const [buyAmount, setBuyAmount] = useState(0);
    const [sellAmount, setSellAmount] = useState(0);
    const [orders, setOrders] = useState([]);
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    const signer = provider.getSigner();
    const networkId = networkConfig.networkId;
    const nftSwapSdk = new NftSwapV4( provider, signer, networkId)
    const address = account;
    const contractAddress = process.env.NFT_SMART_CONTRACT_ADDRESS as string;
    // order matching

    const getOrders = async(NftItem) => {
        const MakeAsset = {
            tokenAddress: NFT_SMART_CONTRACT_ADDRESS, // contract address
            tokenId: NftItem.id,
            type: NftItem.id,
        };

        const orders = await nftSwapSdk.getOrders({
          nftToken : NFT_SMART_CONTRACT_ADDRESS,
          nftTokenId : NftItem.id,
          chainId : networkId
        });

        const foundOrder = orders[0];
        await nftSwapSdk.fillSignedOrder(foundOrder.order);
    }
    // set Nft to trade
    const onList = async(NftItem) => 
    {
      if (!library || !account) {
          toast.error("Please connect your wallet to make this transaction");
          return;
      }
      else {
          const swapNft = {
            tokenAddress : contractAddress, // NFT contract address
            tokenId: NftItem.id, // Token Id of the SwapNft we want to swap
            type: 'ERC1155', // Must be one of 'ERC20', 'ERC721', or 'ERC1155'
          };
      
          const orderPrice = {
              tokenAddress: DODI_TOKEN_ADDRESS_MUMBAI, // Token contract address
              amount: sellAmount, //NftItem.price * Math.pow(10, NftItem.decimal), // Price
              type: 'ERC20',
          };

          // User A Trade Data
          const walletAddressUserA = address;
          const nftToSwapUserA = swapNft;

          // User B Trade Data
          const usdcToSwapUserB = orderPrice;

          // ............................
          // Part 1 of the trade -- User A (the 'maker') initiates an order
          // ............................

          // Initiate the SDK for User A.
          // Pass the user's wallet signer (available via the user's wallet provider) to the Swap SDK
          // Check if we need to approve the NFT for swapping
          const approvalStatusForUserA = await nftSwapSdk.loadApprovalStatus(
            nftToSwapUserA,
            walletAddressUserA
          );
          // If we do need to approve User A's CryptoPunk for swapping, let's do that now
          if (!approvalStatusForUserA.contractApproved) {
              const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
                nftToSwapUserA,
                address
              );
              const approvalTxReceipt = await approvalTx.wait();
              console.log(
                `Approved ${assetsToSwapUserA[0].tokenAddress} contract to swap with 0x v4 (txHash: ${approvalTxReceipt.transactionHash})`
              );
          }

          // Create the order (Remember, User A initiates the trade, so User A creates the order)
          const order = nftSwapSdk.buildOrder(
              nftToSwapUserA,
              usdcToSwapUserB,
              walletAddressUserA
          );
          // Sign the order (User A signs since they are initiating the trade)
          const signedOrder = await nftSwapSdk.signOrder(order);
      }
    }

    // user offer to buy NFT
    const onBuy = async(NftItem) => {

      if (!library || !account) {
        toast.error("Please connect your wallet to make this transaction");
        return;
      }
      else {
        
        const swapNft = {
            tokenAddress : contractAddress, // NFT contract address
            tokenId : NftItem.id, // Token Id of the SwapNft we want to swap
            type : 'ERC1155', // Must be one of 'ERC20', 'ERC721', or 'ERC1155'
        };
        
        const orderPrice = {
            tokenAddress: NftItem.tokenAddress, // Token contract address
            amount: buyAmount, //NftItem.price * Math.pow(10, NftItem.decimal), // Price
            type: 'ERC20',
        };

        const approvalStatusForUserB = await nftSwapSdk.loadApprovalStatus(
            orderPrice,
            address
        );

        if (!approvalStatusForUserB.contractApproved) {
          const approvalTx = await nftSwapSdk.approveTokenOrNftByAsset(
            orderPrice,
            address
          );
          const approvalTxReceipt = await approvalTx.wait();
        }

        const order = nftSwapSdk.buildNftAndErc20Order(
          swapNft,
          orderPrice,
          'buy',
          address
        );

        const signedOrder = await nftSwapSdk.signOrder(order);
        await nftSwapSdk.postOrder(signedOrder, networkId);
      }
    }

    // when maker accept
    const onAccept = async(NftItem) => {

        if (!library || !account) {
          toast.error("Please connect your wallet to make this transaction");
          return;
        }
        else {

            const orders = await nftSwapSdk.getOrders({
                nonce:NftItem.tokenAddress
            });

            if( orders.orders.length > 0)
            {
                const signOrder = orders.orders[0].order;

                const fillTx = await nftSwapSdk.fillBuyNftOrderWithoutApproval(signedOrder, NftItem.id.toString());
                const fillTxReceipt = await nftSwapSdk.awaitTransactionHash(fillTx.hash);
            }
        }
    }

    // when maker cancel the trade
    const onRefuse = async(NftItem) => {
        if (!library || !account) {
          toast.error("Please connect your wallet to make this transaction");
          return;
        }
        else {

            const MAKER_ASSET = {
                type: 'ERC1155',
                tokenAddress: contractAddress, // Smart Contract address
                tokenId: NftItem.id,
            };
            
            const TAKER_ASSET = {
                type: 'ERC20',
                tokenAddress: DODI_TOKEN_ADDRESS_MUMBAI,
                amount: NftItem.price
            };

            const makerApprovalStatus = await nftSwapSdk.loadApprovalStatus(
                MAKER_ASSET,
                address
            );

            const order = nftSwapperMaker.buildOrder(
              [MAKER_ASSET],
              [TAKER_ASSET],
              address,
              {
                // Fix dates and salt so we have reproducible tests
                expiration: new Date(3000, 10, 1),
                feeRecipientAddress: '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeE',
              }
            );
        
            const normalizedOrder = normalizeOrder(order);
            await nftSwapSdk.cancelOrder(signedOrder)
        }
    }
  
  return (
      <a>
        <S.Wrapper>
          <S.Td>
            <S.Title>{NftItem.title}</S.Title>
            <S.CategoryText>
              {NftItem.description}
            </S.CategoryText>
          </S.Td>
          <S.Td>
            {/* <S.imagesWrapper>
                <S.ImageWrapper>
                  <Image
                    layout="fixed"
                    objectFit="cover"
                    loading="lazy"
                    src={NftItem.image}
                    width={50}
                    height={50}
                  />
                </S.ImageWrapper>
            </S.imagesWrapper> */}
          </S.Td>
          <S.Td>
            <S.Title>
              {NftItem.price}
            </S.Title>
            <S.SubTitle>
              {NftItem.token}
            </S.SubTitle>
          </S.Td>
          <S.Td>
            <S.ListButton onClick = {() => onList(NftItem)}>List</S.ListButton>
          </S.Td>
          <S.Td>
            <S.ListButton onClick = {() => onBuy(NftItem)}>Buy</S.ListButton>
          </S.Td>
          <S.Td>
            <S.ListButton onClick = {() => onAccept(NftItem)}>Accept</S.ListButton>
          </S.Td>
          <S.Td>
            <S.ListButton onClick = {() => onRefuse(NftItem)}>Refuse</S.ListButton>
          </S.Td>
        </S.Wrapper>
      </a>
  );


};

export default NFT;
