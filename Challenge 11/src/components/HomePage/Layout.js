import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 23.6rem;
  grid-template-rows: repeat(2, min-content);
  width: 100%;
  box-sizing: border-box;
  padding: 1.5rem 4.5rem;
  column-gap: 1.6rem;
  row-gap: 2rem;

  @media (max-width: 1020px) {
    grid-template-columns: 1fr;
    padding-left: 0px;
    padding-right: 0px;
  }
`;

export const VideoContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
`;

export const VideoTitle = styled.div`
  font-family: 'Pluto Sans Cond Regular';
  font-size: 2rem;
`;

export const ClipContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  row-gap: 1.5rem;
`;
