import { useEffect, useState } from "react";

// Utils
import { MdContentCopy } from "react-icons/md"
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FiCheckCircle } from 'react-icons/fi'

// Components
import * as S from "./StyledComponents";


const shareButtonStyle = {
  height: '3rem',
}

const ShareButtons = () => {
  const [url, setUrl] = useState<string>('')
  const [linkCopied, setLinkCopied] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);



  const copyToClipboard = () => {
    setLinkCopied(!linkCopied);

    setTimeout(() => {
      setLinkCopied(false);
    }, 1000);
  };

  useEffect(() => {
    if (window) setUrl(window.location.href)
  }, [window])

  return (
    <S.Wrapper>
      <S.Title>The more the merrier🎉.<br /> Share to increase bet liquidity</S.Title>
      <S.ButtonsWrapper>
        <S.Button>
          <FacebookShareButton
            url={url}
            resetButtonStyle={false}
            style={shareButtonStyle}
          >
            <FacebookIcon size={30} />
          </FacebookShareButton>
        </S.Button>
        <S.Button>
          <TwitterShareButton
            url={url}
            resetButtonStyle={false}
            style={shareButtonStyle}
          >
            <TwitterIcon size={30} />
          </TwitterShareButton>
        </S.Button>
        <S.Button>
          <TelegramShareButton
            data-test-id="telegram"
            url={url}
            style={shareButtonStyle}
          >
            <TelegramIcon size={30} />
          </TelegramShareButton>
        </S.Button>
        <S.CopyButton
          onMouseOver={() => setIsModalOpen(true)}
          onMouseLeave={() => setIsModalOpen(false)}
        >
          <CopyToClipboard
            text={url}
            onCopy={copyToClipboard}
          >
            {linkCopied ?
              <FiCheckCircle size={25} color='white' />
              :
              <MdContentCopy size={25} color='white' />
            }
          </CopyToClipboard>
          {isModalOpen && (
            <S.Modal>
              <S.ModalText>
                Copy Link
              </S.ModalText>
            </S.Modal>
          )}
        </S.CopyButton>
      </S.ButtonsWrapper>
    </S.Wrapper>
  );
};

export default ShareButtons;
