// Utils
import { VirtualFloor } from "lib/graph"
import { BigNumber as BigDecimal } from "bignumber.js"
import moment from 'moment-timezone'
import { handleUTCConvertToLocalTime } from "utils/convertToLocal";

// Components
import * as S from "./StyledComponents"

interface PropsI {
  vf: VirtualFloor
}

const RightSideInfo = ({ vf }: PropsI) => {
  const rake = new BigDecimal(vf.creationFeeRate).multipliedBy(100);

  return (
    <S.Wrapper>
      <S.Container>
        <S.SubContainer>
          <S.Title>Pool</S.Title>
          <S.Description>
            {vf?.totalSupply}{" "}
            <S.Span>{vf?.paymentToken?.symbol}</S.Span>
          </S.Description>
          <S.SubTitle>{rake.toNumber().toFixed(2)}% RAKE</S.SubTitle>
        </S.SubContainer>
        <S.SubContainer>
          <S.Title>Results</S.Title>
          <S.ResultDescription>
            {moment(handleUTCConvertToLocalTime(vf?.tResultSetMin)).format("DD MMM YYYY")}{" "}
            {moment(handleUTCConvertToLocalTime(vf?.tResultSetMin)).format("H:mm")}
          </S.ResultDescription>
        </S.SubContainer>
      </S.Container>
    </S.Wrapper>
  );
};

export default RightSideInfo;
