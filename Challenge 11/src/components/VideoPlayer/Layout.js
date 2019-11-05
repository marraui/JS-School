import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Controls = styled.div`
  position: absolute;
  bottom: 1rem;
  display: grid;
  grid-template-columns: min-content 1fr min-content;
  z-index: 2;
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
  background-color: ${(props) => props.theme.secondaryText};
  height: 0.5rem;
  align-self: center;
  cursor: pointer;
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
