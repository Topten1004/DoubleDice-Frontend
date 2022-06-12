// Utils
import styled from 'styled-components'
import { confirmGreen } from 'styles/colors'


interface StepContainerI {
    isActive: boolean
}

interface CircleI {
    isActive: boolean
}

export const Container = styled.div`
`

export const ProgressBarContainer = styled.ul`
    position: relative;
    counter-reset: step;
    z-index: 1;
    margin: 2rem 0;
    height: 3rem;
    display: flex;
`

export const StepContainer = styled.li<StepContainerI>`
    list-style-type: none;
    width: 25%;
    float: left;
    font-size: 1rem;
    position: relative;
    text-align: center;
    text-transform: uppercase;

  &:after {
      width: 100%;
      height: 2px;
      content: '';
      position: absolute;
      background-color: ${props => props.isActive ? confirmGreen : 'white'};
      top: 0.5rem;
      left: -50%;
      transform: translateY(-50%);
      z-index: -1;
  }

  &:first-child:after {
      content: none;
  }
`

export const Circle = styled.div<CircleI>`
    width: 1rem;
    height: 1rem;
    line-height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 0 auto;
    border-radius: 50%;
    background-color: ${props => props.isActive ? confirmGreen : 'white'};
`

export const Text = styled.p`
    position: absolute;
    top: 2rem;
    left: 50%;
    transform: translateX(-50%);
    color: white;
    white-space: nowrap;
`