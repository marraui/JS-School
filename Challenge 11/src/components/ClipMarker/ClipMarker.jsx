/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Marker,
  MarkerContainer,
} from './Layout';

export default function ClipMarker({ position, onSelect }) {
  return (
    <MarkerContainer position={position}>
      <Marker>
        <i
          onClick={() => onSelect()}
          className="fa fa-map-marker"
        />
      </Marker>
    </MarkerContainer>
  );
}

ClipMarker.propTypes = {
  position: PropTypes.number,
  onSelect: PropTypes.func,
};

ClipMarker.defaultProps = {
  position: 0,
  onSelect: () => {},
};
