// @ts-nocheck
// Above is for until when the data given here is not coming from backend
// Next
import { useRouter } from "next/router";
import Link from "next/link";
import type { NextPage} from "next";

// GraphQL
import { useQuery } from "@apollo/client";
import { ALL_PUBLIC_VIRTUAL_FLOORS , USER_SPECIFIC_VIRTUAL_FLOOR} from "graphql/queries";

// Utils
import {
  LINKS_PER_PAGE,
  getQueryVariables,
} from "utils/helpers";
import { SpinnerDotted } from "spinners-react";
import { supernova } from "styles/colors";

// Components
import * as S from "./StyledComponents";
import Nft from './Nft'

const dummy_Nfts = [
  {
    "id": "0",
    "name": "Test NFT 1",
    "description": "This is Test NFT1",
    "image": "https://i.imgur.com/Qkw9N0A.jpeg",
    "price": "50",
    "token": "Weth",
    "tokenAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "decimal": "18",
    "owner": "0x21e607cA29b9f19C130A01B7eEF9ce40c3D0C2eb"
  },
  {
    "id": "1",
    "name": "Test NFT 2",
    "description": "This is Test NFT2",
    "image": "https://i.imgur.com/Qkw9N0A.jpeg",
    "price": "150",
    "token": "Weth",
    "tokenAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "decimal": "18",
    "owner": "0x21e607cA29b9f19C130A01B7eEF9ce40c3D0C2eb"
  },
  {
    "id": "2",
    "name": "Test NFT 3",
    "description": "This is Test NFT3",
    "image": "https://i.imgur.com/Qkw9N0A.jpeg",
    "price": "250",
    "token": "Weth",
    "tokenAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "decimal": "18",
    "owner": "0x21e607cA29b9f19C130A01B7eEF9ce40c3D0C2eb"
  },
  {
    "id": "3",
    "name": "Test NFT 4",
    "description": "This is Test NFT4",
    "image": "https://i.imgur.com/Qkw9N0A.jpeg",
    "price": "350",
    "token": "Weth",
    "tokenAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "decimal": "18",
    "owner": "0x21e607cA29b9f19C130A01B7eEF9ce40c3D0C2eb"
  },
  {
    "id": "4",
    "name": "Test NFT 5",
    "description": "This is Test NFT1",
    "image": "https://i.imgur.com/Qkw9N0A.jpeg",
    "price": "500",
    "token": "Weth",
    "tokenAddress": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    "decimal": "18",
    "owner": "0x21e607cA29b9f19C130A01B7eEF9ce40c3D0C2eb"
  },
];

const Marketplace = (): NextPage => {
  const router = useRouter();

  let pageNumber = 1;
  const { page } = router.query;
  if (page) pageNumber = Number(page);

  const isNewPage = pageNumber <= 1;

  const data = dummy_Nfts;

  let justifyContentPageWrapper = 'space-between'
  if (pageNumber <= 1) justifyContentPageWrapper = 'flex-end'
  else if (data.length < LINKS_PER_PAGE) justifyContentPageWrapper = 'flex-start' 

  return (
    <S.Container>
      {
        <>
          <S.Header>
            <S.Title>Event</S.Title>
            <S.Title></S.Title>
            <S.Title>Result Time</S.Title>
            <S.Title>Pool</S.Title>
            <S.Title></S.Title>
          </S.Header>
          {data?.length > 0 ? data.map((NftItem) => (
            <Nft
              key={NftItem.id}
              NftItem={NftItem}
            />
          ))
            :
            <S.BetsWrapper>
              <SpinnerDotted
                size={80}
                color={supernova}
                thickness={200}
                enabled={true}
              />
            </S.BetsWrapper>
          }
          <S.PaginationWrapper justifyContent={justifyContentPageWrapper}>
            {pageNumber > 1 && (
              <S.LinkWrapper>
                <Link href={`/?page=${pageNumber - 1}`}>
                  <S.ATag>
                    <S.TextWrapper>
                      <S.Span>{'<'}</S.Span> PREVIOUS
                    </S.TextWrapper>
                  </S.ATag>
                </Link>
              </S.LinkWrapper>
            )}
            {data?.length >= LINKS_PER_PAGE && (
              <S.LinkWrapper>
                <Link href={`/?page=${pageNumber + 1}`}>
                  <S.ATag>
                    <S.TextWrapper>
                      NEXT <S.Span>{'>'}</S.Span>
                    </S.TextWrapper>
                  </S.ATag>
                </Link>
              </S.LinkWrapper>
            )}
          </S.PaginationWrapper>
        </>
      }

    </S.Container>
  );
};

export default Marketplace;
