/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/no-unused-prop-types */
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import FormInput from '../FormInput';
import {
  Wrapper,
  DeleteIcon,
  ToggleIcon,
} from './Layout';

const dataTypeOptions = ['STRING', 'OBJECT'];
const formatOptions = ['NONE', 'NUMBER', 'BOOLEAN', 'DATE-TIME', 'CDATA', 'URI'];

function getFields(fields) {
  const stack = [...fields];
  const res = [];
  stack.reverse();
  while (stack.length > 0) {
    const field = stack.pop();
    field.accessor = typeof field.accessor === 'string' ? [field.accessor] : field.accessor;
    if (field.fieldType === 'group') {
      stack.push(
        ...field.fields
          .map((child) => ({
            ...child,
            exclusiveTo: field.exclusiveTo,
            accessor: [...field.accessor, child.accessor],
          }))
          .reverse(),
      );
    } else res.push(field);
  }
  return res;
}

const getInputs = (dataType) => [
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
    disabled: true,
  },
  {
    name: 'Default Value',
    accessor: 'defaultValue',
    placeholder: 'Enter a default value',
    concealable: true,
    disabled: dataType === 'OBJECT',
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
    disabled: dataType === 'OBJECT',
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
        type: 'tag-input',
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
            type: 'number',
          },
          {
            name: 'Range Max',
            accessor: 'max',
            placeholder: 'Range max',
            concealable: true,
            type: 'number',
          },
        ],
      },
      {
        name: 'Unit of Measurement',
        accessor: 'unitOfMeasurement',
        placeholder: 'UoM (eg. mm)',
        concealable: true,
        type: 'number',
      },
      {
        name: 'Precision',
        accessor: 'precision',
        placeholder: 'Precision (eg. 0.5)',
        concealable: true,
        type: 'number',
      },
      {
        name: 'Accuracy',
        accessor: 'accuracy',
        placeholder: 'Accuracy (eg. 0.5)',
        concealable: true,
        type: 'number',
      },
    ],
  },
];

export default function Attribute({
  onRemove,
  hidden,
  accessor,
  format,
  onFormatChange,
  dataType,
  onDataTypeChange,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const inputs = useMemo(() => getInputs(dataType), [dataType]);
  useEffect(() => onFormatChange(format), [format]);
  useEffect(() => onDataTypeChange(dataType), [dataType]);
  const inputFields = getFields(inputs);
  const fieldToNode = (field) => (
    !field.exclusiveTo || field.exclusiveTo === format ? (
      <FormInput
        name={field.name}
        placeholder={field.placeholder}
        type={field.type}
        options={field.options}
        hide={field.concealable && collapsed}
        key={field.name}
        accessor={`${accessor}.${field.accessor.join('.')}`}
        disabled={field.disabled}
      />
    ) : null
  );

  return (
    <Wrapper collapsed={collapsed} hidden={hidden}>
      <DeleteIcon onClick={() => onRemove()} />
      <ToggleIcon collapsed={collapsed} onClick={() => setCollapsed(!collapsed)} />
      {inputFields.map((field) => fieldToNode(field))}
    </Wrapper>
  );
}

Attribute.propTypes = {
  onRemove: PropTypes.func,
  accessor: PropTypes.string.isRequired,
  hidden: PropTypes.bool,
  format: PropTypes.string,
  onFormatChange: PropTypes.func,
  dataType: PropTypes.string,
  onDataTypeChange: PropTypes.func,
};

Attribute.defaultProps = {
  format: undefined,
  removeAttribute: () => null,
  hidden: false,
  onRemove: () => null,
  onFormatChange: () => null,
  dataType: undefined,
  onDataTypeChange: () => null,
};
