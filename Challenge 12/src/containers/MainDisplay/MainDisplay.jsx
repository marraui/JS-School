import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { attributePropTypes } from '../../constants/redux-types';
import Attribute from '../../components/Attribute';
import {
  Wrapper,
  AddAttribute,
  AddAttributeIcon,
  AddAttributeWrapper,
} from './Layout';

export default function MainDisplay({ attributes, addAttribute }) {
  const location = useLocation();
  const tab = location.pathname.substring(1);
  return (
    <Wrapper>
      {attributes.filter((attribute) => attribute.tab === tab).map((attribute) => (
        <Attribute
          key={attribute.id}
          id={attribute.id}
          name={attribute.name}
          description={attribute.description}
          deviceResourceType={attribute.deviceResourceTyp}
          defaultValue={attribute.defaultValue}
          dataType={attribute.dataType}
          format={attribute.format}
          noneFields={attribute.noneFields}
          numberFields={attribute.numberFields}
        />
      ))}
      <AddAttributeWrapper>
        <AddAttributeIcon onClick={() => addAttribute({ tab })} />
        <AddAttribute onClick={() => addAttribute({ tab })}>Add attribute</AddAttribute>
      </AddAttributeWrapper>
    </Wrapper>
  );
}

MainDisplay.propTypes = {
  addAttribute: PropTypes.func,
  attributes: PropTypes.arrayOf(attributePropTypes),
};

MainDisplay.defaultProps = {
  addAttribute: () => null,
  attributes: [],
};
