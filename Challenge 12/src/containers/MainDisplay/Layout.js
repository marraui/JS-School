import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  border-style: solid;
  border-color: ${({ theme }) => theme.secondaryColor};
  border-width: 5px 2px 2px 2px;
  background-color: ${({ theme }) => theme.lightPrimaryColor};
`;
