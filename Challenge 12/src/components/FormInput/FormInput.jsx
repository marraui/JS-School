import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'formik';
import {
  ErrorMessage,
  InputName,
  Wrapper,
  Input,
} from './Layout';

function FormInput({
  name,
  placeholder,
  type,
  options,
  hide,
  value,
  touched,
  error,
  validateOnBlur,
  validateOnChange,
  submitted,
  onChange,
  onBlur,
}) {
  return (
    <Wrapper hide={hide} htmlFor="">
      <InputName>{`${name}:`}</InputName>
      <Input
        value={value}
        type="text"
        placeholder={type !== 'select' ? placeholder : undefined}
        as={type === 'select' ? 'select' : 'input'}
        onChange={(event) => onChange(event.target.value)}
        onBlur={onBlur}
      >
        {type === 'select' ? options.map((option) => (
          <option key={option} value={option}>{option}</option>
        )) : null}
      </Input>
      {error && (
        (validateOnBlur && touched)
        || (value && validateOnChange)
        || submitted
      ) ? (<ErrorMessage>{error}</ErrorMessage>) : null}
    </Wrapper>
  );
}

export default connect(FormInput);

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
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  touched: PropTypes.bool,
  validateOnBlur: PropTypes.bool,
  validateOnChange: PropTypes.bool,
  submitted: PropTypes.bool,
};

FormInput.defaultProps = {
  value: '',
  placeholder: '',
  error: undefined,
  type: 'text',
  options: [],
  hide: false,
  onChange: () => null,
  onBlur: () => null,
  touched: false,
  validateOnBlur: true,
  validateOnChange: false,
  submitted: false,
};
