import styled from 'styled-components';

export const ClipWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${(props) => props.theme.lightPrimary};
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0rem 0rem 0.8rem;
  &:hover {
    background-color: ${(props) => props.theme.darkSecondary};
  }
`;

export const InvisibleInput = styled.input`
  background-color: inherit;
  border-style: unset;
  font-family: 'Pluto Sans Cond Regular';
  font-size: 1rem;
`;
