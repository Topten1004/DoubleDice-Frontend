// Utils
import styled from 'styled-components'
import { alto } from 'styles/colors'


export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

export const SubContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`

export const TitleContainer = styled.div`
  width: 9rem;
  min-width: 9rem;
`

export const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 11rem);
  height: 6rem;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 1.2rem 0 0 1.2rem;
  padding: 1.6rem;
  padding-right: 0;
`

export const Input = styled.input`
  min-width: 2rem;
  background: transparent;
  border: none;
  font-family: 'Poppins';
  outline: none !important;
  color: white;
  font-size: 1.6rem;

  &::-webkit-outer-spin-button,::-webkit-inner-spin-button {
      -webkit-appearance: none;
  }
`

export const Ratio = styled.div`
  width: 11rem;
  height: 6rem;
  padding: 1.6rem;
  background: rgba(255, 255, 255, 0.06);
  border: none;
  border-radius: 0 1.2rem 1.2rem 0;
  font-family: 'Poppins';
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

export const RatioText = styled.p`
  font-size: 1.4rem;
  letter-spacing: 0.2rem;
  color: ${alto};
`