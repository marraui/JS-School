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
  position: relative;
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

export const ClipMessage = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.seethrough};
  color: ${({ theme }) => theme.secondaryText};
  padding: 0.5rem;
  font-size: 0.7rem;
  font-family: 'Pluto Sans Cond Regular';
  width: 6rem;
  top: -3rem;
  left: 50%;
  margin-left: -3rem;
  border-radius: 0.2rem;
  box-sizing: border-box;

  &::before {
    content: "";
    width: 0px;
    height: 0px;
    border-left: 0.6rem solid transparent;
    border-right: 0.6rem solid transparent;
    border-top: 0.6rem solid rgba(35,31,32,0.88);
    position: absolute;
    top: 100%;
    left: 50%;
    margin-left: -0.6rem;
  }

  @media (max-width: 1020px) {
    left: 100%;
    margin-left: -6rem;

    &::before {
      left: 100%;
      margin-left: -1.5rem;
    }
  }
`;

export const ProgressBarMessage = styled.div`
  position: absolute;
  background-color: ${({ theme }) => theme.seethrough};
  color: ${({ theme }) => theme.secondaryText};
  padding: 0.5rem;
  font-size: 0.7rem;
  font-family: 'Pluto Sans Cond Regular';
  width: 8rem;
  top: 1.3rem;
  left: 50%;
  margin-left: -4rem;
  border-radius: 0.2rem;
  box-sizing: border-box;

  &::before {
    content: "";
    width: 0px;
    height: 0px;
    border-left: 0.6rem solid transparent;
    border-right: 0.6rem solid transparent;
    border-bottom: 0.6rem solid rgba(35,31,32,0.88);
    position: absolute;
    top: -0.6rem;
    left: 50%;
    margin-left: -0.6rem;
  }
`;

export const CountDown = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.seethrough};
  color: ${({ theme }) => theme.secondaryText};
  font-size: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;

  &::before {
    content: "${({ count }) => count}"
  }
`;
