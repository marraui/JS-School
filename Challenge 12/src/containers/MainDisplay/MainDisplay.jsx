import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
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
      {Object.keys(attributes).sort().map((id) => ((
        <Attribute
          id={id}
          key={id}
          accessor={id}
          hidden={attributes[id].tab !== tab}
        />
      )))}
      <AddAttributeWrapper>
        <AddAttributeIcon onClick={() => addAttribute({ tab })} />
        <AddAttribute onClick={() => addAttribute({ tab })}>Add attribute</AddAttribute>
      </AddAttributeWrapper>
    </Wrapper>
  );
}

MainDisplay.propTypes = {
  addAttribute: PropTypes.func,
  attributes: PropTypes.shape({}),
};

MainDisplay.defaultProps = {
  addAttribute: () => null,
  attributes: [],
};
