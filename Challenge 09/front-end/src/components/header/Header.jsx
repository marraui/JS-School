import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../../assets/images/logo2.svg';
import logoText from '../../assets/images/logo-jobsity-text.svg';
import userImage from '../../assets/images/user_image.jpg';
import Search from '../search/Search';
import {
  HeaderContainer,
  Logo,
  UserProfile,
} from './Layout';
import * as actions from '../../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    logOut: () => dispatch(actions.logOut()),
  };
}
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logOutOpened: false,
    };

    this.logoutHandler = this.logoutHandler.bind(this);
    this.clickUserOptionsHandler = this.clickUserOptionsHandler.bind(this);
  }

  logoutHandler(event) {
    event.stopPropagation();
    const { logOut } = this.props;
    logOut();
  }

  clickUserOptionsHandler(event) {
    event.stopPropagation();
    const { logOutOpened } = this.state;
    this.setState({
      logOutOpened: !logOutOpened,
    });
  }

  render() {
    const { onSearch } = this.props;
    const { logOutOpened } = this.state;
    return (
      <HeaderContainer>
        <Search onSearch={onSearch} />


        <Logo className="logo">
          <img src={logo} alt="Jobsity logo" className="jobsity-logo" />
          <img src={logoText} alt="Jobsity text logo" className="jobsity-text-logo" />
        </Logo>
        <UserProfile>
          <div className="user-border-wrapper">
            <div
              onClick={this.clickUserOptionsHandler}
              onKeyDown={(event) => (
                event.keyCode === 32
                  ? this.clickUserOptionsHandler(event)
                  : null
              )}
              className="user-name-dropdown"
              role="button"
              tabIndex="0"
            >
              <div className="user-name-text">Jakob Treml</div>
              <i className="fa fa-angle-down" />
            </div>
            <div className="user-image-cell">
              <div className="circular-image-wrapper">
                <img src={userImage} alt="user" className="user-image" />
              </div>
            </div>
            {
              logOutOpened ? (
                <div
                  onClick={this.logoutHandler}
                  onKeyDown={(event) => (event.keyCode === 32 ? this.logoutHandler(event) : null)}
                  className="log-out"
                  role="button"
                  tabIndex="0"
                >
                  Log out
                </div>
              ) : null
            }
          </div>
        </UserProfile>
      </HeaderContainer>
    );
  }
}

export default connect(() => {}, mapDispatchToProps)(Header);

Header.propTypes = {
  onSearch: PropTypes.func,
  logOut: PropTypes.func.isRequired,
};

Header.defaultProps = {
  onSearch: () => {},
};
