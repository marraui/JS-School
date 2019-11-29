import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { attributePropTypes } from '../../constants/redux-types';
import FormInput from '../../components/Attribute';
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
        <FormInput key={attribute} />
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
