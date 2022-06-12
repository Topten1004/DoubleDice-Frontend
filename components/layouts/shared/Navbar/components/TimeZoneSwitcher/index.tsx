import React, { useRef, useState } from 'react';

// Utils
import ReactCountryFlag from "react-country-flag"

// Components
import * as S from './StyledComponents'
import * as SC from '../../StyledComponents'
import Modal from './Modal/index'

// Hooks
import useOutsideAlerter from 'components/hooks/clickedOutside';

const TimeZoneSwitcher = () => {
  const [IsModalOpen, setIsModalOpen] = useState<boolean>(false)
  const buttonRef = useRef(null)
  useOutsideAlerter(buttonRef, () => setIsModalOpen(false));

  return (
    <S.Main>
      <S.ButtonContainer ref={buttonRef}>
        <S.Button onClick={() => setIsModalOpen(true)}>
          <ReactCountryFlag
            className="time-zone-flag"
            svg
            countryCode="US"
            style={{
              fontSize: '1.5em',
              lineHeight: '2em',
            }}
            aria-label="United States"
          />
          <S.Text>15:41 <S.TextSpan>(GMT+1)</S.TextSpan></S.Text>
          <S.DropDown>
            <svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.2" fillRule="evenodd" clipRule="evenodd" d="M3.5 4L7 0H0L3.5 4Z" fill="white" />
            </svg>
          </S.DropDown>
        </S.Button>
        {IsModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
      </S.ButtonContainer>
      <S.SearchContainer>
        <SC.Button>
          <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6.5" cy="6.5" r="5.5" stroke="white" strokeWidth="1.3" />
            <path d="M10 11L12 13" stroke="white" strokeWidth="1.3" />
          </svg>
        </SC.Button>
      </S.SearchContainer>
    </S.Main>
  )
}

export default TimeZoneSwitcher