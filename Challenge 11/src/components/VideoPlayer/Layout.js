import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  height: min-content;
`;

export const Controls = styled.div`
  position: absolute;
  bottom: 1rem;
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  z-index: 3;
  width: 100%;
`;

export const PlayButton = styled.div`
  color: ${(props) => props.theme.secondary};
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem;
`;

export const ProgressBarContainer = styled.div`
  border-radius: 1rem;
  background-color: ${(props) => props.theme.lightSecondaryText};
  height: 0.5rem;
  align-self: center;
  cursor: pointer;
  position: relative;
`;

export const ProgressBar = styled.div`
  width: ${(props) => (props.progress ? props.progress : '0%')};
  background-color: ${(props) => props.theme.secondary};
  border-radius: 1rem;
  height: 100%;
`;

export const ClipButton = styled.div`
  color: ${(props) => props.theme.secondary};
  font-size: 1rem;
  cursor: pointer;
  padding: 0.5rem;
`;

export const Video = styled.video`
  width: 100%;
`;

export const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
`;
