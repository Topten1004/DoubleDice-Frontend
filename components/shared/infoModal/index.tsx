import { useState } from "react"

// Utils
import * as S from "./StyledComponents"
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { boulder } from "styles/colors";

interface PropsI {
  description: string
}

const InfoModal = ({ description }: PropsI) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <S.IconContainer
      onMouseOver={() => setIsModalOpen(true)}
      onMouseLeave={() => setIsModalOpen(false)}
    >
      <AiOutlineInfoCircle size={20} color={boulder} />
      {isModalOpen && (
        <S.Modal>
          <S.ModalText>
            {description}
          </S.ModalText>
        </S.Modal>
      )}
    </S.IconContainer>
  );
};

export default InfoModal;
