import { Fragment } from "react"

// Next
import Image from "next/image"

// Utils
import getImageUrl from 'utils/getImageUrl'

// Components
import * as S from "./StyledComponents"

interface PropsI {
  title: string
  description: string[]
  backgroundColor: string
  overlayColor: string
  imgSrc: string
  translateY?: number
  onClick: () => void
}

const ChooseCategory = ({ title, description, backgroundColor, overlayColor, imgSrc, translateY, onClick }: PropsI) => {
  return (
    <S.Button overlayColor={overlayColor} translateY={translateY} onClick={onClick}>
      <S.CardBoxSkewed backgroundColor={backgroundColor}></S.CardBoxSkewed>
      <S.CardBoxImageContainer id='image-container' translateY={translateY}>
        <Image
          src={getImageUrl(imgSrc, true)}
          className='cardBoxImage'
          objectFit="contain"
          layout="fill"
          loading='lazy'
        />
      </S.CardBoxImageContainer>
      <S.TitleContainer>
        <S.Title>{title}</S.Title>
        <S.Description id='description-container'>
          {
            description.map((text, i) => {
              return (
                <Fragment key={i}>
                  <S.SubTitle>{text}</S.SubTitle>
                  {(i !== description.length - 1) && <S.Dot>.</S.Dot>}
                </Fragment>
              )
            })
          }
        </S.Description>
      </S.TitleContainer>
    </S.Button>
  );
};

export default ChooseCategory;
