// @ts-nocheck
// Above is for until when the data given here is not coming from backend
// Next
import { useRouter } from "next/router";
import Link from "next/link";
import type { NextPage } from "next";

// GraphQL
import { useQuery } from "@apollo/client";
import { ALL_PUBLIC_VIRTUAL_FLOORS } from "graphql/queries";

// Utils
import {
  LINKS_PER_PAGE,
  getQueryVariables,
} from "utils/helpers";
import { SpinnerDotted } from "spinners-react";
import { supernova } from "styles/colors";

// Components
import * as S from "./StyledComponents";
import Bet from './Bet'


const LobbyPageComponent = (): NextPage => {
  const router = useRouter();

  let pageNumber = 1;
  const { page } = router.query;
  if (page) pageNumber = Number(page);

  const isNewPage = pageNumber <= 1;

  const { loading, error, data } = useQuery(ALL_PUBLIC_VIRTUAL_FLOORS, {
    variables: getQueryVariables(isNewPage, pageNumber),
    pollInterval: 60000
  });

  let justifyContentPageWrapper = 'space-between'
  if (pageNumber <= 1) justifyContentPageWrapper = 'flex-end'
  else if (data?.virtualFloors.length < LINKS_PER_PAGE) justifyContentPageWrapper = 'flex-start' 

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
          {data?.virtualFloors.length > 0 ? data.virtualFloors.map((virtualFloor) => (
            <Bet
              key={virtualFloor.id}
              virtualFloor={virtualFloor}
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
            {data?.virtualFloors.length >= LINKS_PER_PAGE && (
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

export default LobbyPageComponent;
