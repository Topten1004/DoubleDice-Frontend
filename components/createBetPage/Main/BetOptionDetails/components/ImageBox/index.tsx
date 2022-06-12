import { useRef } from "react"

// Utils
import * as S from "./StyledComponents"
import { MdOutlineFileUpload } from "react-icons/md"

// Types
import { HTMLInputEvent } from "../..";

interface PropsI {
  handleChange: (event: HTMLInputEvent) => void
  imageSrc: string
  size: number
  accept?: string
}

const ImageBox = ({ handleChange, imageSrc, size, accept }: PropsI) => {
  const imageInputRef = useRef<HTMLDivElement | null>(null)
  return (
    <S.ImageContainer size={size}>
      <S.ImageInput ref={ref => imageInputRef.current = ref} type="file" onChange={handleChange} accept={accept} />
      {imageSrc
        ?
        <S.Image
          src={imageSrc}
          onClick={() => imageInputRef.current?.click()}
        />
        :
        <>
          <S.ImageUploadButton onClick={() => imageInputRef.current?.click()} >
            <S.IconContainer>
              <MdOutlineFileUpload color='white' size={size * 4} />
            </S.IconContainer>
          </S.ImageUploadButton>
        </>
      }
    </S.ImageContainer>
  );
};

export default ImageBox;
