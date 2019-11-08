import React from 'react';
import PropTypes from 'prop-types';
import {
  Marker,
  MarkerContainer,
} from './Layout';

export default function ClipMarker({ position }) {
  return (
    <MarkerContainer position={position}>
      <Marker>
        <i className="fa fa-map-marker" />
      </Marker>
    </MarkerContainer>
  );
}

ClipMarker.propTypes = {
  position: PropTypes.number,
};

ClipMarker.defaultProps = {
  position: 0,
};
