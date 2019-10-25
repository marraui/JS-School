import styled from 'styled-components';

export const BookDisplayContainer = styled.div`
  grid-column: 2/3;
  grid-row: 2/3;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;
  grid-template-rows: auto 1fr;
  row-gap: 1.125rem;
  background-color: #F5F6F8;
  padding: 1.5625rem 4.125rem 0rem 4.125rem;
  overflow: scroll;
`;

export const BookDisplayHeader = styled.div`
  grid-column: 1/5;
  grid-row: 1;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr;

  .main-header {
    grid-column: 1/5;
    grid-row: 1;
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 2fr;
  }

  .main-title {
    grid-column: 1;
    grid-row: 1;
    font-family: 'Pluto Sans Cond Light';
    font-size: 1.0313rem;
    color: #231F20;
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
    color: #979797;
    justify-self: right;
    align-self: center;
    border-right-width: 0.0625rem;
    border-right-style: solid;
    border-right-color: #979797;
    padding-right: 0.4375rem;
  }

  .popularity {
    grid-column: 2;
    grid-row: 1;
    font-family: 'Pluto Sans Cond Regular';
    font-size: 0.7188rem;
    color: #858585;
    align-self: center;
    justify-self: left;
    padding-left: 0.4375rem;
  }
  
  .view-style {
    grid-column: 4;
    grid-row: 1;
    font-size: 1rem;
    color: #6EC1E4;
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
`;

export const Pagination = styled.div`
  grid-column: 1/5;
  align-items: center;
  justify-content: center;
  display: grid;
  color: white;
  grid-template-columns: min-content min-content;
  column-gap: 0.3rem;
`;

export const Arrow = styled.div`
  background-color: #6EC1E4;
  border-radius: 0.5rem;
  padding: 0.5rem;
  display: ${(props) => (props.show !== undefined ? (props.show && 'unset') || 'none' : 'unset')};
`;
