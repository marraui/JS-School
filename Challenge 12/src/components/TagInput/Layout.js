import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  row-gap: 5px;
`;

export const Input = styled.input`
  font-size: 1rem;
  font-family: 'Roboto', sans-serif;
  color: ${({ theme }) => theme.primaryTextColor};
  background-color: ${({ theme }) => theme.lightPrimaryColor};
  border-style: unset;
  box-shadow: 0px 0px 2px 0px ${({ theme }) => theme.primaryTextColor};
  padding: 5px;
`;

export const Button = styled.div`
  background-color: ${({ theme }) => theme.secondaryColor};
  color: ${({ theme }) => theme.primaryColor};
  font-size: 1rem;
  box-shadow: 0px 0px 2px 0px ${({ theme }) => theme.primaryTextColor};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  cursor: pointer;
`;

export const TagDisplay = styled.div`
  grid-column: 1/3;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
