// Utils
import styled from 'styled-components'
import { supernova } from 'styles/colors';


export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(#2F3140, #181924);
  height: 10rem;
  padding: 2rem 3rem;
  margin: 1rem 0;
  cursor: pointer;
  border-radius: 2rem;
`;

export const Td = styled.div`
  font-size: 1.3rem;
`;

export const Title = styled.h6`
  font-size: 1.6rem;
`;

export const ListButton = styled.button`
  font-size: 1.6rem;
  width: 90px;
  color: white;
`;

export const CategoryText = styled.p`
  font-size: 1.2rem;
  color: ${supernova};
  margin-top: 0.5rem;
`;

export const SubTitle = styled.p`
  font-size: 1.2rem;
  color: #999598;
  margin-top: 0.5rem;
`;

export const imagesWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const ImageWrapper = styled.div`
  margin-right: 1rem;
  overflow: hidden;
  width: fit-content;
  height: fit-content;

  img{
    border-radius: 0.5rem;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 5rem;

  svg{ 
    width: 3rem;
    height: 3rem;
    fill: ${supernova};
  }
`;