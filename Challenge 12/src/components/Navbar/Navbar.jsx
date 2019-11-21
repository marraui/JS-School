import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { tabsPropType } from '../../constants/redux-types';
import {
  Container,
  NavbarLink,
  BurgerButton,
  BurgerButtonContainer,
  TabsContainer,
} from './Layout';

export default function Navbar({ tabs }) {
  const { pathname: selectedTab } = useLocation();
  const [menuOpened, setMenuOpened] = useState(false);
  return (
    <Container>
      <BurgerButtonContainer>
        <BurgerButton onClick={() => setMenuOpened(!menuOpened)}>
          <i className="fa fa-bars" />
        </BurgerButton>
      </BurgerButtonContainer>
      <TabsContainer open={menuOpened}>
        {tabs.map((tab) => (
          <NavbarLink key={tab} to={tab} selected={`/${tab}` === selectedTab}>
            {tab}
          </NavbarLink>
        ))}
      </TabsContainer>
    </Container>
  );
}

Navbar.propTypes = {
  tabs: tabsPropType,
};

Navbar.defaultProps = {
  tabs: [],
};
