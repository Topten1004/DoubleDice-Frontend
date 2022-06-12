// Utils
import styled from 'styled-components'
import { confirmGreen, monza } from 'styles/colors'

interface ContainerI {
    type: string
}

export const Container = styled.div<ContainerI>`
    display: flex;
    align-items: center;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    margin: 1rem 0;
    background-color: ${props => props.type==='success' ? confirmGreen : monza};
    overflow: hidden;
`

export const IconContainer = styled.div`
    width: 2rem;
    margin-right: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
`

export const Text = styled.p`
    color: white;
    font-size: 1.2rem;
    font-family: 'Poppins';    
    overflow-wrap: anywhere;
`