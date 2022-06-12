import { useEffect, useState } from "react";

// Utils
import moment from "moment";
import { handleUTCConvertToLocalTime } from "utils/convertToLocal";

// Components
import * as S from "./StyledComponents";

interface PropsI {
  betClose: string
}

const BetBy = ({ betClose }: PropsI) => {

  return (
    <S.Wrapper>
      <S.Title>Bet by</S.Title>
      <S.Description>
        {moment(handleUTCConvertToLocalTime(betClose)).format("DD MMMM")}{" "}
        {moment(handleUTCConvertToLocalTime(betClose)).format("H:mm")}
      </S.Description>
    </S.Wrapper>
  );
};

export default BetBy;
