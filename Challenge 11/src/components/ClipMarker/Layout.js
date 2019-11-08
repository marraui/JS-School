import styled from 'styled-components';

export const MarkerContainer = styled.div`
  color: ${(props) => props.theme.secondary};
  position: absolute;
  left: ${(props) => (props.position ? `${props.position * 100}%` : '0')};
  bottom: 0.5rem;
`;

export const Marker = styled.div`
  margin-left: -50%;
  font-size: 1rem;
`;
