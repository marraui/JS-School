import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 0.8rem;
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

export const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr min-content;
  column-gap: 1rem;
`;

export const Label = styled.label`
  display: grid;
  grid-template-columns: 3rem 1fr;
`;

export const LabelText = styled.div`
  color: ${(props) => props.theme.primaryText};
  font-family: 'Pluto Sans Cond Regular';
  font-size: 0.8rem;
  display: flex;
  align-items: flex-end;
`;

export const InvisibleInput = styled.input`
  background-color: inherit;
  border-style: unset;
  border-bottom: 1px solid ${(props) => props.theme.lightSecondaryText};
  font-family: 'Pluto Sans Cond Regular';
  font-size: 1rem;
  color: ${(props) => props.theme.primaryText};
`;
