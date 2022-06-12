// Next
import Image from "next/image"

// Components
import * as S from "./StyledComponents"

interface PropsI {
  onClick: any;
}

const ChooseCategory = ({ onClick }: PropsI) => {
  return (
    <S.Button overlayColor="linear-gradient(180deg, #373638 0%, #161616 100%)" onClick={onClick}>
      <S.TitleContainer isCenter={true}>
        <S.Title>Other</S.Title>
        <S.Description id="description-container">
          <S.SubTitle>TV Show</S.SubTitle>
          <S.Dot>.</S.Dot>
          <S.SubTitle>Series</S.SubTitle>
          <S.Dot>.</S.Dot>
          <S.SubTitle>Movies</S.SubTitle>
          <S.Dot>.</S.Dot>
          <S.SubTitle>Book</S.SubTitle>
          <S.Dot>.</S.Dot>
          <S.SubTitle>Comics</S.SubTitle>
        </S.Description>
      </S.TitleContainer>
    </S.Button>
  );
};

export default ChooseCategory;
