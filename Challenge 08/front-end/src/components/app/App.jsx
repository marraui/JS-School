import React, { Component } from 'react';
import './App.scss';
import { Redirect } from 'react-router-dom';
import { history as historyPropTypes } from 'history-prop-types';
import PropTypes from 'prop-types';
import Header from '../header/Header';
import BookDisplay from '../book-display/BookDisplay';
import objectToQueryString from '../../utils/object-to-query-string';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftSideBarOpen: false,
      rightSideBarOpen: false,
      leftItemSelected: 0,
    };

    this.clickLeftSideBarButtonHandler = this.clickLeftSideBarButtonHandler.bind(this);
    this.clickRightSideBarButtonHandler = this.clickRightSideBarButtonHandler.bind(this);
    this.clickLeftSideBarItemHandler = this.clickLeftSideBarItemHandler.bind(this);
    this.onSearch = this.onSearch.bind(this);

    this.bookDisplay = React.createRef();
  }

  componentDidMount() {
    const { location } = this.props;
    const params = Object.fromEntries(new URLSearchParams(location.search));
    let index;
    if (params.city) {
      switch (params.city) {
        case 'Quito': {
          index = 1;
          break;
        }

        case 'Cartagena': {
          index = 2;
          break;
        }

        case 'Medellin': {
          index = 3;
          break;
        }

        default: {
          index = 0;
        }
      }
    } else if (params.format) {
      switch (params.format) {
        case 'Digital': {
          index = 4;
          break;
        }

        default: {
          index = 0;
        }
      }
    }

    this.setState({
      leftItemSelected: index,
    });
  }

  onSearch(searchInput) {
    const bookGroup = this.bookDisplay.current.bookGroup.current;
    bookGroup.params.searchInput = searchInput;
  }


  clickLeftSideBarItemHandler(event, itemNumber) {
    event.stopPropagation();
    const { leftItemSelected } = this.state;
    const { location, history } = this.props;
    let params = Object.fromEntries(new URLSearchParams(location.search));
    let queryString;

    if (itemNumber === leftItemSelected && itemNumber !== 0) {
      this.setState({
        leftItemSelected: 0,
      });
      Object.keys(App.leftItemsParams[itemNumber]).forEach((param) => {
        delete params[param];
      });
      params.page = 1;
      queryString = objectToQueryString(params);
      history.push(`?${queryString}`);
      return;
    }

    if (itemNumber === leftItemSelected) {
      return;
    }

    this.setState({
      leftItemSelected: itemNumber,
    });

    if (Object.prototype.hasOwnProperty.call(App.leftItemsParams, itemNumber)) {
      delete params.city;
      delete params.format;
      params = {
        ...params,
        ...App.leftItemsParams[itemNumber],
      };
      params.page = 1;
      queryString = objectToQueryString(params);
      history.push(`?${queryString}`);
    }
  }

  clickLeftSideBarButtonHandler(event) {
    event.stopPropagation();
    const { leftSideBarOpen } = this.state;
    this.setState({
      leftSideBarOpen: !leftSideBarOpen,
    });
  }

  clickRightSideBarButtonHandler(event) {
    event.stopPropagation();
    const { rightSideBarOpen } = this.state;
    this.setState({
      rightSideBarOpen: !rightSideBarOpen,
    });
  }

  render() {
    const {
      leftSideBarOpen,
      rightSideBarOpen,
      leftItemSelected,
    } = this.state;

    const token = sessionStorage.getItem('token');
    if (!token) {
      return (
        <Redirect to="/login" />
      );
    }

    return (
      <div className="grid-container">
        <Header onSearch={this.onSearch} />
        <div
          className="collapsible-button-left-wrapper"
          onClick={this.clickLeftSideBarButtonHandler}
          onKeyDown={(event) => (event.keyCode === 32 ? this.clickLeftSideBarButtonHandler : null)}
          role="button"
          tabIndex="0"
        >
          <i className="fa fa-bars" />
        </div>
        <div className={`left-sidebar ${leftSideBarOpen ? '' : 'left-sidebar-unchecked'}`}>
          <div className="left-sidebar-top">
            <div className="left-sidebar-title">MAIN</div>

            <div
              className={`left-sidebar-li ${leftItemSelected === 1 ? 'checked' : ''}`}
              onClick={(event) => this.clickLeftSideBarItemHandler(event, 1)}
              onKeyDown={(event) => (
                event.keyCode === 32
                  ? this.clickLeftSideBarItemHandler(event, 1)
                  : null
              )}
              role="button"
              tabIndex="0"
            >
              <i className="fa fa-globe fa-fw" />
              Quito
            </div>

            <div
              className={`left-sidebar-li ${leftItemSelected === 2 ? 'checked' : ''}`}
              onClick={(event) => this.clickLeftSideBarItemHandler(event, 2)}
              onKeyDown={(event) => (
                event.keyCode === 32
                  ? this.clickLeftSideBarItemHandler(event, 2)
                  : null
              )}
              role="button"
              tabIndex="0"
            >
              <i className="fa fa-globe fa-fw" />
              Cartagena
            </div>

            <div
              className={`left-sidebar-li ${leftItemSelected === 3 ? 'checked' : ''}`}
              onClick={(event) => this.clickLeftSideBarItemHandler(event, 3)}
              onKeyDown={(event) => (
                event.keyCode
                  ? this.clickLeftSideBarItemHandler(event, 3)
                  : null
              )}
              role="button"
              tabIndex="0"
            >
              <i className="fa fa-globe fa-fw" />
              Medellín
            </div>
            <div
              className={`left-sidebar-li ${leftItemSelected === 4 ? 'checked' : ''}`}
              onClick={(event) => this.clickLeftSideBarItemHandler(event, 4)}
              onKeyDown={(event) => (
                event.keyCode
                  ? this.clickLeftSideBarItemHandler(event, 4)
                  : null
              )}
              role="button"
              tabIndex="0"
            >
              <i className="fa fa-tablet-alt fa-fw" />
              Digital
            </div>

            <div
              className={`left-sidebar-li ${leftItemSelected === 5 ? 'checked' : ''}`}
            >
              <i className="fa fa-user-tag fa-fw" />
              Personal Loans
            </div>

            <div
              className={`left-sidebar-li ${leftItemSelected === 6 ? 'checked' : ''}`}
            >
              <i className="fa fa-tags fa-fw" />
              New Releases
            </div>

          </div>
          <div className="left-sidebar-bottom">
            <div className="left-sidebar-title">YOUR BOOKS</div>

            <div className="left-sidebar-li">
              <i className="fa fa-book-open fa-fw" />
              Readings
            </div>

            <div className="left-sidebar-li">
              <i className="fa fa-history fa-fw" />
              History
            </div>

            <div className="left-sidebar-li">
              <i className="fa fa-bookmark fa-fw" />
              Read later
            </div>

            <div className="left-sidebar-li">
              <i className="fa fa-heart fa-fw" />
              Favorites
            </div>

          </div>
        </div>


        <input type="checkbox" id="collapsible-button-right" />
        <div
          className="collapsible-button-right-wrapper"
          onClick={this.clickRightSideBarButtonHandler}
          onKeyDown={(event) => (
            event.keyCode === 32
              ? this.clickRightSideBarButtonHandler(event)
              : null
          )}
          role="button"
          tabIndex="0"
        >
          <i className="fa fa-bars" />
        </div>


        <div className={`right-sidebar ${rightSideBarOpen ? '' : 'right-sidebar-unchecked'}`}>
          <div className="right-sidebar-title">
            MOST READ BOOKS
          </div>
          <div className="right-sidebar-li">
            1. Hooked: How to Build Habit-Forming Products
          </div>
          <div className="right-sidebar-li">
            2. The Inevitable: Understanding the 12 Technological Forces That Will Shape our Future
          </div>
          <div className="right-sidebar-li">
            3. Lean In: Women, Work, and the Will to Lead
          </div>
          <div className="right-sidebar-li">
            4. Building a Business When There Are No Easy Answers
          </div>
          <div className="right-sidebar-li">
            5. How Google Works
          </div>
        </div>

        <BookDisplay ref={this.bookDisplay} />
      </div>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  history: PropTypes.shape(historyPropTypes).isRequired,
};

App.defaultProps = {
  location: {
    search: '',
  },
};


App.leftItemsParams = {
  0: {},
  1: {
    city: 'Quito',
  },
  2: {
    city: 'Cartagena',
  },
  3: {
    city: 'Medellin',
  },
  4: {
    format: 'Digital',
  },
};
