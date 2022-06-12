// Utils
import styled from 'styled-components'
import { supernova } from 'styles/colors';


interface PaginationWrapperI {
  justifyContent: string
}

export const Container = styled.table`
  width: 100%;
  color: white;
  padding: 0 3rem;
`;

export const Header = styled.header`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr 1fr;
  gap: 1rem;
  align-items: center;
  width: 100%;
  padding: 1rem 3rem;
  margin: 2rem 0;
`;

export const Title = styled.h2`
  text-align: left;
  font-size: 2rem;
  text-transform: uppercase;
`;

export const BetsWrapper = styled.div`
  height: 110rem;
  display: flex;
  justify-content: center;
`;

export const PaginationWrapper = styled.div<PaginationWrapperI>`
  width: 100%;
  margin: 4rem 0;
  display: flex;
  justify-content: ${props => props.justifyContent};
  align-items: center;
`;

export const LinkWrapper = styled.div`
  cursor: pointer;
`;

export const ATag = styled.a`
  font-size: 1.4rem;
`;

export const TextWrapper = styled.div`
  display: flex;
  align-items: center;
  line-height: 2rem;
`;

export const Span = styled.span`
  font-size: 2.4rem;
  color: ${supernova};
  transform: translateY(-0.2rem);
  margin: 0 0.5rem;
`;