import { useRef, useState, useEffect } from "react";

// Utils
import * as S from "./StyledComponents"
import * as SC from 'components/createBetPage/Main/StyledComponents'
import { IoMdClose } from "react-icons/io"
import { boulder } from "styles/colors"
import { toast } from "react-toastify";

export interface HTMLInputEvent extends React.ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & EventTarget;
}


interface PropsI {
  setOptions: React.Dispatch<React.SetStateAction<string[]>>
  options: string[]
}

const Options = ({ setOptions, options }: PropsI) => {
  const [IsShowInput, setIsShowInput] = useState<boolean>(false)

  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleAddOption = () => {
    if (
      inputRef.current &&
      inputRef.current.value &&
      inputRef.current.value.trim() !== ""
    ) {
      if (inputRef.current.value.length > 32) {
        toast.error("Options must be less than 32 characters");
        return;
      }

      const newOptions = [...options, inputRef.current.value];

      const isNotUniqueOptions = newOptions.some((option, i) => newOptions.indexOf(option) !== i);

      if (isNotUniqueOptions) {
        toast.error("Options must be unique");
        return;
      }

      setOptions([...options, inputRef.current.value]);
      setOptions([...options, inputRef.current.value]);
      setIsShowInput(false);
    } else {
      toast.error("Please enter an option");
    }
  }

  const handleRemoveOption = (i: number) => {
    const newOptions = [...options]
    newOptions.splice(i, 1)
    setOptions(newOptions);
    setOptions(newOptions)
  }

  return (
    <S.Container>
      <SC.SectionWrapper>
        <SC.Title>
          Options people can bet on<SC.Required>*</SC.Required>
        </SC.Title>
        <S.Options>
          {options.length > 0 &&
            options.map((option, i) => (
              <S.Option key={i}>
                <S.Text>{option}</S.Text>
                <S.RemoveButton onClick={() => handleRemoveOption(i)}>
                  <IoMdClose size={20} color={boulder} />
                </S.RemoveButton>
              </S.Option>
            ))}
        </S.Options>
        {IsShowInput ? (
          <S.InputContainer>
            <S.InputSubContainer>
              <SC.Input
                ref={inputRef}
                placeholder="Option"
                maxLength={30}
              />
            </S.InputSubContainer>
            <S.AddButtonContainer>
              <S.AddButton onClick={handleAddOption}>Add</S.AddButton>
            </S.AddButtonContainer>
          </S.InputContainer>
        ) : (
          <SC.AddInputButton onClick={() => setIsShowInput(true)}>
            Add options
          </SC.AddInputButton>
        )}
      </SC.SectionWrapper>
    </S.Container>
  );
};

export default Options;
