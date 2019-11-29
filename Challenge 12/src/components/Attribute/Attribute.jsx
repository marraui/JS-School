/* eslint-disable react/no-unused-prop-types */
import React, { useState } from 'react';
import { attributePropTypes } from '../../constants/redux-types';
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

export default function Attribute({
  updateAttribute,
  removeAttribute,
  ...attributeValues
}) {
  const [opened, setOpened] = useState(true);
  const { id, format } = attributeValues;
  const inputFields = getFields(inputs);
  const fieldToNode = (field) => (
    !field.exclusiveTo || field.exclusiveTo === format ? (
      <FormInput
        name={field.name}
        value={field.accessor.reduce((obj, acc) => (obj && obj[acc]) || undefined, attributeValues)}
        placeholder={field.placeholder}
        type={field.type}
        options={field.options}
        hide={field.concealable && !opened}
        key={field.name}
        onChange={(newVal) => updateAttribute({
          ...field.accessor.reverse().reduce((obj, acc) => ({ [acc]: obj }), newVal),
          id,
        })}
      />
    ) : null
  );

  return (
    <Wrapper hide={!opened}>
      <DeleteIcon onClick={() => removeAttribute(id)} />
      <ToggleIcon opened={opened} onClick={() => setOpened(!opened)} />
      {inputFields.map((field) => fieldToNode(field))}
    </Wrapper>
  );
}

Attribute.propTypes = attributePropTypes;

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
