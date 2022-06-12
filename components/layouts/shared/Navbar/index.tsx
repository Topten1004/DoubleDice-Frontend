import React from 'react';

// Next
import Image from 'next/image'
import Link from 'next/link'

// Utils
import getImageUrl from 'utils/getImageUrl'

// Components
import * as S from './StyledComponents'
import TimeZoneSwitcher from './components/TimeZoneSwitcher'
import Links from './components/Links'
import QuotaNumber from './components/QuotaNumber';
import ConnectWallet from './components/ConnectWallet';

const Navbar = () => {
  return (
    <S.NavbarContainer>
      <S.Main>
        <S.ImageContainer>
          <Link href="/">
            <a>
              <Image
                src={getImageUrl('/imgs/doubleDiceLogo.png', true)}
                alt="Logo"
                layout="fill"
                objectFit="cover"
                loading='lazy'
              />
            </a>
          </Link>
        </S.ImageContainer>
        <Links />
        {/* <TimeZoneSwitcher /> */}
        <QuotaNumber />
        <ConnectWallet />
      </S.Main>
    </S.NavbarContainer>
  )
}

export default Navbar