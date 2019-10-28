import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { history as historyPropTypes } from 'history-prop-types';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../header/Header';
import BookDisplay from '../book-display/BookDisplay';
import objectToQueryString from '../../utils/object-to-query-string';
import * as actions from '../../actions/index';
import {
  AppContainer,
  CollapsibleButton,
  LeftSideBar,
  LeftSideBarItem,
  LeftSideBarTitle,
  RightSideBar,
  RightSideBarItem,
  RightSideBarTitle,
  SubLeftSideBar,
} from './Layout';

function mapDispatchToProps(dispatch) {
  return {
    selectPage: (page) => dispatch(actions.selectPage(page)),
    selectCity: (city) => dispatch(actions.selectCity(city)),
    unselectCity: () => dispatch(actions.unselectCity()),
    selectFormat: (format) => dispatch(actions.selectFormat(format)),
    unselectFormat: () => dispatch(actions.unselectFormat()),
    searchBook: (searchInput) => dispatch(actions.searchBook(searchInput)),
  };
}

function mapStateToProps(state) {
  return {
    city: state.city,
    format: state.format,
    token: state.authentication,
  };
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftSideBarOpen: false,
      rightSideBarOpen: false,
      query: '',
    };

    this.clickLeftSideBarButtonHandler = this.clickLeftSideBarButtonHandler.bind(this);
    this.clickRightSideBarButtonHandler = this.clickRightSideBarButtonHandler.bind(this);
    this.clickLeftSideBarItemHandler = this.clickLeftSideBarItemHandler.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location.search === prevState.query) return null;
    return {
      query: nextProps.location.search,
    };
  }

  componentDidMount() {
    let index;

    const {
      location,
      selectCity,
      unselectCity,
      selectFormat,
      unselectFormat,
      searchBook,
      selectPage,
    } = this.props;
    const query = location.search;
    this.setState({
      query: location.search,
      leftItemSelected: index,
    });
    const urlSearchParams = new URLSearchParams(query);
    const params = Object.fromEntries(urlSearchParams);
    selectPage(params.page ? params.page : 1);

    if (params.city) selectCity(params.city);
    else unselectCity();

    if (params.format) selectFormat(params.format);
    else unselectFormat();

    if (params.searchInput) searchBook(params.searchInput);
    else searchBook('');
  }

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    if (prevState.query === query) return;
    const {
      selectPage,
      selectCity,
      selectFormat,
      searchBook,
      unselectCity,
      unselectFormat,
    } = this.props;

    const urlSearchParams = new URLSearchParams(query);
    const params = Object.fromEntries(urlSearchParams);
    selectPage(params.page ? params.page : 1);

    if (params.city) selectCity(params.city);
    else unselectCity();

    if (params.format) selectFormat(params.format);
    else unselectFormat();

    if (params.searchInput) searchBook(params.searchInput);
    else searchBook('');
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
        leftSideBarOpen: false,
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
      leftSideBarOpen: false,
    });

    if (Object.prototype.hasOwnProperty.call(App.leftItemsParams, itemNumber)) {
      delete params.city;
      delete params.format;
      params = {
        ...params,
        ...App.leftItemsParams[itemNumber],
      };
      if (params.city === 'any') delete params.city;
      if (params.format === 'any') delete params.format;
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
    } = this.state;
    const { city, format, token } = this.props;
    let leftItemSelected = 0;

    App.leftItemsParams.forEach((params, index) => {
      const curCity = params.city;
      const curFormat = params.format;
      if (curCity === city && curFormat === format) {
        leftItemSelected = index;
      }
    });
    if (!token) {
      return (
        <Redirect to="/login" />
      );
    }

    return (
      <AppContainer>
        <Header />
        <CollapsibleButton
          onClick={this.clickLeftSideBarButtonHandler}
          onKeyDown={(event) => (event.keyCode === 32 ? this.clickLeftSideBarButtonHandler : null)}
          role="button"
          tabIndex="0"
        >
          <i className="fa fa-bars" />
        </CollapsibleButton>
        <LeftSideBar opened={leftSideBarOpen}>
          <SubLeftSideBar>
            <LeftSideBarTitle className="left-sidebar-title">MAIN</LeftSideBarTitle>

            <LeftSideBarItem
              selected={leftItemSelected === 1}
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
            </LeftSideBarItem>

            <LeftSideBarItem
              selected={leftItemSelected === 2}
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
            </LeftSideBarItem>

            <LeftSideBarItem
              selected={leftItemSelected === 3}
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
            </LeftSideBarItem>
            <LeftSideBarItem
              selected={leftItemSelected === 4}
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
            </LeftSideBarItem>

            <LeftSideBarItem
              selected={leftItemSelected === 5}
            >
              <i className="fa fa-user-tag fa-fw" />
              Personal Loans
            </LeftSideBarItem>

            <LeftSideBarItem
              selected={leftItemSelected === 6}
            >
              <i className="fa fa-tags fa-fw" />
              New Releases
            </LeftSideBarItem>

          </SubLeftSideBar>
          <SubLeftSideBar isBottom>
            <LeftSideBarTitle>YOUR BOOKS</LeftSideBarTitle>

            <LeftSideBarItem>
              <i className="fa fa-book-open fa-fw" />
              Readings
            </LeftSideBarItem>

            <LeftSideBarItem>
              <i className="fa fa-history fa-fw" />
              History
            </LeftSideBarItem>

            <LeftSideBarItem>
              <i className="fa fa-bookmark fa-fw" />
              Read later
            </LeftSideBarItem>

            <LeftSideBarItem>
              <i className="fa fa-heart fa-fw" />
              Favorites
            </LeftSideBarItem>

          </SubLeftSideBar>
        </LeftSideBar>

        <CollapsibleButton
          toTheRight
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
        </CollapsibleButton>


        <RightSideBar opened={rightSideBarOpen}>
          <RightSideBarTitle>
            MOST READ BOOKS
          </RightSideBarTitle>
          <RightSideBarItem>
            1. Hooked: How to Build Habit-Forming Products
          </RightSideBarItem>
          <RightSideBarItem>
            2. The Inevitable: Understanding the 12 Technological Forces That Will Shape our Future
          </RightSideBarItem>
          <RightSideBarItem>
            3. Lean In: Women, Work, and the Will to Lead
          </RightSideBarItem>
          <RightSideBarItem>
            4. Building a Business When There Are No Easy Answers
          </RightSideBarItem>
          <RightSideBarItem>
            5. How Google Works
          </RightSideBarItem>
        </RightSideBar>
        <BookDisplay />
      </AppContainer>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  history: PropTypes.shape(historyPropTypes).isRequired,
  selectPage: PropTypes.func.isRequired,
  selectCity: PropTypes.func.isRequired,
  selectFormat: PropTypes.func.isRequired,
  searchBook: PropTypes.func.isRequired,
  unselectCity: PropTypes.func.isRequired,
  unselectFormat: PropTypes.func.isRequired,
  city: PropTypes.string,
  format: PropTypes.string,
  token: PropTypes.string,
};

App.defaultProps = {
  location: {
    search: '',
  },
  city: 'any',
  format: 'any',
  token: '',
};


App.leftItemsParams = [
  {
    city: 'any',
    format: 'any',
  },
  {
    city: 'Quito',
    format: 'any',
  },
  {
    city: 'Cartagena',
    format: 'any',
  },
  {
    city: 'Medellin',
    format: 'any',
  },
  {
    city: 'any',
    format: 'Digital',
  },
];

export default connect(mapStateToProps, mapDispatchToProps)(App);
