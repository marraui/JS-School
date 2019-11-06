import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: min-content 1fr;
  width: 100vw;
  height: 100vh;
`;

export const VideoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ClipContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
`;
