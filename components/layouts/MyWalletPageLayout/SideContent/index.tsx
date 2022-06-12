import React, { useEffect, useState } from "react";

// Utils
import { useMediaQuery } from "react-responsive";

// Components
import * as S from "./StyledComponents";
import RightSideInfo from '../../../../components/betPage/RightSideInfo'
import DiscordWidget from '../../../../components/shared/discordWidget'

// GraphQL
import { VirtualFloor } from "lib/graph";


interface PropsI {
  vf: VirtualFloor
}

const SideBar = ({ vf }: PropsI) => {
  const [discordWidgetHeight, setDiscordWidgetHeight] = useState<string>('300px')

  const isLaptopVerySmall = useMediaQuery({ query: '(max-height: 800px)' })
  const isLaptopSmall = useMediaQuery({ query: '(max-height: 900px)' })
  const isLaptop = useMediaQuery({ query: '(max-height: 1000px)' })
  const isLaptopBig = useMediaQuery({ query: '(min-height: 1000px)' })

  useEffect(() => {
    let newDiscordWidgetHeight = '350px';
    if (isLaptopVerySmall) newDiscordWidgetHeight = '350px'
    else if (isLaptopSmall) newDiscordWidgetHeight = '450px'
    else if (isLaptop) newDiscordWidgetHeight = '500px'
    else if (isLaptopBig) newDiscordWidgetHeight = '600px'

    setDiscordWidgetHeight(newDiscordWidgetHeight)
  }, [isLaptopSmall, isLaptopSmall, isLaptopVerySmall, isLaptopBig])

  return (
    <S.AsideWrapper>
      <S.AsideSubWrapper>
        <RightSideInfo vf={vf} />
        <S.DiscordWidget>
          <DiscordWidget
            channel={vf.discordChannelId}
            style={{
              width: "100%",
              height: discordWidgetHeight,
            }}
          />
        </S.DiscordWidget>
      </S.AsideSubWrapper>
    </S.AsideWrapper>
  );
};

export default SideBar;
