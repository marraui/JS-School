import styled from 'styled-components';

export const HeaderContainer = styled.form`
  width: 100vw;
  height: 3.2rem;
  background-color: ${({ theme }) => theme.lightSecondaryText};
  display: flex;
  justify-content: center;
  padding: 0.7rem;
  box-sizing: border-box;
`;

export const SearchInput = styled.input`
  width: 70%;
  height: 100%;
  padding: 0rem 0.5rem;
  box-sizing: border-box;
`;
