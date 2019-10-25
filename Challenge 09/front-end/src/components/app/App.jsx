import React, { Component } from 'react';
import './App.scss';
import { Redirect } from 'react-router-dom';
import { history as historyPropTypes } from 'history-prop-types';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../header/Header';
import BookDisplay from '../book-display/BookDisplay';
import objectToQueryString from '../../utils/object-to-query-string';
import * as actions from '../../actions/index';

function mapDispatchToProps(dispatch) {
  return {
    selectPage: (page) => dispatch(actions.selectPage(page)),
    selectCity: (city) => dispatch(actions.selectCity(city)),
    unselectCity: () => dispatch(actions.unselectCity()),
    selectFormat: (format) => dispatch(actions.selectFormat(format)),
    unselectFormat: () => dispatch(actions.unselectFormat()),
    searchBook: (searchInput) => dispatch(actions.searchBook(searchInput)),
    fetchingBooks: (isFetching) => dispatch(actions.fetchingBooks(isFetching)),
    booksFetched: (books) => dispatch(actions.booksFetched(books)),
    totalOfBooks: (number) => dispatch(actions.totalOfBooks(number)),
    resPerPage: (number) => dispatch(actions.resPerPage(number)),
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
    this.bookDisplay = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.location.search === prevState.query) return null;
    return {
      query: nextProps.location.search,
    };
  }

  componentDidMount() {
    let index;

    const { location } = this.props;
    const query = location.search;
    this.setState({
      query: location.search,
      leftItemSelected: index,
    });
    const urlSearchParams = new URLSearchParams(query);
    const params = Object.fromEntries(urlSearchParams);
    this.fetchBooks(params);
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
    else searchBook();

    this.fetchBooks(params);
  }

  getLeftItemSelected() {
    const { city, format } = this.props;
    let index = 0;
    if (city) {
      switch (city) {
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
    } else if (format) {
      switch (format) {
        case 'Digital': {
          index = 4;
          break;
        }

        default: {
          index = 0;
        }
      }
    }
    return index;
  }

  fetchBooks(params) {
    const {
      token,
      selectPage,
      fetchingBooks,
      booksFetched,
      resPerPage: resPerPageCreator,
      totalOfBooks: totalOfBooksCreator,
    } = this.props;

    const headers = new Headers();
    headers.set('Authorization', `JWT ${token}`);
    const url = new URL('http://localhost:3001/api/book');
    Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
    fetchingBooks(true);
    fetch(url, {
      headers,
    }).then((response) => {
      if (response.status === 400) throw new Error('No content');
      return response.json();
    }).then((jsonResponse) => {
      if (jsonResponse.message) throw new Error(jsonResponse.message);
      const {
        books,
        resPerPage,
        page,
        totalResults,
      } = jsonResponse;

      const bookElements = books.map((book) => ({
        title: book.title,
        author: book.author,
        publishedDate: book.publishedDate ? book.publishedDate.split('-')[0] : 'Not available',
        description: book.description,
        roundedAverageRating: book.averageRating ? Math.round(book.averageRating) : 0,
        thumbnail: book.thumbnail,
        id: book.id,
        key: book.id,
        pageCount: `${book.pageCount}`,
      }));

      resPerPageCreator(resPerPage);
      selectPage(page);
      totalOfBooksCreator(totalResults);
      booksFetched(bookElements);
    });
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
      <div className="grid-container">
        <Header />
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
  selectPage: PropTypes.func.isRequired,
  selectCity: PropTypes.func.isRequired,
  selectFormat: PropTypes.func.isRequired,
  searchBook: PropTypes.func.isRequired,
  totalOfBooks: PropTypes.func.isRequired,
  resPerPage: PropTypes.func.isRequired,
  fetchingBooks: PropTypes.func.isRequired,
  booksFetched: PropTypes.func.isRequired,
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
