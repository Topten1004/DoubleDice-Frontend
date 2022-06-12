import React from 'react';

// Components
// import VolleyBallIcon from 'public/imgs/VolleyballIcon'
// import FootballIcon from 'public/imgs/FootballIcon'
// import BaseballIcon from 'public/imgs/BaseballIcon'
// import ThreeDotsIcon from 'public/imgs/ThreeDots'
import * as S from './StyledComponents'
import * as SC from '../../StyledComponents'
import { useRouter } from 'next/router';
import Link from 'next/link';


const links = [
  {
    title: 'Bet list',
    url: '/'
  },
  {
    title: 'Create bet',
    url: '/create-bet'
  },
  {
    title: 'My wallet',
    url: '/my-wallet'
  },
  {
    title: 'Marketplace',
    url: '/marketplace'
  },
  // {
  //   title: 'Sports',
  // },
  // {
  //   title: 'Politics',
  // },
  // {
  //   title: 'Others',
  // },
  // {
  //   title: 'Live Betting',
  // },
  // {
  //   title: 'Virtuals',
  // },
  // {
  //   title: 'Casino',
  // },
  // {
  //   title: 'Games',
  // },
  // {
  //   title: 'Poker',
  // },
  // {
  //   title: 'Football',
  //   img: <FootballIcon />
  // },
  // {
  //   title: 'Basketball',
  //   img: <VolleyBallIcon />
  // },
  // {
  //   title: 'Baseball',
  //   img: <BaseballIcon />
  // }
]

const NavbarLinks = () => {
  const router = useRouter()

  return (
    <S.Main>
      <S.Container>
        {links.map((link, i) => (
          <SC.Button type='button' key={link.title} style={i === 0 ? { paddingLeft: 0 } : {}}>
            <Link href={link.url}>
              <a>
                {/* {link.img &&
              <S.ImageContainer>
                {link.img}
              </S.ImageContainer>
            } */}
                <S.Text>{link.title}</S.Text>
              </a>
            </Link>
          </SC.Button>
        ))}
        {/* <SC.Button>
          <ThreeDotsIcon />
        </SC.Button> */}
      </S.Container>
    </S.Main>
  );
}

export default NavbarLinks