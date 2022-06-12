// Utils
import * as S from "./StyledComponents"
import * as SC from 'components/createBetPage/Main/StyledComponents'
import { IoMdClose } from "react-icons/io"
import { boulder } from "styles/colors";

// Types
import { HTMLInputEvent } from "../..";

// Components
import ImageBox from '../ImageBox'
import InfoModal from "components/shared/infoModal";

interface OpponentI {
  image: string;
  title: string;
}

interface PropsI {
  handleChange: (event: HTMLInputEvent, index: number) => void;
  handleInputChange: (event: HTMLInputEvent, index: number) => void;
  handleRemoveOpponents: () => void;
  index: number;
  opponent: OpponentI;
}

const ImageInput = ({ handleChange, handleInputChange, index, opponent, handleRemoveOpponents }: PropsI) => {
  return (
    <SC.InputContainer>
    <S.Header>
      <S.TitleContainer>
        <S.Title>Opponent #{index + 1}</S.Title>
      </S.TitleContainer>
      <S.RemoveButton onClick={handleRemoveOpponents}>
        <IoMdClose size={20} color={boulder} />
      </S.RemoveButton>
    </S.Header>
      <S.ImageInputContainer>
        <ImageBox
          handleChange={(e) => handleChange(e, index)}
          imageSrc={opponent.image}
          accept="image/jpg, image/jpeg, image/png, image/gif, image/webp"
          size={5}
        />
        <S.InputSubContainer>
          <SC.Input
            placeholder="Opponents Name"
            onChange={(e) => handleInputChange(e, index)}
            value={opponent.title}
            maxLength={30}
          />
        </S.InputSubContainer>
      </S.ImageInputContainer>
    </SC.InputContainer>
  );
};

export default ImageInput;
