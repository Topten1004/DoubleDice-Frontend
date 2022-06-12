// Utils
import { SpinnerDotted } from "spinners-react"

// Components
import * as S from "./StyledComponents";


const RightSideInfo = () => {
  return (
    <S.Wrapper>
      <S.Text>Loading the page, please refresh the page in a few seconds</S.Text>
      <SpinnerDotted
        size={30}
        color="white"
        thickness={200}
        enabled={true}
      />
    </S.Wrapper>
  );
};

export default RightSideInfo;
