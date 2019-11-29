import React from 'react';
import PropTypes from 'prop-types';
import {
  ErrorMessage,
  InputName,
  Wrapper,
  Input,
} from './Layout';

export default function FormInput({
  name,
  value,
  placeholder,
  error,
  type,
  options,
  hide,
}) {
  return (
    <Wrapper hide={hide} htmlFor="">
      <InputName>{`${name}:`}</InputName>
      <Input
        value={value}
        type={type}
        placeholder={type === 'text' ? placeholder : undefined}
        as={type === 'select' ? 'select' : 'input'}
      >
        {type === 'select' ? options.map((option) => (
          <option key={option} value={option}>{option}</option>
        )) : null}
      </Input>
      {error ? (<ErrorMessage>{error.message}</ErrorMessage>) : null}
    </Wrapper>
  );
}

FormInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  placeholder: PropTypes.string,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  type: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  hide: PropTypes.bool,
};

FormInput.defaultProps = {
  value: '',
  placeholder: '',
  error: undefined,
  type: 'text',
  options: [],
  hide: false,
};
