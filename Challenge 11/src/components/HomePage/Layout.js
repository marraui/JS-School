import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 23.6rem;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  padding: 1.5rem 4.5rem;
  column-gap: 1.6rem;
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
