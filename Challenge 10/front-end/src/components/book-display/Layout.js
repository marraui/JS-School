import styled from 'styled-components';

export const BookDisplayContainer = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  grid-template-rows: auto 1fr;
  row-gap: 1.125rem;
  background-color: ${(props) => props.theme.lighterPrimary};
  padding: 1.5625rem 4.125rem 0rem 4.125rem;
  overflow: scroll;
  
  @media (max-width: 1020px) {
    grid-column: 1/3;
    grid-row: 6;
    padding: 1.5625rem 1rem 0rem 1rem;
  }
`;

export const BookDisplayHeader = styled.div`
  grid-column: 1/5;
  grid-row: 1;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;

  .main-title {
    grid-column: 1;
    grid-row: 1;
    font-family: 'Pluto Sans Cond Light';
    font-size: 1.0313rem;
    color: ${(props) => props.theme.primaryText};
  }

  .sort-by {
    grid-column: 2/4;
    grid-row: 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .release-date {
    grid-column: 1;
    grid-row: 1;
    font-family: 'Pluto Sans Cond Medium';
    font-size: 0.7188rem;
    color: ${(props) => props.theme.secondaryText};
    justify-self: right;
    align-self: center;
    border-right-width: 0.0625rem;
    border-right-style: solid;
    border-right-color: ${(props) => props.theme.secondaryText};
    padding-right: 0.4375rem;
  }

  .popularity {
    grid-column: 2;
    grid-row: 1;
    font-family: 'Pluto Sans Cond Regular';
    font-size: 0.7188rem;
    color: ${(props) => props.theme.darkSecondaryText};
    align-self: center;
    justify-self: left;
    padding-left: 0.4375rem;
  }
  
  .view-style {
    grid-column: 4;
    grid-row: 1;
    font-size: 1rem;
    color: ${(props) => props.theme.secondary};
    justify-self: end;
    align-self: center;
  }
  
  .book-view {
    grid-column: 1/5;
    grid-row: 2;
    display: grid;
    grid-template-columns: repeat(auto-fit, 9.0625rem);
    grid-auto-rows: min-content;
    column-gap: 1.25rem;
    row-gap: 2.5rem;
    justify-content: center;
  }

  @media (max-width: 1020px) {
    grid-column: 1/5;
    grid-row: 1;
    display: grid;
    grid-template-columns: 1fr;

    .main-title {
      grid-column: 1;
      grid-row: 1;
    }
  
    .sort-by {
      grid-column: 1;
      grid-row: 2;
      display: unset;
    }
  
    .release-date, .popularity {
      display: inline-block;
    }
  
    .view-style {
      grid-column: 1;
      grid-row: 3;
      justify-self: start;
    }
  }
`;

export const Pagination = styled.div`
  grid-column: 1/5;
  align-items: center;
  justify-content: center;
  display: grid;
  color: ${(props) => props.theme.primary};
  grid-template-columns: 1fr 1fr 1fr;
  justify-self: center;
  column-gap: 0.3rem;

  .page-counter {
    color: ${(props) => props.theme.primaryText};
    display: flex;
    justify-content: center;
  }
`;

export const Arrow = styled.div`
  background-color: ${(props) => props.theme.secondary};
  border-radius: 0.5rem;
  padding: 0.5rem;
  visibility: ${(props) => (props.show !== undefined ? (props.show && 'unset') || 'hidden' : 'unset')};
`;
