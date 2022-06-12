// Utils
import styled from 'styled-components'
import { ModalContainer } from 'styles/GlobalStyledComponents'

export const Main = styled(ModalContainer)`
    position: absolute;
    left: 0;
    top: 5rem;
    width: 20rem;
    height: 20rem;
    z-index: 1000;
    cursor: default;
`

export const Button = styled.button`
    display: flex;
    align-items: center;
    padding: 1rem 0;
    width: 100%;

    &:hover img{
    border-radius: 0;
    }
`

export const Text = styled.h3`
    color: white;
    margin-right: 0.5rem;
    font-size: 1.2rem;
    font-family: 'Poppins';
`