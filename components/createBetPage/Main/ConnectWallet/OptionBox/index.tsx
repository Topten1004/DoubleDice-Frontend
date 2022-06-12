// Next
import Image from "next/image";

// Utils
import getImageUrl from 'utils/getImageUrl'

// Components
import * as S from "./StyledComponents"

interface PropsI {
  imgSrc: string
  title: string
  onClick: () => void
}

const OptionBox = ({ imgSrc, title, onClick }: PropsI) => {
  return (
    <S.Button onClick={onClick}>
      <Image
        src={getImageUrl(imgSrc, true)}
        alt={title}
        layout="fixed"
        objectFit="cover"
        height={40}
        width={40}
        loading='lazy'
      />
      <S.Title>{title}</S.Title>
    </S.Button>
  );
};

export default OptionBox;
