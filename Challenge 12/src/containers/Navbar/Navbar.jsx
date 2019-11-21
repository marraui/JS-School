import React from 'react';
import { tabsPropType } from '../../constants/redux-types';
import {
  Container,
  NavbarLink,
} from './Layout';

export default function Navbar({ tabs }) {
  return (
    <Container>
      {tabs.map((tab) => (
        <NavbarLink key={tab}>
          {tab}
        </NavbarLink>
      ))}
    </Container>
  );
}

Navbar.propTypes = {
  tabs: tabsPropType,
};

Navbar.defaultProps = {
  tabs: [],
};
