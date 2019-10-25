import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/images/logo2.svg';
import logoText from '../../assets/images/logo-jobsity-text.svg';
import userImage from '../../assets/images/user_image.jpg';
import Search from '../search/Search';
import {
  HeaderContainer,
  Logo,
  UserProfile,
} from './Layout';

export default function Header(props) {
  const { onSearch } = props;
  return (
    <HeaderContainer>
      <Search onSearch={onSearch} />


      <Logo className="logo">
        <img src={logo} alt="Jobsity logo" className="jobsity-logo" />
        <img src={logoText} alt="Jobsity text logo" className="jobsity-text-logo" />
      </Logo>


      <UserProfile>
        <div className="user-border-wrapper">
          <div className="user-name-dropdown">
            <div className="user-name-text">Jakob Treml</div>
            <i className="fa fa-angle-down" />
          </div>
          <div className="user-image-cell">
            <div className="circular-image-wrapper">
              <img src={userImage} alt="user" className="user-image" />
            </div>
          </div>
        </div>
      </UserProfile>
    </HeaderContainer>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func,
};

Header.defaultProps = {
  onSearch: () => {},
};
