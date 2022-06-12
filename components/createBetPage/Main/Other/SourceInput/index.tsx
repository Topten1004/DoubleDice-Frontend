// Utils
import { IoMdClose } from "react-icons/io"
import { boulder } from "styles/colors";

// Components
import * as S from "./StyledComponents"
import * as SC from 'components/createBetPage/Main/StyledComponents'

// Types
import { SourcesI } from "..";

interface PropsI {
  handleSourceTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSourceLinkChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleRemoveSource: () => void
  source: SourcesI
  index: number
  sourcesLength: number
}

const SourceInput = ({
  handleSourceTitleChange,
  handleSourceLinkChange,
  handleRemoveSource,
  source,
  index,
  sourcesLength,
}: PropsI) => {
  return (
    <S.Wrapper>
      <S.Header>
        <S.Title>Source #{index + 1}</S.Title>
        {(sourcesLength > 1) &&
          <S.RemoveButton onClick={handleRemoveSource}>
            <IoMdClose size={20} color={boulder} />
          </S.RemoveButton>
        }
      </S.Header>
      <S.InputWrapper>
        <SC.Input
          placeholder="Insert the Title"
          onChange={handleSourceTitleChange}
          value={source.title}
          maxLength={30}
        />
      </S.InputWrapper>
      <S.InputWrapper>
        <SC.Input
          placeholder="Insert the link"
          onChange={handleSourceLinkChange}
          value={source.url}
        />
      </S.InputWrapper>
    </S.Wrapper>
  );
};

export default SourceInput;
