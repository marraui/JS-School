import React from 'react';
import PropTypes from 'prop-types';
import { RemoveButton, TagText, Wrapper } from './Layout';

export default function Tag({ tag, onRemove }) {
  return (
    <Wrapper>
      <RemoveButton onClick={() => onRemove(tag)} />
      <TagText>{tag}</TagText>
    </Wrapper>
  );
}
Tag.propTypes = {
  tag: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
};

Tag.defaultProps = {
  onRemove: () => null,
};
