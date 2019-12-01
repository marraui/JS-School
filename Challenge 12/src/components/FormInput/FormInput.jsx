import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'formik';
import TagInput from '../TagInput/TagInput';
import {
  ErrorMessage,
  InputName,
  Wrapper,
  Input,
  InputWrapper,
  Overlay,
} from './Layout';

const getComponentFromType = (type) => {
  if (type === 'select') return 'select';
  if (type === 'tag-input') return TagInput;
  return 'input';
};

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
  disabled,
}) {
  const handleClick = (event) => {
    if (!disabled) return;
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <Wrapper onClick={handleClick} hide={hide} htmlFor="">
      <InputName>{`${name}:`}</InputName>
      <InputWrapper>
        {disabled ? <Overlay /> : null}
        <Input
          value={value}
          type="text"
          placeholder={type !== 'select' ? placeholder : undefined}
          as={getComponentFromType(type)}
          onChange={type !== 'tag-input' ? (event) => onChange(event.target.value) : onChange}
          onBlur={onBlur}
        >
          {type === 'select' ? options.map((option) => (
            <option key={option} value={option}>{option}</option>
          )) : null}
        </Input>
      </InputWrapper>
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
    PropTypes.arrayOf(PropTypes.string),
  ]),
  placeholder: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  hide: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  touched: PropTypes.bool,
  validateOnBlur: PropTypes.bool,
  validateOnChange: PropTypes.bool,
  submitted: PropTypes.bool,
  disabled: PropTypes.bool,
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
  disabled: false,
};
