import styled from 'styled-components';

export const Button = styled.span`
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 20px;
  bottom: 20px;
  border-radius: 100%;
  background-color: ${({ theme }) => theme.secondaryColor};
  color: ${({ theme }) => theme.primaryColor};
  cursor: pointer;
  box-shadow: 0px 0px 5px #000000;
  &:hover {
    box-shadow: 0px 0px 10px #000000;
  }
`;

export const Display = styled.div`
  box-sizing: border-box;
  width: ${({ opened }) => (opened ? '80vw' : '0px')};
  height: 100vh;
  transition: all 1s;
  background-color: ${({ theme }) => theme.lightPrimaryColor};
  color: ${({ theme }) => theme.primaryTextColor};
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.2rem;
  box-shadow: 0px 0px 5px #000000;
  position: fixed;
  top: 0px;
  right: 0px;
  overflow: scroll;
`;

export const JsonText = styled.pre`
  margin-left: 10px;
`;

export const ButtonText = styled.i`
  display: inline-block;
  color: ${({ theme }) => theme.primaryColor};
  font-weight: bold;
  font-style: normal;
  height: min-content;
  font-family: 'Roboto', sans-serif;
  margin-top: -2px;
  cursor: pointer;
`;

export const Overlay = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0px;
  top: 0px;
  background-color: ${({ theme }) => theme.greyFilter};
`;
