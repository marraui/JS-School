import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

export const SubmitButton = styled.input`
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1rem;
  background-color: ${({ theme }) => (theme.secondary)};
  border-style: unset;
  border-radius: 0.2rem;
  font-family: 'Pluto Sans Cond Regular';
  cursor: pointer;
  color: ${({ theme }) => theme.secondaryText};
`;

export const Label = styled.label`
  font-family: 'Pluto Sans Cond Regular';
  font-size: 0.8rem;
  margin-right: 0.5rem;
  color: ${(props) => props.theme.primaryText};
`;

export const InvisibleInput = styled.input`
  background-color: inherit;
  border-style: unset;
  border-bottom: 1px solid ${(props) => props.theme.lightSecondaryText};
  font-family: 'Pluto Sans Cond Regular';
  font-size: 1rem;
  color: ${(props) => props.theme.primaryText};
`;
