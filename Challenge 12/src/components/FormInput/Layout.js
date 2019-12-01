import styled from 'styled-components';

export const Wrapper = styled.label`
  display: ${({ hide }) => (hide ? 'none' : 'grid')};
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, min-content);
`;

export const InputName = styled.span`
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  color: ${({ theme }) => theme.lightPrimaryTextColor};
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  color: ${({ theme }) => theme.primaryTextColor};
  background-color: ${({ theme }) => theme.lightPrimaryColor};
  border-style: unset;
  box-shadow: 0px 0px 2px 0px ${({ theme }) => theme.primaryTextColor};
  padding: 5px;
  width: 100%;
  box-sizing: border-box;
`;

export const ErrorMessage = styled.span`
  font-size: 0.8rem;
  font-family: 'Roboto', sans-serif;
  color: ${({ theme }) => theme.error};
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Overlay = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.greyFilter};
`;
