// Utils
import { SpinnerDotted } from "spinners-react"

// Components
import * as S from "./StyledComponents"


interface PropsI {
  onClick: () => void
  disabled?: boolean
  isLoading: boolean
  active: boolean
  backgroundColor?: string
  title: string
}

const ChallengeResultsBox = ({
  onClick,
  disabled,
  active,
  backgroundColor,
  title,
  isLoading
}: PropsI) => {

  let theTitle = "Connect wallet"
  if (active) theTitle = title
  return (
    <S.Button
      type='button'
      onClick={onClick}
      disabled={disabled || isLoading}
      isDisabled={disabled || isLoading}
      backgroundColor={backgroundColor}
    >
      <S.TextWrapper>
        {isLoading ?
          <SpinnerDotted
            size={20}
            color="white"
            thickness={200}
            enabled={isLoading}
          />
          :
          theTitle
        }
      </S.TextWrapper>
    </S.Button>
  );
};

export default ChallengeResultsBox;
