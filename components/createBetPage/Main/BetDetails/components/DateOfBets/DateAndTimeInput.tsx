import { useEffect, useRef, useState, useLayoutEffect } from "react"

// Utils
import moment from "moment";

// Components
import * as S from "./StyledComponents"

interface PropsI {
  setTimestamp: any;
  value: number
}

const Main = ({ setTimestamp, value }: PropsI) => {
  const [time, setTime] = useState('00:00')
  const [date, setDate] = useState<any>(new Date());

  const componentMounted = useRef(false)

  const handleInputChange = (e: any) => {
    let currentTime = 0;
    if (e.target.name === "time") {
      setTime(e.target.value);
      currentTime = moment(
        `${date} ${e.target.value}`,
        "YYYY-MM-DD hh:mm"
      ).unix();
    }
    if (e.target.name === "date") {
      setDate(e.target.value);
      currentTime = moment(
        `${e.target.value} ${time}`,
        "YYYY-MM-DD hh:mm"
      ).unix();
    }
    setTimestamp(currentTime);
  }

  useLayoutEffect(() => {
    if (value && !componentMounted.current) {
      setDate(moment(value * 1000).format('YYYY-MM-DD'))
      setTime(moment(value * 1000).format('HH:mm'))
      componentMounted.current = true
    }
  }, [value])


  return (
    <S.DateAndTimeInputContainer>
      <S.DateInput
        type="date"
        placeholder="MM\DD\YY"
        name="date"
        value={date}
        min={moment().format('YYYY-MM-DD')}
        onChange={handleInputChange}
      />
      <S.TimeInput
        type="time"
        value={time}
        name="time"
        onChange={handleInputChange}
      />
    </S.DateAndTimeInputContainer>
  );
};

export default Main;
