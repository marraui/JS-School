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

export const AddAttributeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: ${({ theme }) => theme.lightPrimaryColor};
  padding: 5px;
`;

export const AddAttributeIcon = styled.i.attrs(() => ({ className: 'fa fa-plus-circle' }))`
  font-size: 1rem;
  margin-right: 5px;
  color: ${({ theme }) => theme.secondaryColor};
  cursor: pointer;
`;

export const AddAttribute = styled.span`
  font-size: 1rem;
  color: ${({ theme }) => theme.secondaryColor};
  font-weight: bold;
  cursor: pointer;
`;
