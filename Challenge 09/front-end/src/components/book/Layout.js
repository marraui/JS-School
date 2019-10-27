import styled from 'styled-components';

export const BookContainer = styled.div`
  display: grid;
  position: relative;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(4, min-content);
  row-gap: 0.375rem;
  
  .label-btn {
    position: relative;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
`;

export const BookmarkIcon = styled.img`
  display: ${(props) => (props.selected ? 'unset' : 'none')};
  position: absolute;
  top: 2.2rem;
  right: -0.5rem;
`;

export const BookCover = styled.div`
  width: 100%;
  height: 12.875rem;
  overflow: hidden;
  border-radius: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  .book-cover {
    width: 100%;
  }
`;

export const Seethrough = styled.div`
  background: rgba(35, 31, 32, 0.88);
  position: absolute;
  top: 0rem;
  left: 0rem;
  width: 100%;
  height: 100%;
  display: ${(props) => (props.selected ? 'grid' : 'none')};
  grid-template-columns: min-content 1fr min-content;
  grid-template-rows: 1fr 3fr 1fr;
  padding: 0.625rem;
  box-sizing: border-box;

  .heart-button-cell {
    grid-column: 1;
    grid-row: 1;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .bookmark-button-cell {
    grid-column: 3;
    grid-row: 1;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
  }

  .description-button-cell {
    grid-column: 2;
    grid-row: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .seethrough-title-rating {
    grid-column: 2;
    grid-row: 3;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
  }
`;

export const HeartButton = styled.div`
  grid-column: 1;
  grid-row: 1;
  border-radius: 100%;
  background-color: #FFFFFF;
  color: #9E9E9E;
  width: 1.5625rem;
  height: 1.5625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
`;

export const BookmarkButton = styled.div`
  grid-column: 3;
  grid-row: 1;
  border-radius: 100%;
  background-color: #FFFFFF;
  color: #9E9E9E;
  width: 1.5625rem;
  height: 1.5625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
`;

export const DescriptionButton = styled.div`
  grid-column: 2;
  grid-row: 2;
  border-radius: 100%;
  background-color: #FFFFFF;
  color: #6EC1E4;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SeethroughTitle = styled.div`
  font-family: 'Pluto Sans Cond Medium';
  font-size: 0.625rem;
  color: #FCF8F3;
  margin-bottom: 0.25rem;
`;

export const SeethroughRating = styled.div`
  font-size: 0.625rem;
  color: #E9BD49;
`;

export const BookDetails = styled.div`
  display: ${(props) => (props.selected ? 'grid' : 'none')};
  grid-template-columns: 1fr;
  row-gap: 0.75rem;
  background: rgba(35, 31, 32, 0.88);
  position: absolute;
  left: ${(props) => (props.reversed ? '-20.625rem' : '10.3125rem')};
  top: 0rem;
  width: 19.375rem;
  z-index: 3;
  padding: 1.5625rem;
  border-radius: 0.25rem;
  box-sizing: border-box;

  .book-details-section-title {
    font-family: 'Pluto Sans Cond Bold';
    color: #858585;
    font-size: 0.6875rem;
  }

  @media(max-width: 1020px) {
    top: 0rem !important;
    left: 0rem !important;
    width: 100vw;
    height: 100vh;
    position: fixed;

    .book-details-section-title {
      font-size: 1rem;
    }
  }
`;

export const BubbleTextArrow = styled.div`
  position: absolute;
  left: ${(props) => (props.reversed ? 'unset' : '-0.625rem')};
  right: ${(props) => (props.reversed ? '-0.625rem' : 'unset')};
  top: 5.8125rem;

  .bubble-text-arrow-top {
    border: 0.3125rem solid;
    border-color: ${(props) => (props.reversed ? 'transparent transparent rgba(35, 31, 32, 0.88) rgba(35, 31, 32, 0.88)' : 'transparent rgba(35, 31, 32, 0.88) rgba(35, 31, 32, 0.88) transparent')};
  }
  
  .bubble-text-arrow-bottom {
    top: 0.625rem;
    border: 0.3125rem solid;
    border-color: ${(props) => (props.reversed ? 'rgba(35, 31, 32, 0.88) transparent transparent rgba(35, 31, 32, 0.88)' : 'rgba(35, 31, 32, 0.88) rgba(35, 31, 32, 0.88) transparent transparent')};
  }

  @media(max-width: 1020px) {
    display: none;
  }
`;

export const DetailsHead = styled.div`
  grid-column: 1;
  display: grid;
  grid-template-columns: 1fr min-content;
  grid-template-rows: repeat(3, min-content);
  font-size: 0.6875rem;

  .book-details-title {
    text-transform: uppercase;
    grid-column: 1;
    color: #5EB4DD;
    font-family: 'Pluto Sans Cond Bold';
  }
  
  .book-details-year {
    grid-column: 2;
    color: #858585;
    font-family: 'Pluto Sans Cond Regular';
  }
  
  .book-details-author {
    grid-column: 1;
    font-family: 'Pluto Sans Cond Regular';
  }
  
  .book-details-novel-by {
    color: #FFFFFF;
    display: inline-block;
  }
  
  .book-details-author-name {
    color: #858585;
    display: inline-block;
  }
  
  .book-details-pages {
    font-family: 'Pluto Sans Cond Regular';
    grid-column: 1;
    color: #FFFFFF;
  }

  @media(max-width: 1020px) {
    font-size: 1rem;
  }
`;

export const DetailsSummary = styled.div`
  grid-column: 1;
  display: grid;
  grid-template-columns: 1fr;
  font-size: 0.6875rem;
  grid-template-rows: repeat(2, min-content);
  
  .book-details-summary-body {
    font-family: 'Pluto Sans Cond Regular';
    color: #FFFFFF;
  }  

  @media(max-width: 1020px) {
    font-size: 1rem;
  }
`;

export const DetailsRating = styled.div`
  grid-column: 1fr;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, min-content);

  .book-details-rating-stars {
    grid-column: 1fr;
    font-size: 0.6875rem;
    color: #6EC1E4;
  }

  @media(max-width: 1020px) {
    font-size: 1rem;
  }
`;

export const DetailsRecommended = styled.div`
  .book-details-recommended-body {
    grid-column: 1;
  }
  
  .book-details-recommended-img-wrapper {
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .book-details-recommended-img {
    max-height: 100%;
  }

  @media(max-width: 1020px) {
    .book-details-recommended-img-wrapper {
        width: 2.5rem;
        height: 2.5rem;
    }
  }
`;

export const BookTitle = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-family: 'Pluto Sans Cond Medium';
  font-size: 0.75rem;
  color: #383838;
`;

export const BookAuthor = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-family: 'Pluto Sans Cond Light';
  font-size: 0.625rem;
  color: #9E9E9E;
`;

export const LendButton = styled.div`
  font-family: 'Pluto Sans Cond Light';
  font-size: 0.625rem;
  color: #FFFFFF;
  background-color: ${(props) => (props.available ? '#6EC1E4' : 'gray')};
  border-radius: 0.3rem;
  justify-self: flex-start;
  padding: 0.3rem;
  cursor: pointer;
`;

export const BookRating = styled.div`
  font-size: 0.6875rem;
  color: #6EC1E4;
`;
