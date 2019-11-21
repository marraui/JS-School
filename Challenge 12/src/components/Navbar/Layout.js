import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  background-color: ${({ theme }) => theme.primaryColor};
  column-gap: 0.3rem;
`;

export const NavbarLink = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: ${({ theme }) => theme.lightPrimaryTextColor};
  background-color: ${({ theme }) => theme.lightSecondaryColor};
  padding: 1rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
`;
