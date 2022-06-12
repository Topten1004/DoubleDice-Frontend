// @ts-nocheck
// Above is for until when the data given here is not coming from backend
// Next
import type { NextPage } from "next";
import Image from "next/image"

// Utils
import { handleSetBetState } from "utils/betState";
import { utcTime, hexToNumber } from "utils/helpers";
import { supernova } from "styles/colors";
import { ImHammer2 } from "react-icons/im"
import { AiOutlineCheckCircle } from "react-icons/ai"
import getImageUrl from "utils/getImageUrl";

// Components
import * as S from "./StyledComponents";
import ECGIcon from 'public/icons/ECGIcon'

// GraphQL
import { VirtualFloor } from "lib/graph";
import Link from "next/link";


interface PropsI {
  virtualFloor: VirtualFloor
}

const Bet = ({ virtualFloor }: PropsI): NextPage => {

  let status = ''
  if (handleSetBetState(virtualFloor).status) {
    switch (handleSetBetState(virtualFloor).status) {
      case 'Open':
        status = <ECGIcon />
        break;
      case 'Closed':
      case 'Cancelled':
      case 'Resolved':
        status = <AiOutlineCheckCircle color={supernova} />
        break;
      case 'Unresolved':
        status = <ImHammer2 color={supernova} />
        break;
      default:
        status = <ECGIcon />
        break;
    }
  }

  const opponents = virtualFloor.opponents.filter((opponent, i) => i < 5)

  return (
    <Link href={`/bet/${hexToNumber(virtualFloor.id)}`}>
      <a>
        <S.Wrapper>
          <S.Td>
            <S.Title>{virtualFloor.title}</S.Title>
            <S.CategoryText>
              {virtualFloor.subcategory.category.slug}
            </S.CategoryText>
          </S.Td>
          <S.Td>
            <S.imagesWrapper>
              {opponents.map((opponent) => (
                <S.ImageWrapper>
                  <Image
                    layout="fixed"
                    objectFit="cover"
                    loading="lazy"
                    src={getImageUrl(opponent.image)}
                    width={50}
                    height={50}
                  />
                </S.ImageWrapper>
              ))}
            </S.imagesWrapper>
          </S.Td>
          <S.Td>
            <S.Title>
              {utcTime("DD MMM YYYY", virtualFloor.tResultSetMin)}
            </S.Title>
            <S.SubTitle>
              {utcTime("H:mm", virtualFloor.tResultSetMin)} UTC
            </S.SubTitle>
          </S.Td>
          <S.Td>
            <S.Title>
              {virtualFloor.totalSupply}
              {` `}
              {virtualFloor.paymentToken.symbol}
            </S.Title>
            <S.SubTitle>{virtualFloor.betaOpen}X</S.SubTitle>
          </S.Td>
          <S.Td>
            <S.IconWrapper>{status}</S.IconWrapper>
          </S.Td>
        </S.Wrapper>
      </a>
    </Link>
  );
};

export default Bet;
