import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Display,
  ButtonText,
  JsonText,
  Overlay,
} from './Layout';

export default function JsonDisplay({ obj }) {
  const [opened, setOpened] = useState(false);
  return (
    <>
      {opened ? <Overlay onClick={() => setOpened(!opened)} /> : null}
      <Button onClick={() => setOpened(!opened)}>
        <ButtonText>{'{ }'}</ButtonText>
      </Button>
      <Display opened={opened}>
        <JsonText>{JSON.stringify(obj, null, 2)}</JsonText>
      </Display>
    </>
  );
}

JsonDisplay.propTypes = {
  obj: PropTypes.shape({}).isRequired,
};
