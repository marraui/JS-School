import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  CancelButton,
  SaveButton,
} from './Layout';

export default function SaveOptions({ onSubmit }) {
  return (
    <Container>
      <CancelButton>
        Cancel
      </CancelButton>
      <SaveButton onClick={onSubmit}>
        Save
      </SaveButton>
    </Container>
  );
}

SaveOptions.propTypes = {
  onSubmit: PropTypes.func,
};

SaveOptions.defaultProps = {
  onSubmit: () => null,
};
