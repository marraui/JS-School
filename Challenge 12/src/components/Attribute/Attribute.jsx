/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormInput from '../FormInput';
import {
  Wrapper,
  DeleteIcon,
  ToggleIcon,
} from './Layout';

const dataTypeOptions = ['STRING', 'NONE'];
const formatOptions = ['NONE', 'NUMBER', 'BOOLEAN', 'DATE-TIME', 'CDATA', 'URI'];

function getFields(fields) {
  const stack = [...fields];
  const res = [];
  stack.reverse();
  while (stack.length > 0) {
    const field = stack.pop();
    field.accessor = typeof field.accessor === 'string' ? [field.accessor] : field.accessor;
    if (field.fieldType === 'group') {
      stack.push(...field.fields.map((child) => ({
        ...child,
        exclusiveTo: field.exclusiveTo,
        accessor: [...field.accessor, child.accessor],
      })));
    } else res.push(field);
  }
  return res;
}

const inputs = [
  {
    name: 'Name',
    accessor: 'name',
    placeholder: 'Enter a name',
  },
  {
    name: 'Description',
    accessor: 'description',
    placeholder: 'Enter a description of your new attribute',
  },
  {
    name: 'Device Resource Type',
    accessor: 'deviceResourceType',
    type: 'select',
    options: [],
    concealable: true,
  },
  {
    name: 'Default Value',
    accessor: 'defaultValue',
    placeholder: 'Enter a default value',
    concealable: true,
  },
  {
    name: 'Data Type',
    accessor: 'dataType',
    type: 'select',
    options: dataTypeOptions,
    concealable: true,
  },
  {
    name: 'Format',
    accessor: 'format',
    type: 'select',
    options: formatOptions,
    concealable: true,
  },
  {
    exclusiveTo: 'NONE',
    accessor: 'noneFields',
    fieldType: 'group',
    fields: [
      {
        name: 'Enumerations',
        accessor: 'enumerations',
        placeholder: 'Enumerations',
        concealable: true,
      },
    ],
  },
  {
    exclusiveTo: 'NUMBER',
    accessor: 'numberFields',
    fieldType: 'group',
    fields: [
      {
        fieldType: 'group',
        accessor: 'range',
        fields: [
          {
            name: 'Range Min',
            accessor: 'min',
            placeholder: 'Range min',
            concealable: true,
          },
          {
            name: 'Range Max',
            accessor: 'max',
            placeholder: 'Range max',
            concealable: true,
          },
        ],
      },
      {
        name: 'Unit of Measurement',
        accessor: 'unitOfMeasurement',
        placeholder: 'UoM (eg. mm)',
        concealable: true,
      },
      {
        name: 'Precision',
        accessor: 'precision',
        placeholder: 'Precision (eg. 0.5)',
        concealable: true,
      },
      {
        name: 'Accuracy',
        accessor: 'accuracy',
        placeholder: 'Accuracy (eg. 0.5)',
        concealable: true,
      },
    ],
  },
];

function fieldToNode(field, values, opened) {
  return (
    !field.exclusiveTo || field.exclusiveTo === values.format ? (
      <FormInput
        name={field.name}
        value={field.accessor.reduce((obj, acc) => obj[acc], values)}
        placeholder={field.placeholder}
        type={field.type}
        options={field.options}
        hide={field.concealable && !opened}
      />
    ) : null);
}

export default function Attribute(props) {
  const [opened, setOpened] = useState(true);
  const inputFields = getFields(inputs);
  return (
    <Wrapper hide={!opened}>
      <DeleteIcon />
      <ToggleIcon opened={opened} onClick={() => setOpened(!opened)} />
      {inputFields.map((field) => fieldToNode(field, props, opened))}

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
    accuracy: PropTypes.number,
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
