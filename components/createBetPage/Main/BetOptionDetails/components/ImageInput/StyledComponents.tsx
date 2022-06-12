// Utils
import styled from 'styled-components'



export const ImageInputContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InputSubContainer = styled.div`
  width: calc(100% - 6rem);
`;

export const Header = styled.header`
  position: relative;
`

export const RemoveButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

export const Title = styled.h5`
  color: white;
  font-size: 1.2rem;
`;

export const ModalContainer = styled.div`
  margin-bottom: 1rem;
`
