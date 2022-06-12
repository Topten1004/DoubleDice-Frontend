// Utils
import styled from 'styled-components'

export const ChartContainer = styled.div`
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  height: 200px;
  width: 100%;
`;

export const SVG = styled.svg`
  position: absolute;
  left: 0%;
  bottom: 0;
  width: 100%;
`

export const ToolTip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 15rem;
  height: 5rem;
  border-radius: 0.6rem;
  background-color: #1F212F;
  z-index: 10;
  transition: all 0.1s ease-out;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
`

export const Circle = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  margin-right: 1rem;
`

export const ToolTipText = styled.p`
  font-family: 'Poppins';
  font-weight: 500;
  font-size: 1.8rem;
  line-height: 2.7rem;

  & > span{
    font-family: 'Poppins';
  }
`

export const ToolTipSpan = styled.span`
  color: gray;
`