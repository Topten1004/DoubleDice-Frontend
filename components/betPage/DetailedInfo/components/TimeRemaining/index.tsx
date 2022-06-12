import { useEffect, useState } from "react";

// Utils
import moment from "moment";

// Components
import * as S from "./StyledComponents";

const clockColon = (
  <S.SVGContainer>
    <svg
      width="5"
      height="19"
      viewBox="0 0 5 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.4"
        d="M2.07765 18.4978C1.4968 18.4978 1.00532 18.2968 0.60319 17.8946C0.201063 17.4925 0 17.001 0 16.4202C0 15.8393 0.201063 15.3478 0.60319 14.9457C1.00532 14.5436 1.4968 14.3425 2.07765 14.3425C2.63616 14.3425 3.10531 14.5436 3.4851 14.9457C3.88722 15.3478 4.08829 15.8393 4.08829 16.4202C4.08829 17.001 3.88722 17.4925 3.4851 17.8946C3.10531 18.2968 2.63616 18.4978 2.07765 18.4978ZM2.07765 4.15531C1.4968 4.15531 1.00532 3.95424 0.60319 3.55212C0.201063 3.14999 0 2.6585 0 2.07765C0 1.4968 0.201063 1.00532 0.60319 0.60319C1.00532 0.201063 1.4968 0 2.07765 0C2.63616 0 3.10531 0.201063 3.4851 0.60319C3.88722 1.00532 4.08829 1.4968 4.08829 2.07765C4.08829 2.6585 3.88722 3.14999 3.4851 3.55212C3.10531 3.95424 2.63616 4.15531 2.07765 4.15531Z"
        fill="white"
      />
    </svg>
  </S.SVGContainer>
);

interface PropsI {
  endTime: number;
  startTime?: number;
}
const RemainingTime = ({ endTime, startTime }: PropsI) => {
  const [diffDuration, setDiffDuration] = useState(
    moment.duration(moment.unix(Number(endTime)).diff(moment()))
  );

  function handleFormatNumber(number: number) {
    if (number < 10) return `0${number}`
    else return number
  }

  useEffect(() => {
    if (startTime && moment(moment.unix(startTime)).isBefore(moment.unix(Number(endTime)))) {
      setInterval(function () {
        if (moment(moment.unix(startTime)).isBefore(moment.unix(Number(endTime)))) {
          const diff = moment.unix(Number(endTime)).diff(moment());
          setDiffDuration(moment.duration(diff));
        }
      }, 1000);
    } else if (moment().isBefore(moment.unix(Number(endTime)))) {
      setInterval(function () {
        if (moment().isBefore(moment.unix(Number(endTime)))) {
          const diff = moment.unix(Number(endTime)).diff(moment());
          setDiffDuration(moment.duration(diff));
        }
      }, 1000);
    }
  }, []);

  return (
    <S.Container>
      <S.TimeContainer>
        <S.Time>{handleFormatNumber(diffDuration.days())}</S.Time>
        <S.Title>DAY</S.Title>
      </S.TimeContainer>
      {clockColon}
      <S.TimeContainer>
        <S.Time>{handleFormatNumber(diffDuration.hours())}</S.Time>
        <S.Title>HR</S.Title>
      </S.TimeContainer>
      {clockColon}
      <S.TimeContainer>
        <S.Time>{handleFormatNumber(diffDuration.minutes())}</S.Time>
        <S.Title>MIN</S.Title>
      </S.TimeContainer>
      {clockColon}
      <S.TimeContainer>
        <S.Time>{handleFormatNumber(diffDuration.seconds())}</S.Time>
        <S.Title>SEC</S.Title>
      </S.TimeContainer>
    </S.Container>
  );
};

export default RemainingTime;
