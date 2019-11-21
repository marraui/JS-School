import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  position: relative;
`;

export const BurgerButtonContainer = styled.div`
  box-sizing: border-box;
  display: none;
  padding: 0.5rem 0.5rem;
  width: 100%;
  background-color: ${({ theme }) => theme.lightSecondaryColor};
  justify-content: flex-end;
  
  @media (max-width: 1020px) {
    display: flex;
  }
`;

export const BurgerButton = styled.div`
  color: ${({ theme }) => theme.lightPrimaryTextColor};
  font-size: 1.5rem;
  border-radius: 10px;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.primaryColor};
`;

export const NavbarLink = styled(Link)`
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  color: ${({ theme }) => theme.lightPrimaryTextColor};
  background-color: ${({ selected, theme }) => (selected && theme.primaryColor) || theme.lightSecondaryColor};
  padding: 1rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  text-decoration: none;
  border: 3px solid ${({ theme }) => theme.lightSecondaryColor};

  @media (max-width: 1020px) {
    justify-content: flex-start;
    padding: 1rem 1rem;
  }
`;

export const TabsContainer = styled.div`
  display: grid;
  width: 100%;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  background-color: ${({ theme }) => theme.primaryColor};
  column-gap: 0.3rem;

  @media (max-width: 1020px) {
    display: ${({ open }) => (open && 'unset') || 'none'};
    position: absolute;
    left: 0;
    grid-auto-columns: unset;
    grid-auto-flow: unset;
    grid-template-columns: 1fr;
  }
`;
