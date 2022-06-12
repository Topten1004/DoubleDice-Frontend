// Utils
import styled from 'styled-components'

interface ImageTextI {
    maxWidth: string
}

export const Container = styled.header`
    position: relative;
    width: 75rem;
    min-height: 40rem;
    color: white;
    overflow: hidden;
    margin: 0 auto;
    padding-top: 2rem;
    padding-bottom: 2rem;
    
    @media only screen and (max-width: 1200px) {
        width: 65rem;
    }
    
    @media only screen and (max-width: 1100px) {
        width: 55rem;
    }
`

export const BackgroundImageContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 134%;
    margin-top: 5rem;
    z-index: -1;
`

export const Header = styled.header`
    margin-bottom: 5rem;
`

export const HeaderText = styled.h1`
    font-size: 3.5rem;
    padding: 1rem 0;
    text-align: center;
    text-transform: uppercase;
    overflow-wrap: break-word;
`

export const DescriptionText = styled.p`
    font-size: 1.5rem;
    text-align: center;
    overflow-wrap: break-word;
    font-family: 'Poppins';
`

export const HeaderSpan = styled.span`
    background: -webkit-linear-gradient(270deg, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 0.1));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`

export const Main = styled.main`
    z-index: 1;
    min-height: 20.5rem;
    display: flex;
    justify-content: center;
    align-items: flex-start;
`

export const MultipleImagesContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    height: 100%;
`

export const ImagesContainer = styled.div`
    display: flex;
    align-items: center;
    width: 45rem;
    margin: 0 auto;
    justify-content: space-between;
`
export const SingleImagesContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 0 9rem;
    justify-content: center;
`

export const ImageContainer = styled.div`
    text-align: center;
    margin: 2rem;
    margin-bottom: 0;
`

export const Text = styled.p`
    font-size: 4.5rem;
    line-height: 5rem;
    background: -webkit-linear-gradient(270deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.1));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    padding-bottom: 2rem;
`

export const ImageText = styled.p<ImageTextI>`
    margin-top: 1.8rem;
    font-family: 'Poppins';
    font-size: 1.4rem;
    line-height: 2rem;
    max-width: ${props => props.maxWidth ? props.maxWidth : 'none'};
    overflow-wrap: break-word;
`
