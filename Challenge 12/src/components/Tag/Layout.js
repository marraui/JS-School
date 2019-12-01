import styled from 'styled-components';

export const Wrapper = styled.span`
  border-radius: 5px;
  padding: 5px;
  background-color: ${({ theme }) => theme.lightPrimaryColor};
  display: inline-flex;
  margin-left: 5px;
  margin-top: 5px;
`;

export const RemoveButton = styled.i.attrs(() => ({ className: 'fa fa-times' }))`
  font-size: 16px;
  height: 16px;
  width: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  color: ${({ theme }) => theme.primaryTextColor};
  cursor: pointer;
`;

export const TagText = styled.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.primaryTextColor};
`;
