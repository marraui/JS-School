import styled from 'styled-components';

export const HeaderContainer = styled.form`
  width: 100%;
  height: 3.2rem;
  background-color: ${({ theme }) => theme.lightSecondaryText};
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
  padding: 0.7rem;
  box-sizing: border-box;
`;

export const SearchInputContainer = styled.label`
  display: flex;
  justify-content: center;
`;

export const SearchInput = styled.input`
  width: 70%;
  height: 100%;
  padding: 0rem 0.5rem;
  box-sizing: border-box;
  justify-self: center;
`;

export const SwitchContainer = styled.div`
  font-family: 'Pluto Sans Cond Regular';
  color: ${({ theme }) => theme.secondaryText};
  font-size: 1rem;
  display: flex;
  align-items: center;
`;

export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
  margin-left: 1rem;
`;

export const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ checked, theme }) => (checked ? theme.secondary : theme.darkSecondaryText)};
  transition: .4s;
  border-radius: 34px;

  &::before {
    content: "";
    position: absolute;
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: ${({ theme }) => theme.primary};
    transition: all .4s;
    border-radius: 50%;
    ${({ checked }) => (checked ? 'transform: translateX(26px);' : '')};
  }
`;

export const SliderInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;
`;
