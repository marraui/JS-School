import styled from 'styled-components';

export const ClipWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${(props) => props.theme.primary};
  border-radius: 1rem;
  padding: 1rem;
  box-shadow: 0rem 0rem 0.1rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.darkSecondary};
  }
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
  color: ${(props) => props.theme.primaryText}
`;
