import React from 'react';
import PropTypes from 'prop-types';
import {
  TagContainer,
  DeleteButton,
  TagText,
} from './Layout';

export default function Tag({ value, onRemove }) {
  return (
    <TagContainer>
      <DeleteButton onClick={() => onRemove(value)}>
        <i className="fa fa-times" />
      </DeleteButton>
      <TagText>
        {value}
      </TagText>
    </TagContainer>
  );
}

Tag.propTypes = {
  value: PropTypes.string.isRequired,
  onRemove: PropTypes.func,
};

Tag.defaultProps = {
  onRemove: () => {},
};
