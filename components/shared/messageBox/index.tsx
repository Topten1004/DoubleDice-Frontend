// Utils
import { ReactElement } from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { BiError } from 'react-icons/bi';

// Components
import * as S from "./StyledComponents";

interface PropsI {
  type: string
  message: string | ReactElement
}

const MessageBox = ({ type, message }: PropsI) => {
  return (
    <S.Container type={type}>
      <S.IconContainer>
        {
          type === 'success' ?
            <AiOutlineCheckCircle size={20} color='white' />
            :
            <BiError size={20} color='white' />
        }
      </S.IconContainer>
      <S.Text>{message}</S.Text>
    </S.Container>
  );
};

export default MessageBox;
