// Next
import { Opponent } from "lib/graph"
import Image from "next/image"

// Utils
import getImageUrl from 'utils/getImageUrl'
import { imagePlaceholder } from "utils/imagesPlaceholder";

// Components
import * as S from "./StyledComponents"

interface PropsI {
  title: string
  description: string
  opponents: Opponent[]
}

const Header = ({ title, opponents, description }: PropsI) => {

  return (
    <S.Container>
      <S.BackgroundImageContainer>
        <Image
          src={getImageUrl('/mock/gameBackground.png', true)}
          alt="background"
          layout="fill"
          objectFit="contain"
          loading='lazy'
        />
      </S.BackgroundImageContainer>
      <S.Header>
        <S.HeaderText>{title}</S.HeaderText>
        <S.DescriptionText>{description}</S.DescriptionText>
      </S.Header>
      <S.Main>
        {opponents.length === 1 && (
          <S.SingleImagesContainer>
            <S.ImageContainer>
              <Image
                layout="fixed"
                objectFit="contain"
                loading='lazy'
                src={getImageUrl(opponents[0].image)}
                alt={opponents[0].title}
                width={122}
                height={122}
              />
              <S.ImageText maxWidth={'14rem'}>{opponents[0].title}</S.ImageText>
            </S.ImageContainer>
          </S.SingleImagesContainer>
        )}

        {opponents.length === 2 && (
          <S.ImagesContainer>
            <S.ImageContainer>
              <Image
                layout="fixed"
                objectFit="contain"
                loading='lazy'
                src={getImageUrl(opponents[0].image)}
                alt={opponents[0].title}
                width={122}
                height={122}
              />
              <S.ImageText maxWidth={'14rem'}>{opponents[0].title}</S.ImageText>
            </S.ImageContainer>
            <S.Text>VS</S.Text>
            <S.ImageContainer>
              <Image
                layout="fixed"
                objectFit="contain"
                loading='lazy'
                src={getImageUrl(opponents[1].image)}
                alt={opponents[1].title}
                width={122}
                height={122}
              />
              <S.ImageText maxWidth={'14rem'}>{opponents[1].title}</S.ImageText>
            </S.ImageContainer>
          </S.ImagesContainer>
        )}

        {opponents.length > 2 && (
          <S.MultipleImagesContainer>
            {opponents.map((opponent) => (
              <S.ImageContainer key={opponent.title}>
                <Image
                  layout="fixed"
                  objectFit="contain"
                  loading='lazy'
                  src={getImageUrl(opponent.image)}
                  alt={opponent.title}
                  width={110}
                  height={110}
                  placeholder="blur"
                  blurDataURL={imagePlaceholder}
                />
                <S.ImageText maxWidth={'11rem'}>{opponent.title}</S.ImageText>
              </S.ImageContainer>
            ))}
          </S.MultipleImagesContainer>
        )}
      </S.Main>
    </S.Container>
  );
};

export default Header;
