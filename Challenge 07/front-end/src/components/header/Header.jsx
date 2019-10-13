import React from 'react';
import PropTypes from 'prop-types';
import './Header.scss';
import logo from '../../assets/images/logo2.svg';
import logoText from '../../assets/images/logo-jobsity-text.svg';
import userImage from '../../assets/images/user_image.jpg';
import Search from '../search/Search';

export default function Header(props) {
  const { onSearch } = props;
  return (
    <div className="header">
      <Search onSearch={onSearch} />


      <div className="logo">
        <img src={logo} alt="Jobsity logo" className="jobsity-logo" />
        <img src={logoText} alt="Jobsity text logo" className="jobsity-text-logo" />
      </div>


      <div className="user">
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
      </div>
    </div>
  );
}

Header.propTypes = {
  onSearch: PropTypes.func,
};

Header.defaultProps = {
  onSearch: () => {},
};
