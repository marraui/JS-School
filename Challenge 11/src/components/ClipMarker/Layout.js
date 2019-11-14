import styled from 'styled-components';

export const MarkerContainer = styled.div.attrs((props) => ({
  style: {
    color: props.color,
    left: (props.position ? `${props.position * 100}%` : '0'),
  },
}))`
  position: absolute;
  bottom: 0.5rem;
  z-index: 4;
`;

export const Marker = styled.div`
  margin-left: -50%;
  font-size: 1rem;
  z-index: 5;
`;
