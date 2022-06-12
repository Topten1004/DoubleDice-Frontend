// Utils
import * as S from "./StyledComponents";

// Components
import { useRef, useState } from "react";

// Hooks
import useOutsideAlerter from "components/hooks/clickedOutside";
import React from "react";

interface PropsI {
  options: string[] | number[] | (string | number)[]
  setOption: React.Dispatch<React.SetStateAction<any>> | ((e: string | number) => void)
  selectedOption?: string | number | null
}

const SelectButton = ({ options, setOption, selectedOption }: PropsI) => {
  const [IsModalOpen, setIsModalOpen] = useState<boolean>(false)

  const buttonRef = useRef(null);
  useOutsideAlerter(buttonRef, () => setIsModalOpen(false));

  return (
    <S.SelectContainer ref={buttonRef}>
      <S.Select onClick={() => setIsModalOpen(true)}>
        <S.Text>{selectedOption || 'Select'}</S.Text>
        <S.DropDown>
          <svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="0.6" fillRule="evenodd" clipRule="evenodd" d="M3.5 4L7 0H0L3.5 4Z" fill="white" />
          </svg>
        </S.DropDown>
      </S.Select>
      {
        IsModalOpen && (
          <S.Modal>
            {
              options?.length > 0 && options.map(theType => (
                <S.ModalButton key={theType} onClick={() => {
                  setOption(theType)
                  setIsModalOpen(false)
                }}>{theType}</S.ModalButton>
              ))
            }
          </S.Modal>
        )
      }
    </S.SelectContainer>
  );
};

export default SelectButton;
