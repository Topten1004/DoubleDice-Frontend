// @ts-nocheck
// Above is for until when the data given here is not coming from backend
// Next
import type { NextPage } from "next";
import Image from "next/image"

// Utils
import { utcTime, hexToNumber } from "utils/helpers";
import { supernova } from "styles/colors";
import { ImHammer2 } from "react-icons/im"
import { AiOutlineCheckCircle } from "react-icons/ai"
import getImageUrl from "utils/getImageUrl";
import { NftSwapV4 } from "@traderxyz/nft-swap-sdk";
import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
// Components
import * as S from "./StyledComponents";

// GraphQL
import { NftItem } from "lib/graph";
import Link from "next/link";
import { providers, Signer } from "ethers";
import { sign } from "crypto";
import { toast } from "react-toastify";

interface PropsI {
  NftItem: NftItem
}

const NFT = ({ NftItem }: PropsI): NextPage => {

  const { account, library, chainId} = useWeb3React();

  const setList = () => {
      
  };

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
            <S.ListButton onClick = {() => setList(NftItem)}>List</S.ListButton>
          </S.Td>
        </S.Wrapper>
      </a>
  );
};

export default NFT;
