import styled from 'styled-components';

export const ReservationContainer = styled.div`
  background: rgba(35, 31, 32, 0.88);
  color: white;
  font-family: 'Pluto Sans Regular';
  font-size: 1.5rem;
  position: absolute;
  left: ${(props) => (props.reversed ? '-20.625rem' : '10.3125rem')};
  top: 0rem;
  width: 19.375rem;
  z-index: 100 !important;
  padding: 1.5625rem;
  border-radius: 0.25rem;
  box-sizing: border-box;

  @media (max-width: 1020px) {
    top: 0rem;
    left: 0rem !important;
    width: 100vw;
    height: 100vh;
    position: fixed;
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

export const FormInput = styled.label`
  display: grid;
  grid-template-columns: min-content;
  margin-bottom: 1rem;
`;

export const SubmitButton = styled.input`
  padding: 0.4rem;
  border-radius: 10%;
  background-color: #5EB4DD;
  color: #FFFFFF;
  font-size: 1rem;
  white-space: unset;
  border-style: unset;
  border-width: 0;
`;
