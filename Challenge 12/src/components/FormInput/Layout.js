import styled from 'styled-components';

export const Wrapper = styled.label`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, min-content);
`;

export const InputName = styled.span`
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  color: ${({ theme }) => theme.lightPrimaryTextColor};
`;

export const Input = styled.input`
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  color: ${({ theme }) => theme.primaryTextColor};
  background-color: ${({ theme }) => theme.lightPrimaryColor};
  border-style: unset;
  box-shadow: 0px 0px 2px 0px ${({ theme }) => theme.primaryTextColor};
`;

export const ErrorMessage = styled.span`
  font-size: 0.8rem;
  font-family: 'Roboto', sans-serif;
  color: ${({ theme }) => theme.error};
  white-space: nowrap;
  text-overflow: ellipsis;
`;
