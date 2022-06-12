import { useEffect, useRef, useState } from "react"

// Next
import Link from 'next/link'

// Utils
import * as S from "./StyledComponents"
import { MdContentCopy } from "react-icons/md"
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import { supernova } from "styles/colors"
import Confetti from 'react-confetti'
import { FiCheckCircle } from 'react-icons/fi'
import ReactAudioPlayer from 'react-audio-player'
import { CopyToClipboard } from 'react-copy-to-clipboard'

// Components
import Navbar from 'components/layouts/shared/Navbar'


interface WindowSizeI {
  width: number
  height: number
}

interface PropsI {
  id: string | null;
}

const Success = ({ id }: PropsI) => {
  const [url, setUrl] = useState<string>('')
  const [linkCopied, setLinkCopied] = useState<boolean>(false)
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth)
  const [screenHeight, setScreenHeight] = useState<number>(window.innerHeight)


  const copyToClipboard = () => {
    setLinkCopied(!linkCopied);

    setTimeout(() => {
      setLinkCopied(false);
    }, 1000);
  };

  useEffect(() => {
    const vfId = id ? id : "";
    const link = `${window.location.origin}/bet/${vfId}`;
    setUrl(link)
  }, [])

  useEffect(() => {
    setScreenHeight(window.innerHeight)
  }, [window.innerHeight])

  useEffect(() => {
    setScreenWidth(window.innerWidth)
  }, [window.innerWidth])

  return (
    <S.Wrapper>
      <Navbar />
      <S.SubWrapper>
        <S.Emoji>🎉</S.Emoji>
        <S.Title>The room has been created</S.Title>
        <S.Description>Share the link to the room with your friends</S.Description>
        <S.LinksWrapper>
          <S.LinkContainer>
            <S.ReadOnlyInput readOnly value={url} />
            <CopyToClipboard
              text={url}
              onCopy={copyToClipboard}
            >
              <S.CopyButton data-name="copy-link">
                {linkCopied ?
                  <FiCheckCircle size={20} color={supernova} />
                  :
                  <MdContentCopy size={20} color={supernova} />
                }
              </S.CopyButton>
            </CopyToClipboard>
          </S.LinkContainer>
          <S.ShareTitle>Share with your friends</S.ShareTitle>
          <S.IconsContainer>
            <S.IconButton>
              <FacebookShareButton
                data-test-id="facebook"
                url={url}
                className="mb-5"
                resetButtonStyle={false}
              >
                <FacebookIcon size={30} />
              </FacebookShareButton>
            </S.IconButton>
            <S.IconButton>
              <TwitterShareButton
                data-test-id="twitter"
                className="mb-5"
                url={url}
                resetButtonStyle={false}
              >
                <TwitterIcon size={30} />
              </TwitterShareButton>
            </S.IconButton>
            <S.IconButton>
              <TelegramShareButton
                data-test-id="telegram"
                url={url}
              >
                <TelegramIcon size={30} />
              </TelegramShareButton>
            </S.IconButton>
          </S.IconsContainer>
          <S.LinkToRoomButton>
            <Link href={url}>
              <S.ATag>
                Into the room
              </S.ATag>
            </Link>
          </S.LinkToRoomButton>
          <S.LinkToMainButton>
            <Link href="/">
              <S.ATag>
                main page
              </S.ATag>
            </Link>
          </S.LinkToMainButton>
        </S.LinksWrapper>
      </S.SubWrapper>
      {
        (screenWidth && screenHeight) ?
          <>
            <Confetti
              width={screenWidth}
              height={screenHeight}
              recycle={false}
              numberOfPieces={400}
            />
            <ReactAudioPlayer
              src="/sounds/horn.mp3"
              autoPlay
              volume={0.05}
            />
          </>
          : ''}
    </S.Wrapper>
  );
};

export default Success;
