import { useRef, useState } from 'react'
import { Outcome } from 'lib/graph';
import { Bet } from 'utils/types';

// Utils
import useOutsideAlerter from 'components/hooks/clickedOutside';

// Components
import * as S from './StyledComponents'
import * as SC from 'components/shared/SelectButton/StyledComponents'

interface PropsI {
  setChosenBet: React.Dispatch<React.SetStateAction<Bet | null>>
  chosenBet: Bet | null
  betData: Bet[]
  isBetOpen?: boolean
}

const BetOptions = ({ setChosenBet, chosenBet, betData, isBetOpen = true }: PropsI) => {
  const wrapperRef = useRef(null);
  const [IsModalOpen, setIsModalOpen] = useState<boolean>(false)

  const buttonRef = useRef(null);
  useOutsideAlerter(buttonRef, () => setIsModalOpen(false));

  const handleModalClose = (bet: Bet) => {
    if (isBetOpen) {
      setChosenBet(bet);
    }
    setIsModalOpen(false);
  }

  return (
    <S.Wrapper ref={buttonRef}>
      <S.ButtonWrapper onClick={() => setIsModalOpen(true)}>
        {chosenBet ?
          <S.SelectedBox>
            <S.Circle
              color={chosenBet.color}
            />
            <S.Number>{chosenBet.index}</S.Number>
            <S.Description>{chosenBet.title}</S.Description>
          </S.SelectedBox>
          :
          <S.Text>Select option</S.Text>
        }
        <S.OptionsDropDown>
          <svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path opacity="1" fillRule="evenodd" clipRule="evenodd" d="M3.5 4L7 0H0L3.5 4Z" fill="white" />
          </svg>
        </S.OptionsDropDown>
      </S.ButtonWrapper>

      {
        IsModalOpen && (
          <S.ModalWrapper>
            {betData.map((bet, i) => {
              let isSelected = false
              if (chosenBet) isSelected = chosenBet.index - 1 === i
              return (
                <S.Box
                  ref={isSelected ? wrapperRef : null}
                  onClick={(e) => handleModalClose(bet)}
                  selected={isSelected}
                  isBetOpen={isBetOpen}
                  key={bet.title}
                >
                  <S.Circle selected={isSelected} color={bet.color} />
                  <S.Number>{bet.index}</S.Number>
                  <S.Description>{bet.title}</S.Description>
                </S.Box>
              );
            })}
          </S.ModalWrapper>
        )
      }
    </S.Wrapper>
  );
};

export default BetOptions
