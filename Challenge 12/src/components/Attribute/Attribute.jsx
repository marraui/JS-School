import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '../FormInput';
import {
  Wrapper,
} from './Layout';

export default function Attribute({
  name,
  description,
  deviceResourceType,
  defaultValue,
  dataType,
  format,
  noneFields,
  numberFields,
}) {
  return (
    <Wrapper>
      <FormInput name="name" value={name} />
      <FormInput name="description" value={description} />
      <FormInput name="deviceResourceType" value={deviceResourceType} />
      <FormInput name="defaultValue" value={defaultValue} />
      <FormInput name="dataType" value={dataType} />
      <FormInput name="format" value={format} />
    </Wrapper>
  );
}

Attribute.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  deviceResourceType: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  dataType: PropTypes.string,
  format: PropTypes.string,
  noneFields: PropTypes.shape({
    enumerations: PropTypes.arrayOf(PropTypes.string),
  }),
  numberFields: PropTypes.shape({
    range: PropTypes.shape({
      min: PropTypes.number,
      max: PropTypes.number,
    }),
    unitOfMeasurement: PropTypes.string,
    precision: PropTypes.number,
  }),
};

Attribute.defaultProps = {
  name: '',
  description: '',
  deviceResourceType: undefined,
  defaultValue: undefined,
  dataType: undefined,
  format: undefined,
  noneFields: undefined,
  numberFields: undefined,
};
