import React from "react";

// Next
import Image from "next/image";

// Utils
import getImageUrl from 'utils/getImageUrl'

// Components
import * as S from "./StyledComponents";


const SideBar = () => {
  return (
    <S.SideBarContainer>
      <S.ProfileImageContainer>
        <Image
          src={getImageUrl('/mock/profilePic.png', true)}
          alt="Profile Pic"
          layout="fixed"
          objectFit="cover"
          height={40}
          width={40}
          loading="lazy"
        />
      </S.ProfileImageContainer>
      {/* 
      {opponents?.length > 0 &&
        opponents.map(opponent => (
          <S.GameImageContainer>
            <S.Image
              src={opponent.image}
              alt={opponent.title}
              width={40}
              height={40}
            />
          </S.GameImageContainer>
        ))
      } */}
    </S.SideBarContainer>
  );
};

export default SideBar;
