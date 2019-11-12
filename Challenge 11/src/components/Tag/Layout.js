import styled from 'styled-components';

export const TagContainer = styled.div`
  border-radius: 1rem;
  background-color: ${({ theme, selected }) => (selected ? theme.primary : theme.secondary)};
  display: inline-flex;
  padding: 0.2rem;
  margin: 0.2rem;
  align-items: center;
`;

export const DeleteButton = styled.div`
  display: inline-block;
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.8rem;
  margin-right: 0.5rem;
`;

export const TagText = styled.div`
  font-family: 'Pluto Sans Cond Regular';
  color: ${({ theme }) => theme.secondaryText};
  font-size: 0.8rem;
  display: inline-block;
`;
