import styled from 'styled-components';

export const AppContainer = styled.div`
  display: grid;
  grid-template-columns: 12.3125rem 39fr 12.3125rem;
  grid-template-rows: 80fr 921fr;
  height: 53.5625rem;
  background-color: ${(props) => props.theme.lighterPrimary};

  @media (max-width: 1020px) {
    grid-template-columns: 2fr 1fr;
    grid-template-rows: repeat(5, min-content);
    height: 100vh;
  }
  
  @media (min-height: 850px) {
    height: 100vh;
  }  
`;

export const CollapsibleButton = styled.div`
  display: none;
  @media (max-width: 1020px) {
    grid-column: ${(props) => ((props.toTheRight && '2') || '1')};
    grid-row: 3;
    justify-self: ${(props) => ((props.toTheRight && 'right') || 'left')};
    background: ${(props) => props.theme.primaryText};
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.primary};
    padding: 1.25rem;
    border-radius: ${(props) => ((props.toTheRight && '0.625rem 0rem 0rem 0.625rem') || '0rem 0.625rem 0.625rem 0rem')};
  }
`;

export const LeftSideBar = styled.div`
  grid-column: 1/2;
  grid-row: 2/3;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content;
  row-gap: 2.9375rem;
  background-color: ${(props) => props.theme.primaryText};
  padding: 1.875rem 2rem;

  @media (max-width: 1020px) {
    grid-column: 1/3;
    grid-row: 4;
    display: ${(props) => ((props.opened && 'grid') || 'none')};
  }
`;

export const SubLeftSideBar = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1.2188rem;
`;

export const RightSideBar = styled.div`
  grid-column: 3/4;
  grid-row: 2/3;
  background-color: ${(props) => props.theme.primaryText};
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  padding: 2rem 1.75rem;
  row-gap: 1.3938rem;

  @media (max-width: 1020px) {
    grid-column: 1/3;
    grid-row: 5;
    display: ${(props) => ((props.opened && 'grid') || 'none')};
  }
`;

export const LeftSideBarItem = styled.div`
  color: ${(props) => ((props.selected && props.theme.primary) || props.theme.secondary)};
  font-size: 0.6875rem;
  font-family: "Pluto Sans Cond Light";
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  .fa {
    font-size: 0.75rem;
    margin-right: 0.8125rem;
  }
`;

export const RightSideBarItem = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-family: 'Pluto Sans Cond Light';
  color: ${(props) => props.theme.lightPrimary};
  font-size: 0.6188rem;
`;

export const LeftSideBarTitle = styled.div`
  font-family: 'Pluto Sans Cond Light';
  color: ${(props) => props.theme.primary};
  font-size: 0.6875rem;
`;

export const RightSideBarTitle = styled.div`
  font-family: 'Pluto Sans Bold';
  font-size: 0.5625rem;
  color: ${(props) => props.theme.lightPrimary};
`;
