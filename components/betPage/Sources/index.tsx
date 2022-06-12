import { Fragment } from 'react';

// Components
import { ResultSource } from 'lib/graph';
import * as S from './StyledComponents'


interface PropsI {
  sources: ResultSource[];
}

const BetPageComponent = ({ sources }: PropsI) => {
  
  return (
    <S.Wrapper>
      <S.Title>Sources</S.Title>
      {sources?.map((source) => (
        <S.SourceWrapper key={source.title}>
          {source.title && (
            <S.LinkContainer>
              <S.Text>Title:</S.Text>
              <S.TitleText>{source.title}</S.TitleText>
            </S.LinkContainer>
          )}
          <S.LinkContainer>
            <S.Text>URL:</S.Text>
            <S.Link target="_blank" href={source.url}>
              {source.url}
            </S.Link>
          </S.LinkContainer>

        </S.SourceWrapper>
      ))}
    </S.Wrapper>
  );
};

export default BetPageComponent
