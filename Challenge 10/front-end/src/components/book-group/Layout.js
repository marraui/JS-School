import styled from 'styled-components';

export const BookGroupContainer = styled.div`
  grid-column: 1/5;
  grid-row: 2;
  display: grid;
  grid-template-columns: repeat(auto-fit, 9.0625rem);
  grid-auto-rows: min-content;
  column-gap: 1.25rem;
  row-gap: 2.5rem;
  justify-content: center;
`;

export const LoadContainer = styled.div`
  grid-column: 1/5;
  display: flex;
  justify-content: center;
`;
