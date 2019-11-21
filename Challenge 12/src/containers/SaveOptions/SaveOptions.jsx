import React from 'react';
import {
  Container,
  CancelButton,
  SaveButton,
} from './Layout';

export default function SaveOptions() {
  return (
    <Container>
      <CancelButton>
        Cancel
      </CancelButton>
      <SaveButton>
        Save
      </SaveButton>
    </Container>
  );
}
