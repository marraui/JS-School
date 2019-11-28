import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 16px;
  row-gap: 8px;
  padding: 35px 25px;
  box-shadow: 0px -3px ${({ theme }) => theme.lightPrimaryColor};
  background-color: ${({ theme }) => theme.primaryColor};
`;
