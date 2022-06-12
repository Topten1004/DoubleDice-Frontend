// Utils
import styled from 'styled-components'

interface ImageContainerI {
  size: number
}

export const ImageContainer = styled.div<ImageContainerI>`
  height: ${props => `${props.size}rem`};
  width: ${props => `${props.size}rem`};
`

export const IconContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`

export const ImageInput = styled.input`
  display: none;
`

export const ImageUploadButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border:  1px dashed #656565;
  border-radius: 0.5rem;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  border: none;
  object-fit: contain;
`