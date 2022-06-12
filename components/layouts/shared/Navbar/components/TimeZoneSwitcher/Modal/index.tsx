import React from 'react';

// Utils
import ReactCountryFlag from "react-country-flag"

// Components
import * as S from './StyledComponents'

interface PropsI {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const mockData = [
  {
    name: 'United States',
    code: 'US'
  },
  {
    name: 'Germany',
    code: 'DE'
  },
  {
    name: 'United Kingdom',
    code: 'GB'
  },
  {
    name: 'France',
    code: 'FR'
  },
  {
    name: 'Spain',
    code: 'ES'
  },
  {
    name: 'Brazil',
    code: 'BR'
  },
]

const CountriesTimeZonesModal = ({setIsModalOpen} : PropsI) => {
  return (
    <S.Main>
      {mockData?.map(country => (
        <S.Button key={country.code} onClick={() => setIsModalOpen(false)}>
          <ReactCountryFlag
            className="time-zone-flag"
            svg
            countryCode={country.code}
            style={{
              fontSize: '2rem',
              lineHeight: '2em',
              transition: 'all 0.4s ease-out',
            }}
            aria-label={country.name}
          />
          <S.Text>{country.name}</S.Text>
        </S.Button>
      ))}
    </S.Main>
  )
}

export default CountriesTimeZonesModal