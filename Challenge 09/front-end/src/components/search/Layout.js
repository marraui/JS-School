import styled from 'styled-components';

export const SearchContainer = styled.div`
  background-color: #FCF8F3;
  text-align: center;
  grid-column: 2/3;
  grid-row: 1/2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0rem 1.25rem;
  border-bottom: 0.0625rem solid #6EC1E4;
  @media (max-width: 1020px) {
    grid-column: 1/3;
    grid-row: 2;
  }
`;

export const BookshelfTitle = styled.div`
  grid-column: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-family: 'Pluto Sans Medium';
  font-size: 1.2188rem;
`;

export const SearchBox = styled.form`
  grid-column: 2;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const InputWrapper = styled.label`
  border: 0.0625rem solid #6EC1E4;
  border-radius: 1rem 1rem 1rem 1rem;
  padding: 0.3125rem 0.625rem;
  background-color: #FFFFFF;
  display: grid;
  grid-template-columns: min-content 1fr;
  column-gap: 0.3125rem;
  width: 100%;
  max-width: 15.4375rem;
  font-size: 1rem;
`;

export const SubmitButton = styled.input`
  display: none;
`;
