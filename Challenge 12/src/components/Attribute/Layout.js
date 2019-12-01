import styled from 'styled-components';

// eslint-disable-next-line import/prefer-default-export
export const Wrapper = styled.div`
  display: ${({ hidden }) => (hidden ? 'none' : 'grid')};
  position: relative;
  grid-template-columns: 1fr 2fr;
  column-gap: 16px;
  row-gap: 8px;
  padding: 35px 25px;
  box-shadow: 0px -3px ${({ theme }) => theme.lightPrimaryColor};
  background-color: ${({ theme }) => theme.primaryColor};
`;

export const DeleteIcon = styled.i.attrs(() => ({ className: 'fa fa-trash' }))`
  position: absolute;
  left: 10px;
  top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.lightPrimaryTextColor};
  cursor: pointer;
`;

export const ToggleIcon = styled.i.attrs(({ collapsed }) => ({
  className: `fa fa-angle-double-${(collapsed && 'down') || 'up'}`,
}))`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 12px;
  color: ${({ theme }) => theme.lightPrimaryTextColor};
  cursor: pointer;
`;
