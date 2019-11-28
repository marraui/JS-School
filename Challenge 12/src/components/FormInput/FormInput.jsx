import React from 'react';
import PropTypes from 'prop-types';
import {
  ErrorMessage,
  Input,
  InputName,
  Wrapper,
} from './Layout';

export default function FormInput({
  name,
  value,
  error,
}) {
  return (
    <Wrapper htmlFor="">
      <InputName>{`${name}:`}</InputName>
      <Input value={value} type="text" />
      {error ? (<ErrorMessage>{error.message}</ErrorMessage>) : null}
    </Wrapper>
  );
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
  ]),
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

FormInput.defaultProps = {
  value: '',
  error: undefined,
};
