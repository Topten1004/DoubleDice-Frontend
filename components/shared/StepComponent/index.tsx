// Components
import * as S from "./StyledComponents";


interface PropsI {
  step: number
  title: string
}

const StepComponent = ({ step, title }: PropsI) => {
  const stepOne = step == 1 || step == 2 || step == 3 || step == 4;
  const stepTwo = step == 2 || step == 3 || step == 4;
  const stepThree = step == 3 || step == 4;
  const stepFour = step == 4;

  return (
    <S.Container>
      <S.ProgressBarContainer>
        <S.StepContainer isActive={stepOne}>
          <S.Circle isActive={stepOne}></S.Circle>
          <S.Text>Connect Wallet</S.Text>
        </S.StepContainer>
        <S.StepContainer isActive={stepTwo}>
          <S.Circle isActive={stepTwo}></S.Circle>
          <S.Text>Approval</S.Text>
        </S.StepContainer>
        <S.StepContainer isActive={stepThree}>
          <S.Circle isActive={stepThree}></S.Circle>
          <S.Text>{title}</S.Text>
        </S.StepContainer>
        <S.StepContainer isActive={stepFour}>
          <S.Circle isActive={stepFour}></S.Circle>
          <S.Text>Completed</S.Text>
        </S.StepContainer>
      </S.ProgressBarContainer>
    </S.Container>
  );
};

export default StepComponent;
