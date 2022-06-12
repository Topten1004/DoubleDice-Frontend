import { VirtualFloor } from "lib/graph";
import moment from "moment";
import { useEffect, useState } from "react";
import { calculateBeta } from "utils/helpers";

// Components
import * as S from "./StyledComponents";

interface PropsI {
  virtualfloor: VirtualFloor;
}

const Multiplier = ({ virtualfloor: vf }: PropsI) => {
  const [value, setValue] = useState(
    calculateBeta(Number(vf.tOpen), Number(vf.tClose), vf.betaOpen).toFixed(2)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const beta = calculateBeta(
        Number(vf.tOpen),
        Number(vf.tClose),
        vf.betaOpen
      );
      setValue(beta.toFixed(2));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <S.Container>
      <S.Title>{value}X</S.Title>
      <S.Text>YOUR MULTIPLIER</S.Text>
    </S.Container>
  );
};

export default Multiplier;
