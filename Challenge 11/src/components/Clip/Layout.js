import styled from 'styled-components';

export const ClipWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${(props) => props.theme.primary};
  border-radius: 1rem;
  padding: 1rem;
  row-gap: 1rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  transition: all 0.2s cubic-bezier(.25,.8,.25,1);
  cursor: pointer;
  &:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  }
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

export const IconButton = styled.div`
  color: ${({ theme }) => theme.secondary};
  font-size: 1.2rem;
  display: inline-block;
  margin-right: 0.3rem;
`;
