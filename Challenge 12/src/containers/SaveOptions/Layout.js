import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

export const SaveButton = styled.div`
  background-color: ${({ theme }) => theme.secondaryColor};
  color: ${({ theme }) => theme.primaryColor};
  padding: 1rem 1.5rem;
  margin-right: 0.1rem;
  font-size: 1rem;
  cursor: pointer;
`;

export const CancelButton = styled.div`
  background-color: ${({ theme }) => theme.lightPrimaryTextColor};
  color: ${({ theme }) => theme.primaryColor};
  padding: 1rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
`;
